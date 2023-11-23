import { ReactNode, useState } from "react";
import ModalsContext from "./ModalsContext";
import React from "react";
import { Modal } from "./types";

export default function ModalsProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<Modal[]>([]);
  return (
    <ModalsContext.Provider value={setModals}>
      {children}

      {/* MODALS TRAY */}
      {modals.map((modal) => React.cloneElement(modal.element, { key: modal.id }))}
    </ModalsContext.Provider>
  );
}
