import React, { useState } from "react";
import { describe, test, expect } from "vitest";
import { render, fireEvent, waitFor, screen, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ModalsProvider from "../src/core/ModalsProvider";
import useOpenModal from "../src/core/useOpenModal";

describe("useOpenModal", () => {
  test("throw error when call out of context", async () => {
    expect(() => renderHook(() => useOpenModal())).toThrowError();
  });

  test("open modal", async () => {
    const TestComponent = () => {
      const openModal = useOpenModal();

      const flow = async () => {
        await openModal(() => <div data-testid="modal-content" />);
      };

      return (
        <button data-testid="open-modal" onClick={flow}>
          Open Modal
        </button>
      );
    };

    render(
      <ModalsProvider>
        <TestComponent />
      </ModalsProvider>,
    );

    // Check that modal is not in the document initially
    expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();

    // Open the modal
    fireEvent.click(screen.getByTestId("open-modal"));

    // Check that modal is in the document
    expect(screen.getByTestId("modal-content")).toBeInTheDocument();
  });

  test("close modal with resolve", async () => {
    const TestComponent = () => {
      const openModal = useOpenModal();

      const flow = async () => {
        await openModal<void>((resolve) => (
          <div data-testid="modal-content">
            <div data-testid="modal-resolve" onClick={() => resolve()}>
              Close
            </div>
          </div>
        ));
      };

      return (
        <button data-testid="open-modal" onClick={flow}>
          Open Modal
        </button>
      );
    };

    render(
      <ModalsProvider>
        <TestComponent />
      </ModalsProvider>,
    );

    // Open the modal
    fireEvent.click(screen.getByTestId("open-modal"));

    // Close the modal
    fireEvent.click(screen.getByTestId("modal-resolve"));

    // Wait for the modal to be removed from the document
    await waitFor(() => {
      expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
    });
  });

  test("resolve carry value out of promise", async () => {
    const TestComponent = () => {
      const openModal = useOpenModal();

      const flow = async () => {
        const res = await openModal<"yay">((resolve) => (
          <div data-testid="modal-content">
            <div data-testid="modal-resolve" onClick={() => resolve("yay")}>
              Close
            </div>
          </div>
        ));
        expect(res).toBe("yay");
      };

      return (
        <button data-testid="open-modal" onClick={flow}>
          Open Modal
        </button>
      );
    };

    render(
      <ModalsProvider>
        <TestComponent />
      </ModalsProvider>,
    );

    // Open the modal
    fireEvent.click(screen.getByTestId("open-modal"));

    // Close the modal
    fireEvent.click(screen.getByTestId("modal-resolve"));
  });

  test("close modal with reject in trycatch", async () => {
    const TestComponent = () => {
      const openModal = useOpenModal();

      const flow = async () => {
        try {
          await openModal((_, reject) => (
            <div data-testid="modal-content">
              <div data-testid="modal-reject" onClick={() => reject()}>
                Reject
              </div>
            </div>
          ));
        } catch (error) {
          return;
        }
      };

      return (
        <button data-testid="open-modal" onClick={flow}>
          Open Modal
        </button>
      );
    };

    render(
      <ModalsProvider>
        <TestComponent />
      </ModalsProvider>,
    );

    // Open the modal
    fireEvent.click(screen.getByTestId("open-modal"));

    // Close the modal with reject
    fireEvent.click(screen.getByTestId("modal-reject"));

    // Wait for the modal to be removed from the document
    await waitFor(() => {
      expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
    });
  });

  test("reject carry value into the catch", async () => {
    const TestComponent = () => {
      const openModal = useOpenModal();

      const flow = async () => {
        try {
          await openModal<void, "nay">((_, reject) => (
            <div data-testid="modal-reject" onClick={() => reject("nay")}>
              Reject
            </div>
          ));
        } catch (error) {
          expect(error).toBe("nay");
        }
      };

      return (
        <button data-testid="open-modal" onClick={flow}>
          Open Modal
        </button>
      );
    };

    render(
      <ModalsProvider>
        <TestComponent />
      </ModalsProvider>,
    );

    // Open the modal
    fireEvent.click(screen.getByTestId("open-modal"));

    // Close the modal with reject
    fireEvent.click(screen.getByTestId("modal-reject"));
  });

  test("resolve programaticly after timeout", async () => {
    const TestComponent = () => {
      const openModal = useOpenModal();

      const flow = async () => {
        try {
          const promise = openModal<"foo">(() => <div data-testid="modal-reject">Hello</div>);
          setTimeout(() => promise.resolve("foo"), 10);
          const res = await promise;
          expect(res).toBe("foo");
        } catch (error) {
          throw new Error("Should not be here!");
        }
      };

      return (
        <button data-testid="open-modal" onClick={flow}>
          Open Modal
        </button>
      );
    };

    render(
      <ModalsProvider>
        <TestComponent />
      </ModalsProvider>,
    );

    // Open the modal
    fireEvent.click(screen.getByTestId("open-modal"));
  });

  test("reject programaticly after timeout", async () => {
    const TestComponent = () => {
      const openModal = useOpenModal();

      const flow = async () => {
        try {
          const promise = openModal<void, { message: "bar" }>(() => (
            <div data-testid="modal-reject">Hello</div>
          ));
          setTimeout(() => promise.reject({ message: "bar" }), 10);
          await promise;
        } catch (error) {
          expect(error.message).toBe("bar");
        }
      };

      return (
        <button data-testid="open-modal" onClick={flow}>
          Open Modal
        </button>
      );
    };

    render(
      <ModalsProvider>
        <TestComponent />
      </ModalsProvider>,
    );

    // Open the modal
    fireEvent.click(screen.getByTestId("open-modal"));
  });

  test("onceClosed should be called after resolve", async () => {
    const TestComponent = () => {
      const openModal = useOpenModal();
      const [count, setCount] = useState(0);

      const onceClosedCallback = () => {
        setCount(1);
      };

      const flow = async () => {
        await openModal<void>(
          (resolve) => (
            <div data-testid="modal-content">
              <div data-testid="modal-resolve" onClick={() => resolve()}>
                Close
              </div>
            </div>
          ),
          { onceClosed: onceClosedCallback },
        );
      };

      return (
        <>
          <button data-testid="open-modal" onClick={flow}>
            Open Modal
          </button>
          <div data-testid="once-closed-result">{count}</div>
        </>
      );
    };

    render(
      <ModalsProvider>
        <TestComponent />
      </ModalsProvider>,
    );

    expect(screen.getByTestId("once-closed-result")).toHaveTextContent("0");

    // Open the modal
    fireEvent.click(screen.getByTestId("open-modal"));

    // Close the modal
    fireEvent.click(screen.getByTestId("modal-resolve"));

    // Wait for the onceClosed callback to be called
    await waitFor(() => {
      expect(screen.getByTestId("once-closed-result")).toHaveTextContent("1");
    });
  });

  test("onceClosed should be called after reject", async () => {
    const TestComponent = () => {
      const openModal = useOpenModal();
      const [count, setCount] = useState(0);

      const onceClosedCallback = () => {
        setCount(1);
      };

      const flow = async () => {
        try {
          await openModal<void>(
            (_, reject) => (
              <div data-testid="modal-content">
                <div data-testid="modal-resolve" onClick={() => reject()}>
                  Close
                </div>
              </div>
            ),
            { onceClosed: onceClosedCallback },
          );
        } catch (err) {
          return;
        }
      };

      return (
        <>
          <button data-testid="open-modal" onClick={flow}>
            Open Modal
          </button>
          <div data-testid="once-closed-result">{count}</div>
        </>
      );
    };

    render(
      <ModalsProvider>
        <TestComponent />
      </ModalsProvider>,
    );

    expect(screen.getByTestId("once-closed-result")).toHaveTextContent("0");

    // Open the modal
    fireEvent.click(screen.getByTestId("open-modal"));

    // Close the modal
    fireEvent.click(screen.getByTestId("modal-resolve"));

    // Wait for the onceClosed callback to be called
    await waitFor(() => {
      expect(screen.getByTestId("once-closed-result")).toHaveTextContent("1");
    });
  });
});
