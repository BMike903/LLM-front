import Markdown from "react-markdown";
import { FiTrash2 } from "react-icons/fi";

import FileItem from "./fileItem";
import { Message } from "../types/chat";
import useChatsStore from "../store/store";
import { useCurrentChatId } from "../store/chatSelectors";

function ChatMessage({ message }: { message: Message }) {
  const deleteMessage = useChatsStore((state) => state.deleteMessage);
  const currentChatId = useCurrentChatId();

  if (message.role === "user") {
    return (
      <div key={message.id} className="group flex w-full justify-end">
        <div className="relative max-w-[80%]">
          <button
            className="absolute top-1 -left-6 text-gray-600 opacity-0 transition-opacity group-hover:opacity-100 hover:text-gray-800 dark:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              if (currentChatId) deleteMessage(currentChatId, message.id);
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
    return (
      <div className="group relative pl-10" key={message.id}>
        <button
          className="absolute top-2 left-2 text-gray-600 opacity-0 transition-opacity group-hover:opacity-100 hover:text-gray-800 dark:text-gray-300"
          onClick={(e) => {
            e.stopPropagation();
            if (currentChatId) deleteMessage(currentChatId, message.id);
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
}

export default ChatMessage;
