import useChatsStore from "../store/store";
import { useAllChats } from "../store/chatSelectors";

import { daysSince } from "../utils/date";

type ChatPreview = {
  chatID: string;
  firstMessage?: string | null;
  model?: string | null;
  startDate: string;
};
type ChatsPreviewsByDates = {
  "weekAgo": ChatPreview[];
  "3daysAgo": ChatPreview[];
  "yesterday": ChatPreview[];
  "today": ChatPreview[];
};

function ChatList() {
  const setCurrentChat = useChatsStore((state) => state.setCurrentChat);
  const addNewChat = useChatsStore((state) => state.addNewChat);
  const allChats = useAllChats();

  const chatsPreviews: ChatPreview[] = Object.entries(allChats).map(
    ([chatID, chatContent]) => ({
      chatID,
      firstMessage: chatContent.messages[0]?.content,
      model: chatContent.modelKey,
      startDate: chatContent.startDate,
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

  console.log(chatsPreviewsByDates);

  return (
    <div
      id="chatList"
      className="flex h-full flex-1/6 flex-col border-4 border-solid border-gray-300 bg-gray-50 px-1 py-6 dark:border-gray-600 dark:bg-black"
    >
      <div
        className="rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 text-center hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={() => addNewChat()}
      >
        Add new chat
      </div>
      <hr className="my-5" />
      <ul className="flex flex-col gap-6 px-1">
        {sortedChatsPreview.map(({ chatID, firstMessage, model }) => (
          <li
            key={chatID}
            onClick={() => setCurrentChat(chatID)}
            className="rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {firstMessage ? firstMessage : "no messages"} -{" "}
            <b>{model ? model : "no model"}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
