import { Message } from "../types/chat";

export function messageToAPIObject(message: Message) {
  const APIMessage = {
    "role": String(message.role),
    "content": [
      {
        "type": "text",
        "text": String(message.content),
      },
    ],
  };
  return APIMessage;
}
