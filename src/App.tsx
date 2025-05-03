import { useState } from "react";
import "./tailwind.css";

import { FiSend } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";

type message = {
    role: "user" | "assistant";
    content: string;
};

function App() {
    const [question, setQuestion] = useState("");
    const [status, setStatus] = useState<"idle" | "fetching" | "fetched">("idle");
    const [messages, setMessages] = useState<Array<message>>([]);

    const makeRequest = async () => {
        if (status === "fetching" || question.trim() === "") return;

        setStatus("fetching");
        setMessages((messages) => [...messages, { role: "user", content: question }]);
        setQuestion("");

        console.log([messages.map((message) => JSON.stringify(message))]);

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "microsoft/mai-ds-r1:free",
                messages: [...messages, { "role": "user", "content": String(question) }],
            }),
        });

        const data = await response.json();
        console.log("RESPONSE:", data);
        setMessages((messages) => [
            ...messages,
            { role: "assistant", content: data.choices[0].message.content },
        ]);
        setStatus("fetched");
    };

    return (
        <div className="mt-15 mr-auto ml-auto flex w-4/5 flex-col items-center gap-15 border-2 border-solid border-gray-300 pt-15 pr-15 pl-15">
            {/* <div className="border-2 border-solid border-gray-300 p-8">{displayAnswer}</div> */}
            {messages.map((message) => (
                <div>{message.content}</div>
            ))}
            <div className="mb-15 box-border flex h-1/12 w-3/5 flex-row self-end border-2 border-solid border-gray-300 p-4">
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="mt-0 mr-auto w-full"
                />
                <button
                    disabled={status === "fetching"}
                    onClick={() => makeRequest()}
                    className="flex h-12 w-12 items-center justify-center border-2 border-solid border-gray-400"
                >
                    {status === "fetching" ? (
                        <FiLoader className="animate-spin" size={30}>
                            fetchng
                        </FiLoader>
                    ) : (
                        <FiSend size={30} />
                    )}
                </button>
            </div>
        </div>
    );
}

export default App;
