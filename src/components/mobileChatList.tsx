function MobileChatList({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const openButtonClasses = isOpen
    ? "absolute top-2 right-2 z-60 lg:hidden"
    : "absolute top-2 left-2 z-60 lg:hidden";
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={openButtonClasses}>
        X
      </button>

      <div className="relative h-screen overflow-hidden lg:hidden">
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 z-50 h-full w-[80%] transform bg-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
        >
          <div className="p-4">Sidebar content</div>
        </div>
      </div>
    </>
  );
}

export default MobileChatList;
