import { useState, useEffect, useRef } from "react";

import {
  BiCheck,
  BiEdit,
  BiRepeat,
  BiLoader,
  BiUndo,
  BiBot,
  BiError,
  BiChevronsLeft,
} from "react-icons/bi";

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

  const inputRef = useRef<HTMLTextAreaElement>(null);
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

  const handleApplyTitleTipAlert = () => {
    setIsEditing(true);
    setInputTitle(titleTip);
    setTitleTipStatus(chatID, "empty");
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const renderSuggestTitleTipButton = () => {
    switch (titleTipStatus) {
      case "empty":
        return (
          <button onClick={() => handleSuggest()}>
            <BiBot title="Get suggestion from model" size="1.3em" />
          </button>
        );
      case "fetching":
        return (
          <button>
            <BiLoader className="animate-spin" size="1.3em" />
          </button>
        );
      case "notApplied":
        return (
          <button onClick={handleApplySuggestedTitle}>
            <BiChevronsLeft
              color="#d4ac0d"
              title="Apply suggested title tip"
              size="1.3em"
            />
          </button>
        );
      case "error":
        return (
          <button onClick={() => handleSuggest()}>
            <BiRepeat
              color="red"
              title="Retry getting suggestion from model "
              size="1.3em"
            />
          </button>
        );
    }
  };

  const renderSuggestTitleTipWarning = () => {
    switch (titleTipStatus) {
      case "fetching":
        return (
          <button>
            <BiLoader className="animate-spin" size="1.3em" />
          </button>
        );
      case "error":
        return (
          <button>
            <BiError
              color="red"
              title="Error occurred while loading title tip"
              size="1.3em"
            />
          </button>
        );
      case "notApplied":
        return (
          <button onClick={handleApplyTitleTipAlert}>
            <BiError
              color="#d4ac0d"
              title="Title tip was not applied"
              size="1.3em"
            />
          </button>
        );
    }
  };

  return (
    <div className="flex h-auto flex-row gap-3">
      <textarea
        disabled={!isEditing || titleTipStatus === "fetching"}
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        ref={inputRef}
        className="h-auto flex-2/3 resize-none"
        onKeyDown={handleEnterPress}
      />

      {isEditing ? (
        <>
          <button
            onClick={() => handleSubmit()}
            disabled={titleTipStatus === "fetching"}
          >
            <BiCheck size="1.3em" />
          </button>
          <button
            onClick={() => handleUndo()}
            disabled={titleTipStatus === "fetching"}
          >
            <BiUndo size="1.3em" />
          </button>

          {renderSuggestTitleTipButton()}
        </>
      ) : (
        <>
          {renderSuggestTitleTipWarning()}

          <button onClick={() => setIsEditing((editing) => !editing)}>
            <BiEdit size="1.3em" />
          </button>
        </>
      )}
    </div>
  );
}

export default CurrentChatTitleInput;
