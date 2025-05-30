import useChatsStore from "../store";
import { useAllChats } from "../store";

function ChatList() {
  const setCurrentChat = useChatsStore((state) => state.setCurrentChat);
  const allChats = useAllChats();
  const ChatsPreview = Object.entries(allChats).map(
    ([chatID, chatContent]) => ({
      chatID,
      firstMessage: chatContent.messages[0].content,
    }),
  );

  return (
    <div
      id="chatList"
      className="flex h-full border-4 border-solid border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-black"
    >
      <ul className="flex flex-col gap-6 px-1 py-6">
        {ChatsPreview.map(({ chatID, firstMessage }) => (
          <li
            key={chatID}
            onClick={() => setCurrentChat(chatID)}
            className="rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {firstMessage}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
