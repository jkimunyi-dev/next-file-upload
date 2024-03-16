import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function POST(req, res) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json(
      { success: false, message: "No file provided" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `/tmp/${file.name}`;

  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({ success: true });
}
