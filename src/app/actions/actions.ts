"use server";

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
