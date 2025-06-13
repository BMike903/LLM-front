import { useState, useEffect, useRef } from "react";

import { FiEdit2, FiCheck, FiRotateCcw } from "react-icons/fi";

import { selectTitleOrFirstMessage } from "../utils/chat";
import useChatsStore from "../store/store";

type CurrentChatTitleInputProps = {
  title: string;
  firstMessage: string | undefined;
  chatID: string;
};

function CurrentChatTitleInput({
  title,
  firstMessage,
  chatID,
}: CurrentChatTitleInputProps) {
  const setTitle = useChatsStore((state) => state.setTitle);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputTitle, setInputTitle] = useState(
    selectTitleOrFirstMessage(title, firstMessage),
  );

  useEffect(() => {
    setInputTitle(selectTitleOrFirstMessage(title, firstMessage));
    setIsEditing(false);
  }, [title, firstMessage]);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  const handleSubmit = () => {
    setIsEditing((editing) => !editing);
    setTitle(chatID, inputTitle);
  };
  const handleUndo = () => {
    setIsEditing((editing) => !editing);
    setInputTitle(selectTitleOrFirstMessage(title, firstMessage));
  };

  return (
    <div className="flex w-96 flex-row gap-3">
      <input
        disabled={!isEditing}
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        ref={inputRef}
        className="w-80"
      />
      {isEditing ? (
        <>
          <button onClick={() => handleSubmit()}>
            <FiCheck />
          </button>
          <button onClick={() => handleUndo()}>
            <FiRotateCcw />
          </button>
        </>
      ) : (
        <button onClick={() => setIsEditing((editing) => !editing)}>
          <FiEdit2 />
        </button>
      )}
    </div>
  );
}

export default CurrentChatTitleInput;
