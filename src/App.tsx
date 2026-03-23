import { useEffect, useRef, useState } from "react";
import "./tailwind.css";

import { motion, AnimatePresence } from "motion/react";
import ChatMessage from "./components/chatMessage";

import ChatList from "./components/chatList";
import UserInput from "./components/userInput";
import Topbar from "./components/topbar";
import { useCurrentChat } from "./store/chatSelectors";
import SelectModelList from "./components/selectModelList";
import { getModel } from "./types/models";
import MobileChatList from "./components/mobileChatList";

function App() {
  const currentChat = useCurrentChat();
  const { messages, status, modelKey, isSelectingModel } = currentChat;
  const model = modelKey ? getModel(modelKey) : null;

  const inputContainer = useRef<HTMLDivElement | null>(null);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    inputContainer.current?.scrollIntoView({ behavior: "smooth" });
  }, [status, messages]);

  return (
    <div className="flex h-screen w-screen bg-[color:var(--app-bg)] text-[color:var(--text)]">
      <ChatList />
      {/* mobile sidebar */}

      <MobileChatList
        isOpen={mobileSidebarOpen}
        setIsOpen={setMobileSidebarOpen}
      />

      {/* sidebar end */}

      <div id="chatBox" className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <div className="flex-1 overflow-y-auto scroll-smooth">
          {!model || isSelectingModel ? (
            <div className="flex min-h-[70vh] items-center justify-center px-6 py-12">
              <SelectModelList />
            </div>
          ) : (
            <>
              <div className="flex min-h-full flex-col">
                <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 pt-10 pb-8">
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
                  <div className="mx-auto w-full max-w-3xl px-6 pt-5 pb-8">
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
