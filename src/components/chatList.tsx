import { FiLoader, FiAlertCircle } from "react-icons/fi";

import useChatsStore from "../store/store";
import { useAllChats } from "../store/chatSelectors";
import { daysSince } from "../utils/date";
import { ChatPreview, ChatsPreviewsByDates } from "../types/chat";
import { selectTitleOrFirstMessage } from "../utils/chat";

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
      status: chatContent.status,
      title: chatContent.title,
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
      <div
        key={chatContent.chatID}
        onClick={() => setCurrentChat(chatContent.chatID)}
        className="rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {selectTitleOrFirstMessage(chatContent.title, chatContent.firstMessage)}{" "}
        -{" "}
        <b>
          {chatContent.model ? chatContent.model + " " : "no model"}
          {chatContent.status === "fetching" && (
            <FiLoader className="inline animate-spin" />
          )}
          {chatContent.status === "error" && (
            <FiAlertCircle className="inline text-red-600" />
          )}
        </b>
      </div>
    );
  };

  return (
    <div
      id="chatList"
      className="flex h-full flex-1/6 flex-col overflow-auto border-4 border-solid border-gray-300 bg-gray-50 px-1 py-6 dark:border-gray-600 dark:bg-black"
    >
      <div
        className="rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 text-center hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={() => addNewChat()}
      >
        Add new chat
      </div>

      <hr className="my-5" />

      <ul className="flex flex-col gap-6 px-1">
        {chatsPreviewsByDates["today"].length > 0 && (
          <li className="flex flex-col gap-2">
            <div className="text-center">Today</div>
            {chatsPreviewsByDates["today"].map((chat) =>
              renderChatPreview(chat),
            )}
          </li>
        )}

        {chatsPreviewsByDates["yesterday"].length > 0 && (
          <li className="flex flex-col gap-2">
            <div className="pb-2 text-center">Yesterday</div>
            {chatsPreviewsByDates["yesterday"].map((chat) =>
              renderChatPreview(chat),
            )}
          </li>
        )}

        {chatsPreviewsByDates["3daysAgo"].length > 0 && (
          <li className="flex flex-col gap-2">
            <div className="pb-2 text-center">3 days ago</div>
            {chatsPreviewsByDates["3daysAgo"].map((chat) =>
              renderChatPreview(chat),
            )}
          </li>
        )}

        {chatsPreviewsByDates["weekAgo"].length > 0 && (
          <li className="flex flex-col gap-2">
            <div className="pb-2 text-center">Week ago</div>
            {chatsPreviewsByDates["weekAgo"].map((chat) =>
              renderChatPreview(chat),
            )}
          </li>
        )}
      </ul>
    </div>
  );
}

export default ChatList;
