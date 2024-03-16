"use client";
import { useState } from "react";

import Image from "next/image";

export default function Home() {
  const [file, setFile] = useState();

  const onsubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main>
      <form onSubmit={onsubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
}
