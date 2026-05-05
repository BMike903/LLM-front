import { useState, useRef, useEffect } from "react";

import Markdown from "react-markdown";
import {
  BiSolidTrashAlt,
  BiCopy,
  BiRevision,
  BiEditAlt,
  BiCheck,
  BiUndo,
} from "react-icons/bi";

import FileItem from "./fileItem";
import { Message } from "../types/chat";
import useChatsStore from "../store/store";
import { useCurrentChatId } from "../store/chatSelectors";
import ConfirmModal from "./confirmModal";
import { regenerateMessage } from "../services/chatService";

function ChatMessage({ message }: { message: Message }) {
  const deleteMessage = useChatsStore((state) => state.deleteMessage);
  const updateMessage = useChatsStore((state) => state.updateMessage);
  const currentChatId = useCurrentChatId();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.content);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      handleTextareaResize();
    }
  }, [isEditing, editedText]);

  const handleTextareaResize = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleSaveEdits = () => {
    updateMessage(currentChatId, message.id, editedText);
    setIsEditing(false);
  };
  const handleUndo = () => {
    setEditedText(message.content);
    setIsEditing(false);
  };

  let messageItem;

  if (message.role === "user") {
    messageItem = (
      <div key={message.id} className="group flex w-full justify-end">
        <div
          className={`${isEditing ? "flex-1" : ""} relative flex max-w-[85%] min-w-0 flex-col gap-2`}
        >
          <div className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 shadow-sm">
            {isEditing ? (
              <textarea
                ref={textareaRef}
                className="block w-full resize-none rounded-2xl p-1.5"
                value={editedText}
                onChange={(e) => {
                  setEditedText(e.target.value);
                }}
                autoFocus
              />
            ) : (
              <div className="text-sm leading-6 whitespace-pre-wrap">
                {message.content}
              </div>
            )}

            {message.files && (
              <div className="mt-3 flex flex-row gap-3">
                {message.files.map((item) => (
                  <FileItem
                    file={item}
                    displayType="messageFile"
                    key={item.id}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-3 self-end">
            {!isEditing && (
              <>
                <button
                  className="text-[color:var(--muted)] hover:text-[color:var(--text)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  aria-label="Edit message"
                  title="Edit message"
                >
                  <BiEditAlt size="1.1em" />
                </button>
                <button
                  className="text-[color:var(--muted)] hover:text-[color:var(--text)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(message.content);
                  }}
                  aria-label="Copy message"
                  title="Copy message"
                >
                  <BiCopy size="1.1em" />
                </button>
                <button
                  className="text-[color:var(--muted)] hover:text-[color:var(--text)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  aria-label="Delete message"
                  title="Delete message"
                >
                  <BiSolidTrashAlt size="1.1em" />
                </button>{" "}
              </>
            )}

            {isEditing && (
              <>
                <button
                  className="text-[color:var(--muted)] hover:text-[color:var(--text)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(false);
                    handleSaveEdits();
                  }}
                  aria-label="Edit message"
                  title="Edit message"
                >
                  <BiCheck size="1.1em" />
                </button>
                <button
                  className="text-[color:var(--muted)] hover:text-[color:var(--text)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUndo();
                  }}
                  aria-label="Undo edits"
                  title="Undo edits"
                >
                  <BiUndo size="1.1em" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    messageItem = (
      <div className="group relative flex flex-col gap-2" key={message.id}>
        <div className="markdown">
          <Markdown>{message.content}</Markdown>
        </div>

        <div className="flex flex-row gap-3 self-start">
          <button
            className="text-[color:var(--muted)] hover:text-[color:var(--text)]"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            aria-label="Delete message"
            title="Delete message"
          >
            <BiSolidTrashAlt size="1.1em" />
          </button>

          <button
            className="text-[color:var(--muted)] hover:text-[color:var(--text)]"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(message.content);
            }}
            aria-label="Copy message"
            title="Copy message"
          >
            <BiCopy size="1.1em" />
          </button>

          <button
            className="text-[color:var(--muted)] hover:text-[color:var(--text)]"
            onClick={(e) => {
              e.stopPropagation();
              regenerateMessage(currentChatId, message.id);
            }}
            aria-label="Regenerate"
            title="Regenerate"
          >
            <BiRevision size="1.1em" />
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      {" "}
      {messageItem}{" "}
      <ConfirmModal
        title="Delete Message"
        description="Are you sure you want to delete this message?"
        onConfirm={() => deleteMessage(currentChatId, message.id)}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      />{" "}
    </>
  );
}
export default ChatMessage;
