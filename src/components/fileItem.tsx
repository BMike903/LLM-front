import { FiDownload, FiTrash2 } from "react-icons/fi";

import { ChatFile } from "../types/chat";
import { base64ToFile } from "../utils/files";

type FileItemType = "draftFile" | "messageFile";

function FileItem({
  file,
  displayType,
  onRemove,
}: {
  file: ChatFile;
  displayType: FileItemType;
  onRemove?: () => void;
}) {
  const downloadFile = () => {
    const convertedFile = base64ToFile(file.file, file.name);
    const url = URL.createObjectURL(convertedFile);

    const temp = document.createElement("a");
    temp.href = url;
    temp.download = convertedFile.name;
    document.body.appendChild(temp);
    temp.click();
    document.body.removeChild(temp);

    URL.revokeObjectURL(url);
  };

  if (file.fileType === "img") {
    return (
      <div key={file.id} className="relative inline-block">
        <img
          src={file.file}
          alt={file.name || "img"}
          className={
            displayType === "messageFile"
              ? "max-h-80 max-w-xs rounded-lg object-cover shadow"
              : "h-20 w-20 rounded object-cover"
          }
        />
        {displayType === "messageFile" && (
          <button
            onClick={downloadFile}
            className="absolute top-2 left-2 cursor-pointer"
          >
            {" "}
            <FiDownload
              style={{ color: "white", opacity: "80%" }}
              size={40}
              className="text-white drop-shadow-[0_0_2px_black]"
            />{" "}
          </button>
        )}

        {displayType === "draftFile" && (
          <button
            className="absolute top-1 right-1 cursor-pointer"
            onClick={onRemove}
          >
            {" "}
            <FiTrash2
              style={{ color: "white", opacity: "80%" }}
              size={20}
              className="text-white drop-shadow-[0_0_2px_black]"
            />{" "}
          </button>
        )}
      </div>
    );
  } else {
    return <div>unsupported file format</div>;
  }
}

export default FileItem;
