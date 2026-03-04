type ConfirmModalProps = {
  title?: string;
  description?: string;
  confirmButtonText?: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  title = "Confirm",
  description = "Are you sure?",
  confirmButtonText = "Delete",
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative z-10 w-11/12 max-w-md rounded-2xl border border-[color:var(--border)] bg-white p-6 shadow-xl">
        <h3 className="mb-2 text-lg font-semibold text-[color:var(--text)]">
          {title}
        </h3>
        <p className="mb-5 text-sm text-[color:var(--muted)]">
          {description}
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--text)] transition hover:bg-[color:var(--surface-muted)]"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-full border border-transparent bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
