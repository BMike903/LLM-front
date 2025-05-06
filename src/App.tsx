import { useState } from "react";
import "./tailwind.css";

import { FiSend } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";

import { asterisksToBoldMarkup } from "./utils/stringUtils";

type message = {
    role: "user" | "assistant";
    content: string;
    id: number;
};

function App() {
    const [question, setQuestion] = useState("");
    const [status, setStatus] = useState<"idle" | "fetching" | "fetched" | "error">("idle");
    const [messages, setMessages] = useState<Array<message>>([]);

    const makeRequest = async () => {
        if (status === "fetching" || question.trim() === "") return;

        setStatus("fetching");
        setMessages((messages) => [
            ...messages,
            { role: "user", content: question, id: Date.now() },
        ]);
        setQuestion("");

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

        if (data.error) {
            setStatus("error");
            console.log(response);
            setMessages((messages) => messages.splice(-1));
            return;
        }

        console.log("RESPONSE:", data);
        setMessages((messages) => [
            ...messages,
            { role: "assistant", content: data.choices[0].message.content, id: Date.now() },
        ]);
        setStatus("fetched");
    };

    return (
        <div className="relative mt-15 mr-auto ml-auto flex h-160 w-4/5 flex-col items-center gap-15 overflow-y-scroll scroll-smooth border-2 border-solid border-gray-300 pt-15 pr-15 pl-15">
            {status === "error" ? (
                <div key="error">Error occured</div>
            ) : (
                messages.map((message) => {
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
                })
            )}
            <div
                key="input-field"
                className="relative bottom-0 mb-15 box-border flex h-18 w-3/5 flex-row self-end border-2 border-solid border-gray-300 p-4"
            >
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="mt-0 mr-auto w-full focus:outline-none"
                />
                <button
                    disabled={status === "fetching"}
                    onClick={() => makeRequest()}
                    className="flex h-10 w-10 items-center justify-center border-2 border-solid border-gray-400"
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
