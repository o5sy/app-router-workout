"use server";

import { revalidateTag } from "next/cache";

export interface Note {
  id: string;
  content: string;
}

export async function createNote(currentState: Note[], formData: FormData) {
  const content = formData.get("content") as string;

  if (!content) {
    return currentState;
  }

  const note = {
    id: Date.now().toString(),
    content,
  };

  await new Promise((resolve) => setTimeout(resolve, 100));

  const newNotes = [...currentState, note];

  return newNotes;
}

export async function createPost() {
  fetch("http://localhost:3001/posts", {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      title: "foo",
      body: "bar",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // 캐시 무효화
  revalidateTag("posts");
}
