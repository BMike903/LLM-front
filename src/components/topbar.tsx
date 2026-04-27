import { BiEdit, BiArrowFromTop, BiArrowFromBottom } from "react-icons/bi";

import CurrentChatTitleInput from "./titleInput";
import useChatsStore from "../store/store";
import { useCurrentChat, useCurrentChatId } from "../store/chatSelectors";
import { getModel } from "../types/models";

type topbarProps = {
  overlayOpen: boolean;
  setOverlayOpen: (overlayOpen: boolean) => void;
};

function Topbar({ overlayOpen, setOverlayOpen }: topbarProps) {
  const currentChatId = useCurrentChatId();
  const currentChat = useCurrentChat();
  const { messages, status, modelKey, startDate, title } = currentChat;
  const model = modelKey ? getModel(modelKey) : null;
  const setSelectingModel = useChatsStore((state) => state.setSelectingModel);

  return (
    <>
      <button
        onClick={() => setOverlayOpen(!overlayOpen)}
        className="absolute top-2 right-2 z-60 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] p-2 text-[color:var(--muted)] shadow-sm transition hover:text-[color:var(--text)] lg:hidden"
        aria-label={overlayOpen ? "Close topbar" : "Open topbar"}
      >
        {overlayOpen ? (
          <BiArrowFromBottom size="1.2em" />
        ) : (
          <BiArrowFromTop size="1.2em" />
        )}
      </button>
      {overlayOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] lg:hidden"
          onClick={() => setOverlayOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 z-40 max-h-[85vh] w-full transform overflow-auto rounded-b-2xl border-b border-[color:var(--border)] bg-[color:var(--surface-80)] px-4 pt-14 pb-5 shadow-lg backdrop-blur transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-auto lg:max-h-none lg:translate-y-0 lg:overflow-visible lg:rounded-none lg:px-6 lg:py-3 lg:shadow-none ${overlayOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex h-full flex-col gap-4 lg:h-auto lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
          <div className="flex w-full items-center justify-between gap-3 text-xs font-semibold tracking-[0.2em] text-[color:var(--muted)] uppercase lg:w-auto lg:justify-start">
            <span>Model</span>
            <span className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1 text-[0.7rem] font-semibold text-[color:var(--text)]">
              {model ? model.name : "Select model"}
            </span>
            <button
              className="rounded-full border border-transparent p-1 text-[color:var(--muted)] transition hover:border-[color:var(--border)] hover:text-[color:var(--text)]"
              disabled={status === "fetching"}
              onClick={() => {
                setSelectingModel(currentChatId, true);
                setOverlayOpen(false);
              }}
              aria-label="Change model"
            >
              <BiEdit size="1.3em" />
            </button>
          </div>

          <div className="flex w-full items-center justify-center text-sm font-semibold lg:min-w-[220px] lg:flex-1">
            <CurrentChatTitleInput
              title={title}
              firstMessage={messages[0]?.content}
              chatID={currentChatId}
            />
          </div>

          <div className="w-full text-center text-xs text-[color:var(--muted)] lg:w-auto lg:text-right">
            Started {new Date(startDate).toUTCString()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
