import { useState, useEffect, useRef } from "react";
import "./tailwind.css";

import { nanoid } from "nanoid";
import { FiSend, FiLoader, FiRotateCcw } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

import { Chat } from "./types/chat";
import { asterisksToBoldMarkup } from "./utils/stringUtils";

function App() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<Chat>({
    model: "meta-llama/llama-4-scout:free",
    messages: [],
    status: "idle",
    startDate: new Date(),
  });

  const isInputEmpty = () => question.trim() === "";

  const inputContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputContainer.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.status, chat.messages]);

  const makeRequest = async () => {
    if (chat.status === "fetching" || isInputEmpty()) return;

    setChat((chat) => ({
      ...chat,
      status: "fetching",
    }));

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: chat.model,
          messages: [
            ...chat.messages,
            { "role": "user", "content": String(question) },
          ],
        }),
      },
    );

    if (!response.ok) {
      console.log("ERROR: ", response);
      setChat((chat) => ({ ...chat, status: "error" }));
      return;
    }

    const data = await response.json();
    setChat((chat) => ({
      ...chat,
      status: "fetched",
      messages: [
        ...chat.messages,
        { role: "user", content: question, id: nanoid() },
        {
          role: "assistant",
          content: data.choices[0].message.content,
          id: nanoid(),
        },
      ],
    }));
    setQuestion("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      makeRequest();
    }
  };

  const renderSendButton = () => {
    if (chat.status === "fetching") {
      return <FiLoader className="animate-spin" size={30} />;
    } else if (chat.status === "error") {
      return <FiRotateCcw size={30} />;
    } else {
      return <FiSend size={30} />;
    }
  };

  return (
    <div className="flex h-screen w-screen flex-row dark:text-white">
      <div
        id="chatList"
        className="flex h-full border-4 border-solid border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-black"
      >
        <ul className="flex flex-col gap-6 px-1 py-6">
          <li className="rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700">
            First chat and its content
          </li>
          <li className="rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700">
            Second chat and its content
          </li>
          <li className="rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700">
            Third chat and its content
          </li>
        </ul>
      </div>

      <div
        id="chatBox"
        className="flex h-full flex-4/5 flex-col border-4 border-solid border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-black"
      >
        <div className="flex flex-row justify-between border-2 border-solid border-gray-400 bg-gray-200 p-1 px-2 pl-6 dark:border-gray-600 dark:bg-black">
          <div>
            Model: <b>{chat.model}</b>
          </div>
          <div>Chat started at: {chat.startDate.toLocaleString()}</div>
        </div>

        <div className="mx-auto flex h-full w-full flex-col items-center gap-15 overflow-y-scroll scroll-smooth border-2 border-solid border-gray-300 bg-gray-100 p-5 dark:border-gray-600 dark:bg-black">
          {chat.messages.map((message) => {
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

          {chat.status === "error" && (
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
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={chat.status === "fetching"}
              className="mt-0 mr-auto w-full focus:outline-none"
            />

            <button
              disabled={chat.status === "fetching" || isInputEmpty()}
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
