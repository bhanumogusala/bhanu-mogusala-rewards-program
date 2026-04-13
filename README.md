# Rewards Program UI
 
A React app that calculates and displays customer reward points from transaction history over a three-month period.
 
## Features
 
- Simulates an asynchronous API call to fetch transaction data
- Calculates reward points per transaction using the retailer's scoring rules
- Validates transactions before processing (invalid records are skipped)
- Aggregates rewards per customer, per month, and as running totals
- Handles loading and error states gracefully
 
## Reward Calculation Rules
 
| Spend range (per transaction) | Points earned |
|-------------------------------|---------------|
| $0 – $50.00 | 0 points |
| $50.01 – $100.00 | 1 point per whole dollar spent above $50 |
| $100.01+ | 50 points + 2 points per whole dollar spent above $100 |
 
> Fractional dollar amounts are truncated (floor) before calculating points.
> e.g. `$121.75` → treated as `$121`, `$99.99` → treated as `$99`.
 
**Examples:**
 
| Transaction amount | Calculation | Points |
|--------------------|-------------|--------|
| $40.00 | below threshold | 0 |
| $50.00 | at threshold, no points | 0 |
| $75.00 | 1 × (75 − 50) | 25 |
| $99.99 | 1 × (99 − 50) | 49 |
| $100.00 | 1 × (100 − 50) | 50 |
| $120.00 | 50 + 2 × (120 − 100) | 90 |
| $121.75 | 50 + 2 × (121 − 100) | 92 |
 
## Transaction Validation
 
Transactions are validated before points are calculated. A record is considered valid if it has:
 
- `id` — a non-empty string
- `customerId` — present
- `customerName` — present
- `amount` — a finite number ≥ 0
- `date` — a parseable date string
 
Invalid records are silently skipped during aggregation.
 
## Tech Stack
 
- [React](https://react.dev/) (with hooks)
- [Vite](https://vitejs.dev/) — dev server and bundler
- [Vitest](https://vitest.dev/) — unit testing
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — linting and formatting
 
## Project Structure
 
```
src/
├── data/
│   └── transactions.js        # Mocked transaction data
├── hooks/
│   └── useTransactions.js     # Custom hook: loading, error, and data state
├── utils/
│   └── rewardCalculator.js    # calculatePoints + isValidTransaction (unit-tested)
└── App.jsx                    # Root component — aggregation and display
```
 
## Getting Started
 
```bash
npm install
npm run dev
```
 
## Running Tests
 
```bash
npm run test
```
 
Tests cover `calculatePoints` and `isValidTransaction`, including boundary values ($50, $100), decimal truncation, and invalid inputs (negative numbers, `NaN`, `Infinity`, wrong types, missing fields).
 
## Design Decisions
 
- **No Redux** — component-level state via a custom hook is sufficient for this scope.
- **Separation of concerns** — calculation and validation logic live in a pure utility module, making them straightforward to test independently of the UI.
- **Async simulation** — the mock API uses a `setTimeout`-wrapped Promise to mirror real-world data fetching patterns.
- **Input validation** — `isValidTransaction` guards against malformed data before it reaches the points calculation, preventing silent incorrect results.
 
## Potential Enhancements
 
- **Pagination** — for large transaction datasets, paginate the table rather than rendering all rows at once
- **Virtualization** — use a library like `react-virtual` for efficiently rendering long lists
- **Accessibility** — table headers with `scope` attributes and ARIA labels for loading/error states.
