import { useState, useEffect, useRef } from "react";
import "./tailwind.css";

import { nanoid } from "nanoid";
import { FiSend, FiLoader, FiRotateCcw } from "react-icons/fi";

import { Chat } from "./types/chat";
import { asterisksToBoldMarkup } from "./utils/stringUtils";

function App() {
    const [question, setQuestion] = useState("");
    const [chat, setChat] = useState<Chat>({
        model: "meta-llama/llama-4-scout:free",
        messages: [],
        status: "idle",
    });

    const inputContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        inputContainer.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat.messages]);

    const makeRequest = async () => {
        if (chat.status === "fetching" || question.trim() === "") return;

        setChat((chat) => ({
            ...chat,
            status: "fetching",
        }));

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: chat.model,
                messages: [...chat.messages, { "role": "user", "content": String(question) }],
            }),
        });

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
                { role: "assistant", content: data.choices[0].message.content, id: nanoid() },
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
        <>
            <header className="m-1.5 pl-6">
                Model: <b>{chat.model}</b>
            </header>

            <div className="relative mt-15 mr-auto ml-auto flex h-160 w-4/5 flex-col items-center gap-15 overflow-y-scroll scroll-smooth border-2 border-solid border-gray-300 pt-15 pr-15 pl-15">
                {chat.messages.map((message) => {
                    if (message.role === "user") {
                        return (
                            <div
                                className="self-end rounded-s-xl rounded-br-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700"
                                key={message.id}
                            >
                                {message.content}
                            </div>
                        );
                    } else {
                        return <div key={message.id}>{asterisksToBoldMarkup(message.content)}</div>;
                    }
                })}

                {chat.status === "error" && (
                    <div className="rounded-4xl border-gray-200 bg-red-400 p-4 font-bold">
                        Error occurred. Try to resend request later.
                    </div>
                )}

                <div
                    key="input-container"
                    ref={inputContainer}
                    className="relative bottom-0 mt-auto mb-5 box-border flex h-18 w-3/5 flex-row self-end border-2 border-solid border-gray-300 p-4"
                >
                    <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={chat.status === "fetching"}
                        className="mt-0 mr-auto w-full focus:outline-none"
                    />

                    <button
                        disabled={chat.status === "fetching"}
                        onClick={() => makeRequest()}
                        className="flex h-10 w-10 items-center justify-center border-2 border-solid border-gray-400"
                    >
                        {renderSendButton()}
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
