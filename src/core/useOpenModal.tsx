import { cloneElement, useContext } from "react";
import ModalsContext from "./ModalsContext";
import { deferredPromise, uuidv4 } from "../utils";
import type { Modal, Reject, Resolve } from "./types";

type OpenModalOptions = { onceClosed?: () => void };
const defaultOptions: Partial<OpenModalOptions> = {};
export default function useOpenModal() {
  const setModals = useContext(ModalsContext);
  if (!setModals) {
    throw new Error("Trying to access useOpenModal outside of context");
  }

  return function openModal<TValue = unknown, TError = unknown>(
    modal: (resolve: Resolve<TValue>, reject: Reject<TError>) => Modal<TValue>["element"],
    options: OpenModalOptions = defaultOptions,
  ) {
    const {
      promise,
      resolve: resolvePromise,
      reject: rejectPromise,
    } = deferredPromise<TValue, TError>();

    const element = cloneElement(modal(resolve, reject));
    const entry: Modal<TValue> = {
      id: uuidv4(),
      element,
      resolve,
    };

    function resolve(value: TValue) {
      close();
      resolvePromise(value);
    }

    function reject(value?: TError) {
      close();
      rejectPromise(value);
    }

    function close() {
      if (!setModals) {
        throw new Error("FATAL: openModal :: resolve :: setModals is undefined");
      }
      setModals((prev) => [...prev.filter((m) => m.id !== entry.id)]);
      options.onceClosed?.();
    }

    setModals((prev) => [...prev, entry]);
    return Object.assign(promise, { resolve, reject });
  };
}
