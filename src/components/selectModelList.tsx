import { models } from "../constants/models";
import useChatsStore from "../store/store";
import { useCurrentChatId } from "../store/chatSelectors";
import { ModelsKey } from "../types/models";

function SelectModelList() {
  const setModel = useChatsStore((state) => state.setModel);
  const setSelectingModel = useChatsStore((state) => state.setSelectingModel);
  const currentChatId = useCurrentChatId();

  const onModelClick = (modelKey: ModelsKey) => {
    setModel(currentChatId, modelKey);
    setSelectingModel(currentChatId, false);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <p className="text-lg font-bold">Select a model to start chat</p>
      <ul className="flex flex-row flex-wrap gap-6">
        {Object.entries(models).map(([modelKey, model]) => (
          <li
            key={modelKey}
            onClick={() => onModelClick(modelKey)}
            className="w-96 rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-3 hover:cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <button
              onClick={() => onModelClick(modelKey)}
              tabIndex={0}
              className="hover:cursor-pointer"
            >
              <p className="text-center font-bold">{model.name}</p>
              <br />
              {model.description}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectModelList;
