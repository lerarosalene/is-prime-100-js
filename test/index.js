const { describe, it } = require("node:test");
const assert = require("node:assert");

const slowIsPrime = require("../lib/slowIsPrime");
const isPrime = require("../src/index");

const EXPECTED_RANGE = 500_000;

describe("slowIsPrime (generator)", () => {
  it("works on well-known numbers (sanity check)", () => {
    assert.equal(slowIsPrime(1), false);
    assert.equal(slowIsPrime(2), true);
    assert.equal(slowIsPrime(3), true);
    assert.equal(slowIsPrime(4), false);
    assert.equal(slowIsPrime(5), true);
    assert.equal(slowIsPrime(6), false);
    assert.equal(slowIsPrime(13), true);
    assert.equal(slowIsPrime(20), false);
    assert.equal(slowIsPrime(121), false);
  });
});

describe("isPrime (main module)", () => {
  it("validates inputs", () => {
    assert.throws(() => isPrime(0), {
      name: /^RangeError$/,
    });
    assert.throws(() => isPrime(0.5), {
      name: /^TypeError$/,
    });
    assert.throws(() => isPrime(Number.NaN), {
      name: /^TypeError$/,
    });
    assert.throws(() => isPrime("0"), {
      name: /^TypeError$/,
    });
    assert.throws(() => isPrime(EXPECTED_RANGE + 1), {
      name: /^RangeError$/,
    });
  });
  it(`works on all numbers from 1 to ${EXPECTED_RANGE}`, () => {
    for (let i = 1; i <= EXPECTED_RANGE; ++i) {
      const actual = slowIsPrime(i);
      assert.equal(isPrime(i), actual, `${i}`);
      assert.equal(isPrime(BigInt(i)), actual, `${i}`);
    }
  });
});
