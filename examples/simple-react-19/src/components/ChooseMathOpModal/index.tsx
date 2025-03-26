import CancelModal from "../CancelModal";

type Props = { onAdd: () => void; onRemove: () => void; onCancel: () => void };
export default function ChooseMathOpModalBase({ onAdd, onRemove, onCancel }: Props) {
  return (
    <CancelModal onCancel={() => onCancel()}>
      <div className="text-3xl">What do you want to do?</div>
      <div className="flex gap-4 justify-between">
        <button className="grow" onClick={() => onAdd()}>
          Add
        </button>
        <button className="grow" onClick={() => onRemove()}>
          Remove
        </button>
      </div>
    </CancelModal>
  );
}
