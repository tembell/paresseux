import CancelModal from "../CancelModal";
import type { Resolve } from "@tembell/paresseux"
import { withClose } from "@tembell/paresseux/helpers"
import { useState } from "react";

function NumbersModalBase({ resolve, title }: { title: string; resolve: Resolve<number | undefined> }) {
  const [amount, setAmount] = useState<number>();

  const handleChange = (v: number) => {
    setAmount(v);
  }

  return (
    <CancelModal onCancel={() => resolve?.()}>
      <div className="text-3xl">{title}</div>
      <div className="flex gap-4">
        <button className="grow" onClick={() => resolve?.(1)}>Just 1</button>
        <button className="grow" onClick={() => resolve?.(42)}>to the moon!</button>
      </div>
      <div className="flex  gap-4">
        <input type="number" className="rounded p-2" placeholder="amount..." onChange={(e) => handleChange(Number(e.target.value))} />
        <button onClick={() => resolve?.(amount ?? 0)}>Selct Custom </button>
      </div>
    </CancelModal>
  );
}
// FIXME: this should only require to have the resolve not block for others props
export default withClose(NumbersModalBase);
