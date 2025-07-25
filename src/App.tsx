import { useEffect, useRef } from "react";
import "./tailwind.css";

import { BiSend, BiLoader, BiRepeat, BiEdit } from "react-icons/bi";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";

import ChatList from "./components/chatList";
import useChatsStore from "./store/store";
import { useCurrentChat, useCurrentChatId } from "./store/chatSelectors";
import SelectModelList from "./components/selectModelList";
import { getModel } from "./types/models";
import { sendMessage } from "./services/chatService";
import CurrentChatTitleInput from "./components/titleInput";

function App() {
  const currentChatId = useCurrentChatId();
  const currentChat = useCurrentChat();
  const {
    messages,
    status,
    modelKey,
    startDate,
    draftMessage,
    title,
    isSelectingModel,
  } = currentChat;
  const model = modelKey ? getModel(modelKey) : null;
  const setDraftMessage = useChatsStore((state) => state.setDraftMessage);
  const setSelectingModel = useChatsStore((state) => state.setSelectingModel);

  const isInputEmpty = () => draftMessage.trim() === "";

  const inputContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputContainer.current?.scrollIntoView({ behavior: "smooth" });
  }, [status, messages]);

  const makeRequest = async () => {
    if (status === "fetching" || isInputEmpty()) return;
    if (model == null) return;
    sendMessage(draftMessage, currentChatId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      makeRequest();
    }
  };

  const renderSendButton = () => {
    if (status === "fetching") {
      return <BiLoader className="animate-spin" size="2em" />;
    } else if (status === "error") {
      return <BiRepeat size="2em" />;
    } else {
      return <BiSend size="2em" />;
    }
  };

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
            <SelectModelList />
          ) : (
            <>
              {messages.map((message) => {
                if (message.role === "user") {
                  return (
                    <div
                      className="self-end rounded-s-xl rounded-br-xl border-gray-200 bg-gray-300 p-4 dark:bg-gray-800"
                      key={message.id}
                    >
                      {message.content}
                    </div>
                  );
                } else {
                  return (
                    <div key={message.id}>
                      <Markdown>{message.content}</Markdown>
                    </div>
                  );
                }
              })}

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
            key="input-container"
            ref={inputContainer}
            className="relative mx-auto mt-auto box-border flex h-18 w-3/5 flex-row self-end rounded-sm border-2 border-solid border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800"
          >
            <input
              value={draftMessage}
              onChange={(e) => setDraftMessage(currentChatId, e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={status === "fetching"}
              className="mt-0 mr-auto w-full focus:outline-none"
            />

            <button
              disabled={
                status === "fetching" ||
                isInputEmpty() ||
                (model ? false : true)
              }
              onClick={() => makeRequest()}
              className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-solid border-gray-400 disabled:opacity-50 dark:border-gray-600"
            >
              {renderSendButton()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
