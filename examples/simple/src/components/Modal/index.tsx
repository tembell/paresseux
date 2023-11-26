import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center fixed top-0 right-0 bg-black/30 backdrop-blur w-screen h-screen">
      <div className="bg-gray-700 rounded p-8">{children}</div>
    </div>
  );
}
