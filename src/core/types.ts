import type { ReactElement } from "react";

export type Resolve<T = unknown> = ((value?: T) => void) | undefined;
export type Resolvable<T> = ({ resolve }: { resolve: Resolve<T> }) => ReactElement;
export type Modal<T = any> = { // eslint-disable-line
  id: string;
  resolve: Resolve<T>;
  element: ReactElement;
};
