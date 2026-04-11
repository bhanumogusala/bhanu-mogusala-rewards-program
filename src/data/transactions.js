const mockTransactions = [
  // ── Alice Johnson (c1) ────────────────────────────────────────────────────
  // January
  {
    id: 'txn-001',
    customerId: 'c1',
    customerName: 'Alice Johnson',
    amount: 120,
    date: '2024-01-15',
  },
  {
    id: 'txn-002',
    customerId: 'c1',
    customerName: 'Alice Johnson',
    amount: 75,
    date: '2024-01-28',
  },
  // February — amount exactly $50: earns 0 points (boundary is exclusive)
  {
    id: 'txn-003',
    customerId: 'c1',
    customerName: 'Alice Johnson',
    amount: 50,
    date: '2024-02-05',
  },
  {
    id: 'txn-004',
    customerId: 'c1',
    customerName: 'Alice Johnson',
    amount: 200,
    date: '2024-02-20',
  },
  // March — amount $30: below $50 threshold → 0 points
  {
    id: 'txn-005',
    customerId: 'c1',
    customerName: 'Alice Johnson',
    amount: 30,
    date: '2024-03-10',
  },
  // March — amount exactly $100: earns 50 points (1 pt × each dollar above $50)
  {
    id: 'txn-006',
    customerId: 'c1',
    customerName: 'Alice Johnson',
    amount: 100,
    date: '2024-03-22',
  },

  // ── Bob Smith (c2) ────────────────────────────────────────────────────────
  // January
  {
    id: 'txn-007',
    customerId: 'c2',
    customerName: 'Bob Smith',
    amount: 110,
    date: '2024-01-05',
  },
  {
    id: 'txn-008',
    customerId: 'c2',
    customerName: 'Bob Smith',
    amount: 85,
    date: '2024-01-19',
  },
  // February — decimal amount: $120.75 floors to $120 before calculation → 90 pts
  {
    id: 'txn-009',
    customerId: 'c2',
    customerName: 'Bob Smith',
    amount: 120.75,
    date: '2024-02-14',
  },
  // February — amount $45: below $50 → 0 points
  {
    id: 'txn-010',
    customerId: 'c2',
    customerName: 'Bob Smith',
    amount: 45,
    date: '2024-02-27',
  },
  // March — very large amount: $500 → 50 + (400×2) = 850 pts
  {
    id: 'txn-011',
    customerId: 'c2',
    customerName: 'Bob Smith',
    amount: 500,
    date: '2024-03-08',
  },
  {
    id: 'txn-012',
    customerId: 'c2',
    customerName: 'Bob Smith',
    amount: 95,
    date: '2024-03-30',
  },

  // ── Carol White (c3) ──────────────────────────────────────────────────────
  {
    id: 'txn-013',
    customerId: 'c3',
    customerName: 'Carol White',
    amount: 60,
    date: '2024-01-11',
  },
  {
    id: 'txn-014',
    customerId: 'c3',
    customerName: 'Carol White',
    amount: 130,
    date: '2024-01-25',
  },
  {
    id: 'txn-015',
    customerId: 'c3',
    customerName: 'Carol White',
    amount: 90,
    date: '2024-02-09',
  },
  {
    id: 'txn-016',
    customerId: 'c3',
    customerName: 'Carol White',
    amount: 150,
    date: '2024-02-18',
  },
  {
    id: 'txn-017',
    customerId: 'c3',
    customerName: 'Carol White',
    amount: 70,
    date: '2024-03-14',
  },
  {
    id: 'txn-018',
    customerId: 'c3',
    customerName: 'Carol White',
    amount: 110,
    date: '2024-03-29',
  },

  // ── David Brown (c4) ──────────────────────────────────────────────────────
  // Edge case: customer with transactions in ONE month only (January)
  {
    id: 'txn-019',
    customerId: 'c4',
    customerName: 'David Brown',
    amount: 200,
    date: '2024-01-07',
  },
  {
    id: 'txn-020',
    customerId: 'c4',
    customerName: 'David Brown',
    amount: 55,
    date: '2024-01-21',
  },

  // ── Eve Davis (c5) ────────────────────────────────────────────────────────
  // Edge case: customer with transactions in TWO months only (Jan + Mar)
  {
    id: 'txn-021',
    customerId: 'c5',
    customerName: 'Eve Davis',
    amount: 175,
    date: '2024-01-03',
  },
  {
    id: 'txn-022',
    customerId: 'c5',
    customerName: 'Eve Davis',
    amount: 80,
    date: '2024-02-11',
  },
  {
    id: 'txn-023',
    customerId: 'c5',
    customerName: 'Eve Davis',
    amount: 300,
    date: '2024-03-19',
  },

  // ── Edge-case records (invalid / malformed) ───────────────────────────────

  // DUPLICATE ID: same id as txn-001 — service layer deduplicates, keeps first
  {
    id: 'txn-001',
    customerId: 'c1',
    customerName: 'Alice Johnson',
    amount: 120,
    date: '2024-01-15',
  },

  // NEGATIVE AMOUNT: financially nonsensical — filtered by isValidTransaction()
  {
    id: 'txn-EC1',
    customerId: 'c2',
    customerName: 'Bob Smith',
    amount: -50,
    date: '2024-01-10',
  },

  // NON-NUMERIC AMOUNT: data corruption — filtered by isValidTransaction()
  {
    id: 'txn-EC2',
    customerId: 'c3',
    customerName: 'Carol White',
    amount: 'abc',
    date: '2024-02-01',
  },

  // MISSING CUSTOMER NAME: falls back to "Unknown Customer" in grouping util
  {
    id: 'txn-EC3',
    customerId: 'c6',
    customerName: '',
    amount: 80,
    date: '2024-02-22',
  },

  // INVALID DATE: unparseable string — filtered by isValidTransaction()
  {
    id: 'txn-EC4',
    customerId: 'c4',
    customerName: 'David Brown',
    amount: 100,
    date: 'not-a-date',
  },
];

export default mockTransactions;
