import { calculatePoints, isValidTransaction } from './rewardCalculator';


describe('calculatePoints', () => {
  describe('amounts $50 and below → 0 points', () => {
    test('returns 0 for $0', () => expect(calculatePoints(0)).toBe(0));
    test('returns 0 for $25', () => expect(calculatePoints(25)).toBe(0));
    test('returns 0 for exactly $50 (boundary)', () => expect(calculatePoints(50)).toBe(0));
    test('returns 0 for $49.99', () => expect(calculatePoints(49.99)).toBe(0));
  });

  describe('amounts $50.01 – $100 → 1 pt per dollar above $50', () => {
    test('returns 1 for $51', () => expect(calculatePoints(51)).toBe(1));
    test('returns 25 for $75', () => expect(calculatePoints(75)).toBe(25));
    test('returns 49 for $99', () => expect(calculatePoints(99)).toBe(49));
    test('returns 49 for $99.99 (floors to $99)', () => expect(calculatePoints(99.99)).toBe(49));
    test('returns 50 for exactly $100 (boundary)', () => expect(calculatePoints(100)).toBe(50));
  });

  describe('amounts above $100 → 50 pts + 2 pts per dollar above $100', () => {
    test('returns 90 for $120 (spec example)', () => expect(calculatePoints(120)).toBe(90));
    test('returns 92 for $121', () => expect(calculatePoints(121)).toBe(92));
    test('returns 90 for $120.75 (decimal floors to $120)', () =>
      expect(calculatePoints(120.75)).toBe(90));
    test('returns 150 for $150', () => expect(calculatePoints(150)).toBe(150));
    test('returns 850 for $500 (very large)', () => expect(calculatePoints(500)).toBe(850));
    test('returns 1850 for $1000', () => expect(calculatePoints(1000)).toBe(1850));
  });

  describe('invalid or edge inputs → 0 points', () => {
    test('returns 0 for a negative amount', () => expect(calculatePoints(-10)).toBe(0));
    test('returns 0 for NaN', () => expect(calculatePoints(NaN)).toBe(0));
    test('returns 0 for Infinity', () => expect(calculatePoints(Infinity)).toBe(0));
    test('returns 0 for -Infinity', () => expect(calculatePoints(-Infinity)).toBe(0));
    test('returns 0 for a string', () => expect(calculatePoints('120')).toBe(0));
    test('returns 0 for null', () => expect(calculatePoints(null)).toBe(0));
    test('returns 0 for undefined', () => expect(calculatePoints(undefined)).toBe(0));
    test('returns 0 for an object', () => expect(calculatePoints({})).toBe(0));
  });
});

describe('isValidTransaction', () => {
  const valid = {
    id: 'txn-1',
    customerId: 'c1',
    customerName: 'Alice',
    amount: 100,
    date: '2024-01-15',
  };

  test('returns true for a fully valid record', () => expect(isValidTransaction(valid)).toBe(true));

  test('returns false when id is missing', () =>
    expect(isValidTransaction({ ...valid, id: undefined })).toBe(false));
  test('returns false when id is an empty string', () =>
    expect(isValidTransaction({ ...valid, id: '' })).toBe(false));
  test('returns false when id is a number', () =>
    expect(isValidTransaction({ ...valid, id: 123 })).toBe(false));

  test('returns false for a negative amount', () =>
    expect(isValidTransaction({ ...valid, amount: -1 })).toBe(false));
  test('returns false for a non-numeric amount', () =>
    expect(isValidTransaction({ ...valid, amount: 'abc' })).toBe(false));
  test('returns false for NaN amount', () =>
    expect(isValidTransaction({ ...valid, amount: NaN })).toBe(false));
  test('returns false for Infinity amount', () =>
    expect(isValidTransaction({ ...valid, amount: Infinity })).toBe(false));
  test('returns true for amount = 0', () =>
    expect(isValidTransaction({ ...valid, amount: 0 })).toBe(true));

  test('returns false for an invalid date string', () =>
    expect(isValidTransaction({ ...valid, date: 'not-a-date' })).toBe(false));
  test('returns false when date is missing', () =>
    expect(isValidTransaction({ ...valid, date: undefined })).toBe(false));
  test('returns false when date is a number', () =>
    expect(isValidTransaction({ ...valid, date: 20240115 })).toBe(false));

  test('returns false for null input', () => expect(isValidTransaction(null)).toBe(false));
  test('returns false for a non-object', () => expect(isValidTransaction('string')).toBe(false));
  test('returns false for an empty object', () => expect(isValidTransaction({})).toBe(false));
});
