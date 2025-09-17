import { useEffect, useRef } from "react";
import "./tailwind.css";

import { BiEdit } from "react-icons/bi";
import { motion, AnimatePresence } from "motion/react";
import ChatMessage from "./components/chatMessage";

import ChatList from "./components/chatList";
import UserInput from "./components/userInput";
import useChatsStore from "./store/store";
import { useCurrentChat, useCurrentChatId } from "./store/chatSelectors";
import SelectModelList from "./components/selectModelList";
import { getModel } from "./types/models";
import CurrentChatTitleInput from "./components/titleInput";

function App() {
  const currentChatId = useCurrentChatId();
  const currentChat = useCurrentChat();
  const { messages, status, modelKey, startDate, title, isSelectingModel } =
    currentChat;
  const model = modelKey ? getModel(modelKey) : null;
  const setSelectingModel = useChatsStore((state) => state.setSelectingModel);

  const inputContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputContainer.current?.scrollIntoView({ behavior: "smooth" });
  }, [status, messages]);

  return (
    <div className="flex h-screen w-screen flex-row dark:text-white">
      <ChatList />
      <div
        id="chatBox"
        className="flex h-full flex-5/6 flex-col border-4 border-solid border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-black"
      >
        <div className="flex flex-row items-center justify-between gap-6 border-2 border-solid border-gray-400 bg-gray-200 p-1 px-2 pl-6 dark:border-gray-600 dark:bg-black">
          <div className="flex flex-row gap-2">
            {"model name:\u00A0"}
            <b>{model ? model.name : "No model selected"}</b>
            <button
              className="hover:cursor-pointer"
              disabled={status === "fetching"}
              onClick={() => setSelectingModel(currentChatId, true)}
            >
              <BiEdit size="1.3em" />
            </button>
          </div>
          <div className="flex flex-row items-center">
            {"Chat title: \u00A0"}
            <b className="mx-5">
              <CurrentChatTitleInput
                title={title}
                firstMessage={messages[0]?.content}
                chatID={currentChatId}
              />
            </b>
          </div>

          <div>Chat started at: {new Date(startDate).toUTCString()}</div>
        </div>

        <div className="mx-auto flex h-full w-full flex-col items-center gap-15 overflow-y-scroll scroll-smooth border-2 border-solid border-gray-300 bg-gray-100 p-5 dark:border-gray-600 dark:bg-black">
          {!model || isSelectingModel ? (
            <div>
              <SelectModelList />
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage message={message} key={message.id} />
              ))}

              {status === "error" && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-4xl border-gray-200 bg-red-400 p-4 font-bold dark:bg-red-900"
                  >
                    Error occurred. Try to resend request later.
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          )}

          <div
            ref={inputContainer}
            className="mx-auto mt-auto box-border flex w-3/5 flex-col gap-2 self-end"
          >
            <UserInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
