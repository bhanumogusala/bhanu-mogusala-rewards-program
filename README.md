# Rewards Program UI

This is a simple React app that calculates customer reward points from transaction history over a three-month period.

## What it does

- Simulates an asynchronous API call to fetch transactions
- Calculates points per transaction using the retailer rules:
  - 2 points for every dollar spent over $100
  - 1 point for every dollar spent between $50 and $100
- Aggregates rewards per customer, per month, and totals
- Shows loading and error states

## Assumptions

- I assumed fractional dollar amounts should be truncated to whole dollars before calculating points.
  - Example: `121.75` is treated as `121`
  - Example: `1.30` is treated as `1`

## How to run

```bash
npm install
npm run dev
```

## Notes

- No Redux is used.
- Data is mocked inside `src/data/transactions.js`.
- A custom hook handles loading, error, and fetched data state.

## Next enhancements

For better scalability, I would consider:
- pagination for large transaction lists
- virtualization for rendering long tables efficiently

This gives a clean, maintainable starting point while keeping the core reward calculation logic separate and easy to test.
