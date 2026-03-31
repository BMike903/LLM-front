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
        className={`absolute top-2 right-2 z-60 lg:hidden`}
      >
        {overlayOpen ? <BiArrowFromBottom /> : <BiArrowFromTop />}
      </button>
      <div
        className={`fixed top-0 left-0 z-20 h-full w-full transform border-b border-[color:var(--border)] bg-[color:var(--surface-80)] px-6 py-3 backdrop-blur transition-transform duration-300 md:block lg:sticky lg:top-0 lg:z-auto lg:h-auto lg:translate-y-0 ${overlayOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex h-full flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[color:var(--muted)] uppercase lg:flex-row">
            <span>Model</span>
            <span className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1 text-[0.7rem] font-semibold text-[color:var(--text)]">
              {model ? model.name : "Select model"}
            </span>
            <button
              className="rounded-full border border-transparent p-1 text-[color:var(--muted)] transition hover:border-[color:var(--border)] hover:text-[color:var(--text)]"
              disabled={status === "fetching"}
              onClick={() => setSelectingModel(currentChatId, true)}
              aria-label="Change model"
            >
              <BiEdit size="1.1em" />
            </button>
          </div>

          <div className="flex min-w-[220px] flex-1 items-center justify-center text-sm font-semibold">
            <CurrentChatTitleInput
              title={title}
              firstMessage={messages[0]?.content}
              chatID={currentChatId}
            />
          </div>

          <div className="text-lg text-[color:var(--muted)] lg:block lg:text-xs">
            Started {new Date(startDate).toUTCString()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
