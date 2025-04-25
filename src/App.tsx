import { useState } from "react";
import "./tailwind.css"

function App() {
	const [input, setInput] = useState("");
	const [answer, setAnswer] = useState("");
	const [reasoning, setReasoning] = useState("");
	const [status, setStatus] = useState<"idle" | "fetching" | "fetched">("idle");
	let displayAnswer, displayReason;

	const makeRequest = async() => {
		if(input === "" || input.trim().length === 0) return;
		setStatus("fetching");
		const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"model": "microsoft/mai-ds-r1:free",
				"messages": [
				  {
					"role": "user",
					"content": input
				  }
				]
			}),
		});

		const data = await response.json();
		console.log("RESPONSE:", data);
		setAnswer(data.choices[0].message.content);
		setReasoning(data.choices[0].message.reasoning);
		setStatus("fetched");
	}

	if(status === "idle"){
		displayAnswer = "Make a request";
		displayReason = "Make a request";
	}else if(status === "fetching"){
		displayAnswer = "Loading answer";
		displayReason = "loading reason";
	}else {
		displayAnswer = answer;
		displayReason = reasoning;
	}

	return (
		<>
			<input value={input} onChange={e => setInput(e.target.value)}/>
			<button disabled={status === "fetching"} onClick={() => makeRequest()}>Send request</button>
			<hr/>
			<div>{displayAnswer}</div>
			<hr style={{borderTop: "3px dashed #bbb"}}/>
			<div>{displayReason}</div>
		</>
	)
}

export default App;