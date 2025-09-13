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

export function base64ToFile(base64: string, filename?: string): File {
  if (!filename) filename = "file";
  const [header, data] = base64.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "application/octet-stream";
  const bstr = atob(data);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
