import CancelModal from "../CancelModal";
import { useState } from "react";

type Props = { title: string; onCancel: () => void; onSubmit: (value: number) => void };
export default function NumbersModalBase({ onCancel, onSubmit, title }: Props) {
  const [amount, setAmount] = useState<number>();

  const handleChange = (v: number) => {
    setAmount(v);
  }

  return (
    <CancelModal onCancel={() => onCancel()}>
      <div className="text-3xl">{title}</div>
      <div className="flex gap-4">
        <button className="grow" onClick={() => onSubmit(1)}>Just 1</button>
        <button className="grow" onClick={() => onSubmit(42)}>to the moon!</button>
      </div>
      <div className="flex  gap-4">
        <input type="number" className="rounded p-2" placeholder="amount..." onChange={(e) => handleChange(Number(e.target.value))} />
        <button onClick={() => onSubmit(amount ?? 0)}>Selct Custom </button>
      </div>
    </CancelModal>
  );
}
