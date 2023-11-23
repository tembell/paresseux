import CancelModal from "../CancelModal";
import type { Resolve } from "@tembell/paresseux"
import { withClose } from "@tembell/paresseux/helpers"

export type MathOp = "add" | "remove" | undefined;
// FIXME: API this should not care about the name resolve
function ChooseMathOpModalBase({ resolve }: { resolve: Resolve<MathOp> }) {
  return (
    <CancelModal onCancel={() => resolve?.()}>
      <div className="text-3xl">What do you want to do?</div>
      <div className="flex gap-4 justify-between">
        <button className="grow" onClick={() => resolve?.("add")}>Add</button>
        <button className="grow" onClick={() => resolve?.("remove")}>Remove</button>
      </div>
    </CancelModal>
  );
}
// FIXME: change this to withResolve
export default withClose(ChooseMathOpModalBase);
