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
        <div className="main-box">
            {/* after rounded-s-md rounded-b-lg border-2 border-solid */}
            <div className="answer">{displayAnswer}</div>

            <div className="chat-wrapper">
                {/* className="border-rad w-90 resize-none rounded-2xl border-2 border-solid border-gray-400 p-3" */}
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="type-box"
                />
                <button disabled={status === "fetching"} onClick={() => makeRequest()} className="">
                    <img src="../public/send-button.svg" />
                </button>
            </div>
        </div>
    );
}

export default App;
