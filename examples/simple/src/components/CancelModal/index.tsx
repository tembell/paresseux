import { ReactNode } from "react";

export default function CancelModal({
  children,
  onCancel,
}: {
  children: ReactNode;
  onCancel: () => void;
}) {
  return (
    <div className="flex justify-center items-center fixed top-0 right-0 bg-black/30 backdrop-blur w-screen h-screen">
      <div className="bg-gray-700 rounded p-8 flex flex-col gap-4">
        {children}
        <button onClick={() => onCancel()}>Cancel</button>
      </div>
    </div>
  );
}
