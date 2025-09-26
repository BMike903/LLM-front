import { useState } from "react";

import Markdown from "react-markdown";
import { FiTrash2 } from "react-icons/fi";

import FileItem from "./fileItem";
import { Message } from "../types/chat";
import useChatsStore from "../store/store";
import { useCurrentChatId } from "../store/chatSelectors";
import ConfirmModal from "./сonfirmModal";

function ChatMessage({ message }: { message: Message }) {
  const deleteMessage = useChatsStore((state) => state.deleteMessage);
  const currentChatId = useCurrentChatId();

  const [isModalOpen, setIsModalOpen] = useState(false);

  let messageItem;

  if (message.role === "user") {
    messageItem = (
      <div key={message.id} className="group flex w-full justify-end">
        <div className="relative max-w-[80%]">
          <button
            className="absolute top-1 -left-6 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:cursor-pointer hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            aria-label="Delete message"
          >
            <FiTrash2 size="1.2em" />
          </button>

          <div className="rounded-s-xl rounded-br-xl border-gray-200 bg-gray-300 p-4 dark:bg-gray-800">
            <div>{message.content}</div>
            {message.files && (
              <div className="mt-1 flex flex-row gap-3">
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
      <div className="group relative pl-10" key={message.id}>
        <button
          className="absolute top-2 left-2 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:cursor-pointer hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-50"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          aria-label="Delete message"
        >
          <FiTrash2 size="1.2em" />
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
