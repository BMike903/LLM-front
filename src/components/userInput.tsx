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
          className="mx-auto mb-3 flex w-full max-w-2xl flex-row flex-wrap gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-90)] p-3 shadow-sm"
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
        className="flex min-h-[3.5rem] flex-row items-center gap-3 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 shadow-lg shadow-black/5"
      >
        <input
          value={draftMessage}
          onChange={(e) => setDraftMessage(currentChatId, e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={status === "fetching"}
          placeholder="Message..."
          className="mr-auto w-full bg-transparent text-sm focus:outline-none"
        />

        {model?.features?.includes("img") && (
          <>
            <button
              disabled={status === "fetching" || (model ? false : true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--muted)] transition hover:text-[color:var(--text)] disabled:opacity-50"
              aria-label="Attach image"
              onClick={addImage}
            >
              <BiImageAdd size="2em" />
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--accent)] text-white transition hover:bg-[color:var(--accent-strong)] disabled:opacity-50 disabled:hover:bg-[color:var(--accent)]"
          aria-label="Send message"
        >
          {renderSendButton()}
        </button>
      </div>
    </>
  );
}

export default UserInput;
