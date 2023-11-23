import { describe, expect, it } from "vitest";
import { uuidv4 } from ".";

describe("uuidv4", () => {
  it("should generate 1000 different ids", () => {
    const ids = Array(1000).fill("").map(() => uuidv4());
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
