import { useState } from "react";

import Markdown from "react-markdown";
import { BiSolidTrashAlt } from "react-icons/bi";

import FileItem from "./fileItem";
import { Message } from "../types/chat";
import useChatsStore from "../store/store";
import { useCurrentChatId } from "../store/chatSelectors";
import ConfirmModal from "./confirmModal";

function ChatMessage({ message }: { message: Message }) {
  const deleteMessage = useChatsStore((state) => state.deleteMessage);
  const currentChatId = useCurrentChatId();

  const [isModalOpen, setIsModalOpen] = useState(false);

  let messageItem;

  if (message.role === "user") {
    messageItem = (
      <div key={message.id} className="group flex w-full justify-end">
        <div className="relative max-w-[85%]">
          <button
            className="absolute top-2 -left-7 text-[color:var(--muted)] opacity-0 transition-opacity group-hover:opacity-100 hover:text-[color:var(--text)]"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            aria-label="Delete message"
          >
            <BiSolidTrashAlt size="1.1em" />
          </button>

          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 shadow-sm">
            <div className="text-sm leading-6 whitespace-pre-wrap">
              {message.content}
            </div>
            {message.files && (
              <div className="mt-3 flex flex-row gap-3">
                {message.files.map((item) => (
                  <FileItem
                    file={item}
                    displayType="messageFile"
                    key={item.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    messageItem = (
      <div className="group relative" key={message.id}>
        <button
          className="absolute top-4 -left-7 text-[color:var(--muted)] opacity-0 transition-opacity group-hover:opacity-100 hover:text-[color:var(--text)]"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          aria-label="Delete message"
        >
          <BiSolidTrashAlt size="1.1em" />
        </button>
        <div>
          <Markdown>{message.content}</Markdown>
        </div>
      </div>
    );
  }
  return (
    <>
      {" "}
      {messageItem}{" "}
      <ConfirmModal
        title="Delete Message"
        description="Are you sure you want to delete this message?"
        onConfirm={() => deleteMessage(currentChatId, message.id)}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      />{" "}
    </>
  );
}
export default ChatMessage;
