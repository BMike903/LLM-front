import { Message, FileTypes } from "../types/chat";

export function appFileTypeToApi(type: FileTypes) {
  switch (type) {
    case "img":
      return "image_url";
    case "audio":
      return "input_audio";
  }
}

export function messageToAPIObject(message: Message) {
  const APIMessage: any = {
    "role": String(message.role),
    "content": [
      {
        "type": "text",
        "text": String(message.content),
      },
    ],
  };

  if (message.files && message.files.length > 0) {
    const files = message.files.map((file) => {
      return {
        "type": appFileTypeToApi(file.fileType),
        "image_url": {
          "url": file.file,
        },
      };
    });
    APIMessage["content"] = [...APIMessage["content"], ...files];
  }

  return APIMessage;
}
