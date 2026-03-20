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
    <div className="flex h-screen w-screen bg-[color:var(--app-bg)] text-[color:var(--text)]">
      <ChatList />
      <div id="chatBox" className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-10 border-b border-[color:var(--border)] bg-[color:var(--surface-80)] px-6 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
              <span>Model</span>
              <span className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1 text-[0.7rem] font-semibold text-[color:var(--text)]">
                {model ? model.name : "Select model"}
              </span>
              <button
                className="rounded-full border border-transparent p-1 text-[color:var(--muted)] transition hover:border-[color:var(--border)] hover:text-[color:var(--text)]"
                disabled={status === "fetching"}
                onClick={() => setSelectingModel(currentChatId, true)}
                aria-label="Change model"
              >
                <BiEdit size="1.1em" />
              </button>
            </div>

            <div className="flex min-w-[220px] flex-1 items-center justify-center text-sm font-semibold">
              <CurrentChatTitleInput
                title={title}
                firstMessage={messages[0]?.content}
                chatID={currentChatId}
              />
            </div>

            <div className="hidden text-xs text-[color:var(--muted)] lg:block">
              Started {new Date(startDate).toUTCString()}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scroll-smooth">
          {!model || isSelectingModel ? (
            <div className="flex min-h-[70vh] items-center justify-center px-6 py-12">
              <SelectModelList />
            </div>
          ) : (
            <>
              <div className="flex min-h-full flex-col">
                <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 pb-8 pt-10">
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
                        className="rounded-2xl border border-[color:var(--error-border)] bg-[color:var(--error-bg)] p-4 text-sm font-semibold text-[color:var(--error-text)]"
                      >
                        Error occurred. Try to resend request later.
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <div
                  ref={inputContainer}
                  className="sticky bottom-0 z-10 border-t border-transparent bg-gradient-to-t from-[color:var(--app-bg)] via-[color:var(--app-bg)] to-transparent"
                >
                  <div className="mx-auto w-full max-w-3xl px-6 pb-8 pt-5">
                    <UserInput />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
