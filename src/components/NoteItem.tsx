import { useState } from "react";
import { Note } from "../App";
import { motion } from "framer-motion";
import { Trash2, Edit2, Check, X } from "lucide-react";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}

export default function NoteItem({ note, onDelete, onEdit }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(note.id, editTitle, editDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditDescription(note.description);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 p-6 hover:bg-white/30 transition-all shadow-lg"
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-0 py-2 bg-transparent border-b-2 border-white/60 text-lg font-semibold text-white focus:outline-none placeholder-white/50"
            placeholder="Note Title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-4 py-3 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all resize-none bg-white/10 backdrop-blur-md"
            placeholder="Description"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 py-2 px-4 bg-green-500/80 hover:bg-green-500 backdrop-blur-md text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-green-400/30"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-white/20"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white break-words">
                {note.title}
              </h3>
              {note.description && (
                <p className="text-white/80 mt-3 text-sm whitespace-pre-wrap break-words leading-relaxed">
                  {note.description}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                title="Edit note"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="p-2 text-white/60 hover:text-red-300 hover:bg-red-500/30 rounded-lg transition-colors"
                title="Delete note"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
