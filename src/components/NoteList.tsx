import { Note } from "../App";
import { motion } from "framer-motion";
import NoteItem from "./NoteItem";

interface NoteListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
  onEditNote: (id: string, title: string, description: string) => void;
}

export default function NoteList({
  notes,
  onDeleteNote,
  onEditNote,
}: NoteListProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">My Notes</h2>
      <motion.div className="grid gap-4" layout>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDeleteNote}
            onEdit={onEditNote}
          />
        ))}
      </motion.div>
    </div>
  );
}
