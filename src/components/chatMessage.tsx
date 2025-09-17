import Markdown from "react-markdown";

import FileItem from "./fileItem";
import { Message } from "../types/chat";

function ChatMessage({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div
        className="self-end rounded-s-xl rounded-br-xl border-gray-200 bg-gray-300 p-4 dark:bg-gray-800"
        key={message.id}
      >
        {message.content}
        {message.files && (
          <div className="mt-1 flex flex-row gap-3">
            {message.files.map((item) => (
              <FileItem file={item} displayType="messageFile" key={item.id} />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div key={message.id}>
        <Markdown>{message.content}</Markdown>
      </div>
    );
  }
}

export default ChatMessage;
