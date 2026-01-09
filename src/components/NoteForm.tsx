import { useFormik } from "formik";
import * as Yup from "yup";
import { Plus, X } from "lucide-react";

interface NoteFormProps {
  onAddNote: (title: string, description: string) => void;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title cannot be empty")
    .min(1, "Title must not be empty"),
  description: Yup.string(),
});

export default function NoteForm({ onAddNote, onClose }: NoteFormProps) {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onAddNote(values.title, values.description);
      resetForm();
    },
  });

  const isTitleEmpty = !formik.values.title.trim();
  const hasError = formik.touched.title && formik.errors.title;

  return (
    <div className="bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Create New Note</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Close form"
        >
          <X className="w-5 h-5 text-white/70 hover:text-white" />
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <input
            id="title"
            type="text"
            placeholder="Note Title"
            className={`w-full px-0 py-3 bg-transparent border-b-2 text-lg font-medium text-white placeholder-white/50 focus:outline-none transition-colors ${
              hasError
                ? "border-red-300 focus:border-red-400"
                : "border-white/30 focus:border-white/60"
            }`}
            {...formik.getFieldProps("title")}
          />
          {hasError && (
            <p className="mt-2 text-sm font-medium text-red-200">
              {formik.errors.title}
            </p>
          )}
        </div>

        <div>
          <textarea
            id="description"
            placeholder="Description (optional)"
            rows={4}
            className="w-full px-4 py-3 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all resize-none bg-white/10 backdrop-blur-md"
            {...formik.getFieldProps("description")}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isTitleEmpty || !!hasError}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              isTitleEmpty || hasError
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-white/30 hover:bg-white/40 active:bg-white/50 text-white border border-white/30 hover:border-white/50"
            }`}
          >
            Add Note
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all border border-white/20"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
