import { useState } from "react";
import { useOpenModal } from "@tembell/paresseux"
import ChooseMathOpModal, { MathOp } from "./components/ChooseMathOpModal";
import NumbersModal from "./components/NumbersModal";

function App() {
  const openModal = useOpenModal();
  const [count, setCount] = useState(0);
  const addModalFlow = async () => {
    const mathOp = await openModal<MathOp>(<ChooseMathOpModal />);
    if (!mathOp) return;

    // FIXME: why does other props not show in ts types?
    const amount = await openModal<number>(<NumbersModal title="How Much?" />);
    // FIXME: why this must be undefined?
    if (!amount) return;

    const mathOpMult = mathOp === "add" ? 1 : -1;
    setCount(count + (amount * mathOpMult))
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
      <div className="font-thin text-6xl">Paresseux Demo</div>
      <div className="text-gray-300">Click on the button to start the Demo flow</div>
      <div className="text-lg">Your current count is <span className="text-4xl">{count}</span>.</div>
      <div className="m-8">
        <div className="flex justify-center gap-4 mb-4">
          <button onClick={() => addModalFlow()}>Modify Count</button>
        </div>
      </div>
      <p className="text-sm text-gray-400">Go to the <a>docs</a> to learn more</p>
    </div>
  );
}


export default App;
