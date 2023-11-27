import { describe, test, expect } from "vitest";
import { deferredPromise } from "../../src/utils/deferred-promise";

describe("defferedPromise", () => {
  test('should resolve with a value', async () => {
    const { promise, resolve } = deferredPromise<number, string>();
    const expectedValue = 42;

    const resultPromise = promise.then((value) => {
      expect(value).toBe(expectedValue);
    });

    resolve(expectedValue);

    await resultPromise;
  });

  test('should reject with a reason', async () => {
    const { promise, reject } = deferredPromise<number, string>();
    const expectedReason = 'Something went wrong';

    const resultPromise = promise.catch((reason) => {
      expect(reason).toBe(expectedReason);
    });

    reject(expectedReason);

    await resultPromise;
  });
});
