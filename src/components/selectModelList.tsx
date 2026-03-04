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
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center">
      <p className="text-lg font-semibold">Select a model to start chat</p>
      <p className="max-w-xl text-sm text-[color:var(--muted)]">
        Choose the model that fits your task. You can switch later from the
        header.
      </p>
      <ul className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        {Object.entries(models).map(([modelKey, model]) => (
          <li
            key={modelKey}
            onClick={() => onModelClick(modelKey)}
            className="group rounded-2xl border border-[color:var(--border)] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:shadow-md hover:shadow-emerald-500/10"
          >
            <button
              onClick={() => onModelClick(modelKey)}
              tabIndex={0}
              className="w-full text-left"
            >
              <p className="text-sm font-semibold">{model.name}</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                {model.description}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectModelList;
