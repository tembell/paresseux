import { createElement } from "react";
import type { Resolvable } from "../core/types";

/**
 * Helper HOC component to make the `resolve` as a void function before passing
 * it to the `openModal` function.
 */
export default function withClose<T>(component: Resolvable<T>) {
  function WithClose(props: Omit<React.ComponentProps<typeof component>, "resolve">) {
    return createElement(component, {
      resolve: () => {
        console.warn(
          "You've used withClose without the openModal function. hint: Don't use this HOC without the openModal or use openModal.",
        );
      },
      ...props,
    });
  }
  return WithClose;
}
