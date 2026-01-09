import { BookOpen } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="mb-6 flex justify-center">
        <BookOpen className="w-16 h-16 text-white/60" />
      </div>
      <h3 className="text-2xl font-semibold text-white mb-2">No notes yet</h3>
      <p className="text-white/70 max-w-sm mx-auto">
        Your thoughts are waiting to be captured. Use the form above to create
        your first note.
      </p>
    </div>
  );
}
