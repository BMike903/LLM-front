import React from "react";

import {
  BiLoader,
  BiErrorCircle,
  BiSolidTrashAlt,
  BiMenu,
} from "react-icons/bi";

import useChatsStore from "../store/store";
import { useAllChats } from "../store/chatSelectors";
import ConfirmModal from "./confirmModal";
import { daysSince } from "../utils/date";
import { ChatPreview, ChatsPreviewsByDates } from "../types/chat";
import { selectTitleOrFirstMessage } from "../utils/chat";

type chatListProps = {
  overlayOpen: boolean;
  setOverlayOpen: (overlayOpen: boolean) => void;
};

function ChatList({ overlayOpen, setOverlayOpen }: chatListProps) {
  const setCurrentChat = useChatsStore((state) => state.setCurrentChat);
  const addNewChat = useChatsStore((state) => state.addNewChat);
  const allChats = useAllChats();
  const deleteChat = useChatsStore((state) => state.deleteChat);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [chatToDelete, setChatToDelete] = React.useState<string | null>(null);

  const chatsPreviews: ChatPreview[] = Object.entries(allChats).map(
    ([chatID, chatContent]) => ({
      chatID,
      firstMessage: chatContent.messages[0]?.content,
      modelKey: chatContent.modelKey,
      startDate: chatContent.startDate,
      status: chatContent.status,
      title: chatContent.title,
      titleTipStatus: chatContent.titleTipStatus,
    }),
  );
  if (!chatsPreviews) return null;

  const sortedChatsPreview = [...chatsPreviews].sort((a, b) =>
    b.startDate.localeCompare(a.startDate),
  );

  const chatsPreviewsByDates: ChatsPreviewsByDates = {
    "weekAgo": [],
    "3daysAgo": [],
    "yesterday": [],
    "today": [],
  };

  sortedChatsPreview.forEach((chat) => {
    if (daysSince(chat.startDate) === 0) {
      chatsPreviewsByDates["today"].push(chat);
    } else if (daysSince(chat.startDate) === 1) {
      chatsPreviewsByDates["yesterday"].push(chat);
    } else if (
      daysSince(chat.startDate) <= 3 &&
      daysSince(chat.startDate) > 1
    ) {
      chatsPreviewsByDates["3daysAgo"].push(chat);
    } else if (daysSince(chat.startDate) > 7) {
      chatsPreviewsByDates["weekAgo"].push(chat);
    }
  });

  const renderChatPreview = (chatContent: ChatPreview) => {
    return (
      <button
        key={chatContent.chatID}
        tabIndex={0}
        onClick={() => {
          setCurrentChat(chatContent.chatID);
          setOverlayOpen(false);
        }}
        className="group flex w-full flex-col gap-1 rounded-xl border border-transparent bg-[color:var(--surface-70)] px-3 py-2 text-left text-sm transition hover:border-[color:var(--border)] hover:bg-[color:var(--surface)]"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="min-w-0 flex-1 truncate font-medium text-[color:var(--text)]">
            {selectTitleOrFirstMessage(
              chatContent.title,
              chatContent.firstMessage,
            )}
          </span>
          {chatContent.status === "fetching" && (
            <BiLoader
              className="animate-spin text-[color:var(--muted)]"
              size="1.1em"
            />
          )}
          {(chatContent.status === "error" ||
            chatContent.titleTipStatus === "error") && (
            <BiErrorCircle className="text-red-500" size="1.1em" />
          )}
        </div>
        <div className="flex items-center justify-between gap-2 text-xs text-[color:var(--muted)]">
          <span>
            {chatContent.modelKey ? chatContent.modelKey : "No model"}
          </span>
          {chatContent.status !== "fetching" && (
            <div
              className="-m-1 p-1 text-[color:var(--muted)] opacity-100 transition hover:text-[color:var(--text)] lg:opacity-0 lg:group-hover:opacity-100"
              onClick={(event) => {
                event.stopPropagation();
                setChatToDelete(chatContent.chatID);
                setIsModalOpen(true);
              }}
              aria-label="Delete chat"
            >
              <BiSolidTrashAlt size="1.1em" />
            </div>
          )}
        </div>
      </button>
    );
  };

  return (
    <>
      <button
        onClick={() => setOverlayOpen(!overlayOpen)}
        className={`absolute top-2 z-60 lg:hidden ${overlayOpen ? "hidden" : "left-2"}`}
      >
        <BiMenu />
      </button>
      {overlayOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOverlayOpen(false)}
        />
      )}
      <div
        id="chatList"
        className={`fixed top-0 left-0 z-50 h-full w-[80%] shrink-0 transform flex-col overflow-auto border-r border-[color:var(--border)] bg-[color:var(--sidebar-bg)] px-3 py-5 transition-transform duration-300 lg:static lg:z-auto lg:flex lg:h-full lg:w-72 lg:translate-x-0 ${overlayOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-left text-sm font-semibold transition hover:bg-[color:var(--surface-muted)]"
          onClick={() => addNewChat()}
          tabIndex={0}
        >
          New chat
        </button>

        <hr className="my-5 border-[color:var(--border)]" />

        <ul className="flex flex-col gap-6">
          {chatsPreviewsByDates["today"].length > 0 && (
            <li className="flex flex-col gap-2">
              <div className="px-2 text-xs font-semibold tracking-[0.2em] text-[color:var(--muted)] uppercase">
                Today
              </div>
              {chatsPreviewsByDates["today"].map((chat) =>
                renderChatPreview(chat),
              )}
            </li>
          )}

          {chatsPreviewsByDates["yesterday"].length > 0 && (
            <li className="flex flex-col gap-2">
              <div className="px-2 text-xs font-semibold tracking-[0.2em] text-[color:var(--muted)] uppercase">
                Yesterday
              </div>
              {chatsPreviewsByDates["yesterday"].map((chat) =>
                renderChatPreview(chat),
              )}
            </li>
          )}

          {chatsPreviewsByDates["3daysAgo"].length > 0 && (
            <li className="flex flex-col gap-2">
              <div className="px-2 text-xs font-semibold tracking-[0.2em] text-[color:var(--muted)] uppercase">
                3 days ago
              </div>
              {chatsPreviewsByDates["3daysAgo"].map((chat) =>
                renderChatPreview(chat),
              )}
            </li>
          )}

          {chatsPreviewsByDates["weekAgo"].length > 0 && (
            <li className="flex flex-col gap-2">
              <div className="px-2 text-xs font-semibold tracking-[0.2em] text-[color:var(--muted)] uppercase">
                Week ago
              </div>
              {chatsPreviewsByDates["weekAgo"].map((chat) =>
                renderChatPreview(chat),
              )}
            </li>
          )}
        </ul>
        <ConfirmModal
          isOpen={isModalOpen}
          title="Delete chat"
          description="Are you sure you want to delete this chat? This action cannot be undone."
          onCancel={() => {
            setIsModalOpen(false);
            setChatToDelete(null);
          }}
          onConfirm={() => {
            if (chatToDelete) deleteChat(chatToDelete);
            setIsModalOpen(false);
            setChatToDelete(null);
          }}
        />
      </div>
    </>
  );
}

export default ChatList;
