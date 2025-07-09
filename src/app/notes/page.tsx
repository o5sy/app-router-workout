import { Metadata } from "next";
import NoteList from "../components/note-list";

export const metadata: Metadata = {
  title: "Notes",
};

export default function NotesPage() {
  return (
    <div>
      <h1>Notes</h1>
      <NoteList />
    </div>
  );
}
