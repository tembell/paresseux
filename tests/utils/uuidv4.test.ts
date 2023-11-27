import { describe, expect, test } from "vitest";
import { uuidv4 } from "../../src/utils/uuidv4";

describe("uuidv4", () => {
  test("should generate 1000 different ids", () => {
    const ids = Array(1000).fill("").map(() => uuidv4());
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
