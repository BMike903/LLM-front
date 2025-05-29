import useChatsStore from "../store";

function ChatList() {
  const allChats = useChatsStore((state) => state.chats.allChats);
  const chatIDs = Object.keys(allChats);

  return (
    <div
      id="chatList"
      className="flex h-full border-4 border-solid border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-black"
    >
      <ul className="flex flex-col gap-6 px-1 py-6">
        {chatIDs.map((id) => (
          <li
            key={id}
            className="rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
