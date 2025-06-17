import { useState, useEffect, useRef } from "react";

import {
  FiEdit2,
  FiCheck,
  FiRotateCcw,
  FiLoader,
  FiExternalLink,
  FiAlertTriangle,
  FiCornerDownLeft,
} from "react-icons/fi";

import { selectTitleOrFirstMessage } from "../utils/chat";
import useChatsStore from "../store/store";
import { suggestTitle } from "../services/chatService";

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
  const chatMessages = useChatsStore(
    (state) => state.chats.allChats[chatID].messages,
  );
  const titleTip = useChatsStore(
    (state) => state.chats.allChats[chatID].titleTip,
  );
  const setTitleTip = useChatsStore((state) => state.setTitleTip);
  const titleTipStatus = useChatsStore(
    (state) => state.chats.allChats[chatID].titleTipStatus,
  );
  const setTitleTipStatus = useChatsStore((state) => state.setTitleTipStatus);

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
  }, [isEditing, titleTip]);
  useEffect(() => {
    if (titleTip !== "") {
      setInputTitle(titleTip);
    }
  }, [titleTip]);

  const handleSuggest = () => {
    if (chatMessages.length === 0) return;
    suggestTitle(chatID);
  };
  const handleSubmit = () => {
    setIsEditing((editing) => !editing);
    setTitle(chatID, inputTitle);
  };
  const handleUndo = () => {
    setIsEditing((editing) => !editing);
    setInputTitle(selectTitleOrFirstMessage(title, firstMessage));
  };
  const handleApplySuggestedTitle = () => {
    setInputTitle(titleTip);
    setTitleTipStatus(chatID, "empty");
    setTitleTip(chatID, "");
  };

  return (
    <div className="flex w-96 flex-row gap-3">
      <input
        disabled={!isEditing || titleTipStatus === "fetching"}
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        ref={inputRef}
        className="w-80"
      />

      {isEditing ? (
        <>
          <button
            onClick={() => handleSubmit()}
            disabled={titleTipStatus === "fetching"}
          >
            <FiCheck />
          </button>
          <button
            onClick={() => handleUndo()}
            disabled={titleTipStatus === "fetching"}
          >
            <FiRotateCcw />
          </button>

          {titleTipStatus === "notApplied" ? (
            <button onClick={handleApplySuggestedTitle}>
              <FiCornerDownLeft
                color="#d4ac0d"
                title="Apply suggested title tip"
              />
            </button>
          ) : (
            <button
              onClick={() => handleSuggest()}
              disabled={titleTipStatus === "fetching"}
            >
              {titleTipStatus === "fetching" ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiExternalLink title="Get suggestion from model" />
              )}
            </button>
          )}
        </>
      ) : (
        <>
          {titleTipStatus === "notApplied" && (
            <button>
              <FiAlertTriangle
                color="#d4ac0d"
                title="Title tip was not applied"
              />
            </button>
          )}
          <button onClick={() => setIsEditing((editing) => !editing)}>
            <FiEdit2 />
          </button>
        </>
      )}
    </div>
  );
}

export default CurrentChatTitleInput;
