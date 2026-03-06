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
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-center">
      <div className="flex max-w-3xl flex-col items-center gap-3">
        <p className="text-2xl font-semibold tracking-tight">
          Select a model to start chat
        </p>
        <p className="max-w-2xl text-sm text-[color:var(--muted)]">
          Pick the model that matches your task. You can always switch later
          from the header.
        </p>
      </div>
      <ul className="grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(models).map(([modelKey, model]) => (
          <li
            key={modelKey}
            onClick={() => onModelClick(modelKey)}
            className="group overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <button
              onClick={() => onModelClick(modelKey)}
              tabIndex={0}
              className="h-full w-full text-left"
            >
              <div className="flex h-full flex-col justify-between">
                <p className="text-center text-lg font-semibold text-[color:var(--text)]">
                  {model.name}
                </p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {model.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-[color:var(--muted)]">
                  <span className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1">
                    Click to select
                  </span>
                  <span className="font-semibold text-[color:var(--accent)]">
                    {modelKey}
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectModelList;
