"use client";

import { createNote } from "../actions/actions";
import { useActionState } from "react";

function NoteList() {
  const [notes, formAction, isLoading] = useActionState(createNote, []);

  return (
    <div>
      <form action={formAction}>
        <input type="text" name="content" className="border border-gray-300" />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Create"}
        </button>
      </form>

      <ul className="flex flex-col-reverse gap-2 pt-4">
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
