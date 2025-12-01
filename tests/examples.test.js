import { describe, it, expect, test } from "vitest";
import { longestString, isPrime, shippingCost } from "../src/examples";

describe("examples.longestString", () => {
    it("should returns the longest string", () => {
        const longest = longestString("pikachu", "snorlax");
        expect(longest).toBe("pikachu");
    });

    it("should returns the first string when both are equal length", () => {
        const longest = longestString("ditto", "pidgy");
        expect(longest).toBe("ditto");
    });

    it("should handle empty strings", () => {
        expect(longestString("", "mario")).toBe("mario");
        expect(longestString("luigi", "")).toBe("luigi");
        expect(longestString("", "")).toBe("");
    });

    it("should ignores leading/trailing whitespaces", () => {
        expect(longestString("  ash  ", "misty")).toBe("misty");
    });
});

describe("examples.isPrime", () => {
    it("should return true/truthy for small prime numbers", () => {
        expect(isPrime(2)).toBeTruthy();
        expect(isPrime(3)).toBeTruthy();
        expect(isPrime(5)).toBeTruthy();
    });

    it("should returns false/falsy for non-primes", () => {
        expect(isPrime(1)).toBeFalsy();
        expect(isPrime(0)).toBeFalsy();
        expect(isPrime(4)).toBeFalsy();
    });

    it("should matches results in an array using toEqual", () => {
        const numbers = [2, 3, 4, 5];
        const results = numbers.map(isPrime);
        expect(results).toEqual([true, true, false, true]);
    });

    it("should detects primes within a fielted list", () => {
        const nums = Array.from({ length: 7 }).map((_, index) => index + 1);
        const primes = nums.filter(isPrime);
        expect(primes).toContain(7);
        expect(primes).not.toContain(4);
    });

    it("should throws an error when passed a non-number", () => {
        expect(() => isPrime("pikachu")).toThrow();
        expect(() => isPrime("pikachu")).toThrow("Input must be a number");
    });

    it("should has correct type for result", () => {
        expect(isPrime(7)).toBeTypeOf("boolean");
        expect(typeof isPrime(4)).toBe("boolean");
    });
});

describe("examples.isPrime (Better)", () => {
    it("should treats 0 and 1 as non-prime, and 2 as prime", () => {
        expect(isPrime(0)).toBeFalsy();
        expect(isPrime(1)).toBeFalsy();
        expect(isPrime(2)).toBeTruthy();
    });

    it("should returns false for all even numbers > 2", () => {
        expect(isPrime(4)).toBeFalsy();
        expect(isPrime(10)).toBeFalsy();
        expect(isPrime(100)).toBeFalsy();
    });

    it("should identifies common primes", () => {
        expect(isPrime(3)).toBeTruthy();
        expect(isPrime(5)).toBeTruthy();
    });

    it("should returns false for perfect squares reliably", () => {
        expect(isPrime(49)).toBeFalsy();
        expect(isPrime(121)).toBeFalsy();
    });

    it("should returns false for non-integers", () => {
        expect(isPrime(2.5)).toBeFalsy();
    });

    it("should throws an error for non-number inputs", () => {
        expect(() => isPrime("mario")).toThrow("Input must be a number");
    });
});

describe("examples.shippingCost", () => {
    it.each([
        { weight: 0.5, expected: 3.99 },
        { weight: 3, expected: 5.99 },
        { weight: 10, expected: 8.99 },
        { weight: 50, expected: 14.99 },
    ])("should charges $expected for weight $weight", ({ weight, expected }) => {
        expect(shippingCost(weight)).toBe(expected);
    });

    // boundaries test
    it.each([
        { weight: 1, expected: 3.99 },
        { weight: 5, expected: 5.99 },
        { weight: 20, expected: 8.99 },
        { weight: 21, expected: 14.99 },
    ])("should charges correct tiers at boundaries: $weight => $expected", ({ weight, expected }) => {
        expect(shippingCost(weight)).toBe(expected);
    });

    it.each([1, 21])("should applies FREESHIPPING coupon exactly: weight = $weight", (weight) => {
        expect(shippingCost(weight, "FREESHIPPING")).toBe(0);
    });

    it.each(["freeshipping", "NOTHING", ""])("should ignores no-matching coupons: $coupon", (coupon) => {
        expect(shippingCost(1, coupon)).toBe(3.99);
    });

    it("should throws an error for invalid weight $weight", (weight) => {
        expect(() => shippingCost(0)).toThrow(/(?=.*weight)(?=.*0)/i);
        expect(() => shippingCost(-5)).toThrow(/(?=.*weight)(?=.*0)/i);
        expect(() => shippingCost("2")).toThrow(/(?=.*weight)(?=.*number)/i);
    });

    it("should throws an error when coupon is not a string", () => {
        expect(() => shippingCost(1, 123)).toThrow(/coupon/i);
        expect(() => shippingCost(1, null)).toThrow(/coupon/i);
    });
});
