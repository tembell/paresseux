import { cloneElement, useContext } from "react";
import ModalsContext from "./ModalsContext";
import { deferredPromise, uuidv4 } from "../utils";
import { Modal } from "./types";

type OpenModalOptions = { closeOnResolve?: boolean; onceClosed?: () => void };
export default function useOpenModal() {
  const setModals = useContext(ModalsContext);
  if (!setModals) {
    throw new Error("Trying to accesse useOpenModal outside of context");
  }

  return function openModal<T = unknown>(
    originModal: Modal<T>["element"],
    options: OpenModalOptions = { closeOnResolve: true },
  ) {
    const { promise, resolve: resolvePromise } = deferredPromise<T | undefined>();

    const element = cloneElement(originModal, { resolve });
    const entry: Modal<T> = {
      id: uuidv4(),
      element,
      resolve,
    };

    function resolve(value?: T) {
      if (options.closeOnResolve) {
        close();
      }
      resolvePromise(value);
    }

    function close() {
      if (!setModals) {
        throw new Error("FATAL: openModal :: resolve :: setModals is undefined");
      }
      setModals((prev) => [...prev.filter((m) => m.id !== entry.id)]);
      options.onceClosed?.();
    }

    setModals((prev) => [...prev, entry]);
    return Object.assign(promise, { resolve });
  };
}
