import { useState } from "react";
import "./tailwind.css";
import "./temp.css";

function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [status, setStatus] = useState<"idle" | "fetching" | "fetched">("idle");
    let displayAnswer;

    const makeRequest = async () => {
        if (status === "fetching" || question.trim() === "") return;
        setStatus("fetching");
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "microsoft/mai-ds-r1:free",
                messages: [
                    {
                        role: "user",
                        content: question,
                    },
                ],
            }),
        });

        const data = await response.json();
        console.log("RESPONSE:", data);
        setAnswer(data.choices[0].message.content);
        setStatus("fetched");
    };

    if (status === "idle") {
        displayAnswer = "Response will be here";
    } else if (status === "fetching") {
        displayAnswer = "Loading answer";
    } else {
        displayAnswer = answer;
    }

    return (
        <div className="mt-15 mr-auto ml-auto flex w-4/5 flex-col items-center gap-15 border-2 border-solid border-gray-300 pt-15 pr-15 pl-15">
            <div className="border-2 border-solid border-gray-300 p-8">{displayAnswer}</div>

            <div className="mb-15 box-border flex h-1/12 w-3/5 flex-row self-end border-2 border-solid border-gray-300 p-4">
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="mt-0 mr-auto w-4/5"
                />
                <button disabled={status === "fetching"} onClick={() => makeRequest()}>
                    <img src="../public/send-button.svg" />
                </button>
            </div>
        </div>
    );
}

export default App;
