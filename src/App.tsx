import { useEffect, useRef } from "react";
import "./tailwind.css";

import { FiSend, FiLoader, FiRotateCcw } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

import ChatList from "./components/chatList";
import useChatsStore from "./store/store";
import { asterisksToBoldMarkup } from "./utils/stringUtils";
import { useCurrentChat, useCurrentChatId } from "./store/chatSelectors";
import { models } from "./constants/models";
import { getModel } from "./types/models";

function App() {
  const currentChatId = useCurrentChatId();
  const currentChat = useCurrentChat();
  const { messages, status, modelKey, startDate, draftMessage } = currentChat;
  const model = modelKey ? getModel(modelKey) : null;
  const addMessage = useChatsStore((state) => state.addMessage);
  const setStatus = useChatsStore((state) => state.setStatus);
  const setModel = useChatsStore((state) => state.setModel);
  const setDraftMessage = useChatsStore((state) => state.setDraftMessage);

  const isInputEmpty = () => draftMessage.trim() === "";

  const inputContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputContainer.current?.scrollIntoView({ behavior: "smooth" });
  }, [status, messages]);

  const makeRequest = async () => {
    if (status === "fetching" || isInputEmpty()) return;
    if (model == null) return;

    setStatus(currentChatId, "fetching");
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model.APIName,
          messages: [
            ...messages,
            { "role": "user", "content": String(draftMessage) },
          ],
        }),
      },
    );

    if (!response.ok) {
      console.log("ERROR: ", response);
      setStatus(currentChatId, "error");
      return;
    }

    const data = await response.json();
    addMessage(currentChatId, "user", draftMessage);
    addMessage(currentChatId, "assistant", data.choices[0].message.content);
    setStatus(currentChatId, "idle");
    setDraftMessage(currentChatId, "");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      makeRequest();
    }
  };

  const renderSendButton = () => {
    if (status === "fetching") {
      return <FiLoader className="animate-spin" size={30} />;
    } else if (status === "error") {
      return <FiRotateCcw size={30} />;
    } else {
      return <FiSend size={30} />;
    }
  };

  return (
    <div className="flex h-screen w-screen flex-row dark:text-white">
      <ChatList />
      <div
        id="chatBox"
        className="flex h-full flex-5/6 flex-col border-4 border-solid border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-black"
      >
        <div className="flex flex-row justify-between border-2 border-solid border-gray-400 bg-gray-200 p-1 px-2 pl-6 dark:border-gray-600 dark:bg-black">
          <div>
            Model: <b>{model ? model.name : "No model selected"}</b>
          </div>
          <div>Chat started at: {new Date(startDate).toUTCString()}</div>
        </div>

        <div className="mx-auto flex h-full w-full flex-col items-center gap-15 overflow-y-scroll scroll-smooth border-2 border-solid border-gray-300 bg-gray-100 p-5 dark:border-gray-600 dark:bg-black">
          {!model && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-6">
              <p className="text-lg font-bold">Select a model to start chat</p>
              <ul className="flex flex-row flex-wrap gap-6">
                {Object.entries(models).map(([modelKey, model]) => (
                  <li
                    key={modelKey}
                    onClick={() => setModel(currentChatId, modelKey)}
                    className="w-96 rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-3 hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <p className="text-center font-bold">{model.name}</p>
                    <br />
                    {model.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
                  {asterisksToBoldMarkup(message.content)}
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
