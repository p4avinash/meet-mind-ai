import { HiTrash, HiXMark } from "react-icons/hi2";
import Button from "@/components/common/button/Button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  itemTitle?: string;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({
  isOpen,
  title = "Delete Meeting?",
  itemTitle,
  isDeleting = false,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-float-in">
      <div className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8 shadow-2xl shadow-black/80 text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          disabled={isDeleting}
          className="absolute right-5 top-5 rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:opacity-50"
        >
          <HiXMark size={20} />
        </button>

        {/* Danger Icon Header */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 shadow-lg shadow-red-500/10">
          <HiTrash size={32} />
        </div>

        {/* Modal Title & Text */}
        <h3 className="mt-5 text-xl font-bold tracking-tight text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          Are you sure you want to delete{" "}
          {itemTitle ? (
            <span className="font-semibold text-zinc-200">"{itemTitle}"</span>
          ) : (
            "this meeting"
          )}
          ? This action cannot be undone and all associated transcripts and AI summaries will be permanently removed.
        </p>

        {/* Action Buttons: Full-width uniform 2-column grid */}
        <div className="mt-8 grid grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
          >
            Cancel
          </button>

          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={isDeleting}
            isLoading={isDeleting}
            fullWidth
            className="h-auto py-3 text-sm font-bold shadow-lg shadow-red-600/30"
          >
            Delete Meeting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
