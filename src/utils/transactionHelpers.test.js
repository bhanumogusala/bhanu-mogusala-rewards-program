import { getMonthKey, formatMonthLabel, groupByCustomerAndMonth } from './transactionHelpers';

describe('getMonthKey', () => {
  test('returns YYYY-MM for a standard ISO date', () =>
    expect(getMonthKey('2024-01-15')).toBe('2024-01'));

  test('returns correct key for the last day of January', () =>
    expect(getMonthKey('2024-01-31')).toBe('2024-01'));

  test('returns correct key for December', () => expect(getMonthKey('2024-12-01')).toBe('2024-12'));

  test('pads single-digit months with a leading zero', () =>
    expect(getMonthKey('2024-03-05')).toBe('2024-03'));
});

describe('formatMonthLabel', () => {
  test('formats January correctly', () => expect(formatMonthLabel('2024-01')).toBe('January 2024'));

  test('formats December correctly', () =>
    expect(formatMonthLabel('2024-12')).toBe('December 2024'));

  test('formats a mid-year month correctly', () =>
    expect(formatMonthLabel('2024-06')).toBe('June 2024'));
});

describe('groupByCustomerAndMonth', () => {
  test('returns empty array for empty input', () =>
    expect(groupByCustomerAndMonth([])).toEqual([]));

  test('returns empty array for null input', () =>
    expect(groupByCustomerAndMonth(null)).toEqual([]));

  test('returns empty array for undefined input', () =>
    expect(groupByCustomerAndMonth(undefined)).toEqual([]));

  describe('single transaction', () => {
    const txns = [
      { id: 'txn-1', customerId: 'c1', customerName: 'Alice', amount: 120, date: '2024-01-15' },
    ];

    test('produces one customer entry', () => {
      const result = groupByCustomerAndMonth(txns);
      expect(result).toHaveLength(1);
    });

    test('calculates correct totalPoints (90 for $120)', () => {
      const [alice] = groupByCustomerAndMonth(txns);
      expect(alice.totalPoints).toBe(90);
    });

    test('creates the correct month bucket', () => {
      const [alice] = groupByCustomerAndMonth(txns);
      expect(alice.months['2024-01']).toBeDefined();
      expect(alice.months['2024-01'].points).toBe(90);
    });
  });

  describe('multiple customers', () => {
    const txns = [
      { id: 't1', customerId: 'c1', customerName: 'Bob', amount: 150, date: '2024-01-10' },
      { id: 't2', customerId: 'c2', customerName: 'Alice', amount: 75, date: '2024-01-20' },
    ];

    test('returns results sorted alphabetically by customer name', () => {
      const result = groupByCustomerAndMonth(txns);
      expect(result[0].customerName).toBe('Alice');
      expect(result[1].customerName).toBe('Bob');
    });

    test('does not mix points between customers', () => {
      const result = groupByCustomerAndMonth(txns);
      const alice = result.find((c) => c.customerName === 'Alice');
      const bob = result.find((c) => c.customerName === 'Bob');
      expect(alice.totalPoints).toBe(25);
      expect(bob.totalPoints).toBe(150);
    });
  });

  test('falls back to "Unknown Customer" for empty customerName', () => {
    const txns = [{ id: 't1', customerId: 'c9', customerName: '', amount: 80, date: '2024-02-10' }];
    const [customer] = groupByCustomerAndMonth(txns);
    expect(customer.customerName).toBe('Unknown Customer');
  });

  test('accumulates 0 pts for $50 exactly', () => {
    const txns = [
      { id: 't1', customerId: 'c1', customerName: 'Alice', amount: 50, date: '2024-01-01' },
    ];
    expect(groupByCustomerAndMonth(txns)[0].totalPoints).toBe(0);
  });

  test('accumulates 50 pts for $100 exactly', () => {
    const txns = [
      { id: 't1', customerId: 'c1', customerName: 'Alice', amount: 100, date: '2024-01-01' },
    ];
    expect(groupByCustomerAndMonth(txns)[0].totalPoints).toBe(50);
  });

  test('handles a customer with transactions in only one month', () => {
    const txns = [
      { id: 't1', customerId: 'c1', customerName: 'Dave', amount: 120, date: '2024-01-05' },
      { id: 't2', customerId: 'c1', customerName: 'Dave', amount: 80, date: '2024-01-20' },
    ];
    const [dave] = groupByCustomerAndMonth(txns);
    expect(Object.keys(dave.months)).toHaveLength(1);
    expect(dave.months['2024-01']).toBeDefined();
    expect(dave.totalPoints).toBe(120);
  });

  test('accumulates monthly subtotals correctly across multiple months', () => {
    const txns = [
      { id: 't1', customerId: 'c1', customerName: 'Eve', amount: 120, date: '2024-01-10' }, // 90 pts
      { id: 't2', customerId: 'c1', customerName: 'Eve', amount: 200, date: '2024-02-15' }, // 250 pts
    ];
    const [eve] = groupByCustomerAndMonth(txns);
    expect(eve.months['2024-01'].points).toBe(90);
    expect(eve.months['2024-02'].points).toBe(250);
    expect(eve.totalPoints).toBe(340);
  });
});
