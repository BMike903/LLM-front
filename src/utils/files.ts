import { nanoid } from "nanoid";

import { FileTypes, ChatFile } from "../types/chat";

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

export async function fileToChatFile(
  file: File,
  fileType: FileTypes,
): Promise<ChatFile> {
  const base64 = await fileToBase64(file);
  return {
    id: nanoid(),
    fileType,
    file: base64,
    name: file.name,
  };
}
