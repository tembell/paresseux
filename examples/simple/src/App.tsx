import { useState } from "react";
import useOpenModal from "../../../src/core/useOpenModal";
import ChooseMathOpModal from "./components/ChooseMathOpModal";
import NumbersModal from "./components/NumbersModal";

function App() {
  const openModal = useOpenModal();
  const [count, setCount] = useState(0);

  const addModalFlow = async () => {
    try {
      const mathOp = await openModal<"add" | "remove">((resolve, reject) => (
        <ChooseMathOpModal
          onAdd={() => resolve("add")}
          onRemove={() => resolve("remove")}
          onCancel={() => reject()}
        />
      ));

      const amount = await openModal<number>((resolve, reject) => (
        <NumbersModal title="How Much?" onCancel={() => reject()} onSubmit={(v) => resolve(v)} />
      ));

      const mathOpMult = mathOp === "add" ? 1 : -1;
      setCount(count + amount * mathOpMult);
    } catch (error) {
      console.log({ error });
      return;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
      <div className="font-thin text-6xl">Paresseux Demo</div>
      <div className="text-gray-300">Click on the button to start the Demo flow</div>
      <div className="text-lg">
        Your current count is <span className="text-4xl">{count}</span>.
      </div>
      <div className="m-8">
        <div className="flex justify-center gap-4 mb-4">
          <button onClick={() => addModalFlow()}>Modify Count</button>
        </div>
      </div>
      <p className="text-sm text-gray-400">
        Go to the <a>docs</a> to learn more
      </p>
    </div>
  );
}

export default App;
