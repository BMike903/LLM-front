import { useRef } from "react";

import { BiSend, BiLoader, BiRepeat, BiImageAdd } from "react-icons/bi";

import { useCurrentChat, useCurrentChatId } from "../store/chatSelectors";
import useChatsStore from "../store/store";
import { getModel } from "../types/models";
import { sendMessage } from "../services/chatService";
import { FileConversionResult } from "../types/chat";
import { fileToChatFile } from "../utils/files";
import FileItem from "./fileItem";

function UserInput() {
  const currentChatId = useCurrentChatId();
  const { draftMessage, draftFiles, modelKey, status } = useCurrentChat();

  const setDraftMessage = useChatsStore((state) => state.setDraftMessage);
  const setDraftFiles = useChatsStore((state) => state.setDraftFiles);

  const model = modelKey ? getModel(modelKey) : null;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isInputEmpty = () => draftMessage.trim() === "";

  const makeRequest = async () => {
    if (status === "fetching" || isInputEmpty()) return;
    if (model == null) return;
    sendMessage(currentChatId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      makeRequest();
    }
  };

  const renderSendButton = () => {
    if (status === "fetching") {
      return <BiLoader className="animate-spin" size="2em" />;
    } else if (status === "error") {
      return <BiRepeat size="2em" />;
    } else {
      return <BiSend size="2em" />;
    }
  };

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const removeAttachedFile = (id: string) => {
    if (status === "fetching") {
      return;
    }
    const updatedFiles = draftFiles.filter((file) => file.id !== id);
    setDraftFiles(currentChatId, updatedFiles);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = Array.from(e.target.files || []);

    const results: FileConversionResult[] = await Promise.allSettled(
      rawFiles.map((item) => fileToChatFile(item, "img")),
    ).then((settled) =>
      settled.map((res, i) =>
        res.status === "fulfilled"
          ? { success: true, file: res.value }
          : { success: false, error: res.reason, name: rawFiles[i]?.name },
      ),
    );

    const successfulFiles = results
      .filter((item) => item.success)
      .map((item) => item.file);

    if (successfulFiles.length > 0) {
      setDraftFiles(currentChatId, [...draftFiles, ...successfulFiles]);
    }

    results.forEach((item) => {
      if (!item.success) {
        if (item.error instanceof Error) {
          console.error(item.error.message);
        } else {
          console.error("Unknown error", item.error);
        }
      }
    });
  };

  return (
    <>
      {draftFiles.length > 0 && (
        <div
          id="attachedFiles"
          className="mx-auto mb-2 flex w-full max-w-2xl flex-row flex-wrap gap-4 rounded-xl border border-gray-300 bg-white/90 p-3 shadow-lg dark:border-gray-700 dark:bg-gray-900/90"
        >
          {draftFiles.map((item) => (
            <FileItem
              file={item}
              displayType="draftFile"
              onRemove={() => removeAttachedFile(item.id)}
              key={item.id}
            />
          ))}
        </div>
      )}

      <div
        key="input-container"
        className="flex h-18 flex-row gap-3 rounded-sm border-2 border-solid border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800"
      >
        <input
          value={draftMessage}
          onChange={(e) => setDraftMessage(currentChatId, e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={status === "fetching"}
          className="mt-0 mr-auto w-full focus:outline-none"
        />

        {model?.features?.includes("img") && (
          <>
            <button
              disabled={status === "fetching" || (model ? false : true)}
              className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-solid border-gray-400 disabled:opacity-50 dark:border-gray-600"
            >
              <BiImageAdd size="2em" onClick={addImage} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        )}
        <button
          disabled={
            status === "fetching" || isInputEmpty() || (model ? false : true)
          }
          onClick={() => makeRequest()}
          className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-solid border-gray-400 disabled:opacity-50 dark:border-gray-600"
        >
          {renderSendButton()}
        </button>
      </div>
    </>
  );
}

export default UserInput;
