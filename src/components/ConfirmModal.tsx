type ConfirmModalProps = {
  title?: string;
  description?: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  title = "Confirm",
  description = "Are you sure?",
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onCancel}
      />
      <div className="relative z-10 w-11/12 max-w-md rounded bg-white p-6 shadow-lg dark:bg-gray-800">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100 dark:border-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
