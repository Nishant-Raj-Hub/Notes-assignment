import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Loader from "./components/Loader";
import EmptyState from "./components/EmptyState";

export interface Note {
  id: string;
  title: string;
  description: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Simulate loading on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const addNote = (title: string, description: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      description,
    };
    setNotes([newNote, ...notes]);
    setIsFormOpen(false);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id: string, title: string, description: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title, description } : note
      )
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="max-w-3xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Mission <span className="text-blue-200">Notes</span>
          </h1>
          <p className="text-lg text-blue-100 drop-shadow">
            Capture your thoughts at Codetikki.
          </p>
        </motion.div>

        {/* Form Section */}
        {!isFormOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => setIsFormOpen(true)}
            className="w-full py-4 px-6 mb-12 bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white font-semibold rounded-3xl transition-all shadow-lg border border-white/30 hover:border-white/40"
          >
            + Create New Note
          </motion.button>
        )}
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <NoteForm
              onAddNote={addNote}
              onClose={() => setIsFormOpen(false)}
            />
          </motion.div>
        )}

        {/* Notes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {notes.length === 0 ? (
            <EmptyState />
          ) : (
            <NoteList
              notes={notes}
              onDeleteNote={deleteNote}
              onEditNote={editNote}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
