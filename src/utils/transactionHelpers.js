import { calculatePoints } from './rewardCalculator';

export const MONTH_LABELS = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export function getMonthKey(dateString) {
  const d = new Date(dateString);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

export function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-');
  const monthName = MONTH_LABELS[parseInt(month, 10) - 1] ?? monthKey;
  return `${monthName} ${year}`;
}

export function groupByCustomerAndMonth(transactions) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return [];
  }

  const customerMap = {};

  transactions.forEach((txn) => {
    const customerId = txn.customerId;
    const customerName = txn.customerName?.trim() || 'Unknown Customer';
    const monthKey = getMonthKey(txn.date);
    const points = calculatePoints(txn.amount);

    if (!customerMap[customerId]) {
      customerMap[customerId] = {
        customerId,
        customerName,
        totalPoints: 0,
        months: {},
      };
    }

    if (!customerMap[customerId].months[monthKey]) {
      customerMap[customerId].months[monthKey] = {
        label: formatMonthLabel(monthKey),
        points: 0,
        transactions: [],
      };
    }

    customerMap[customerId].months[monthKey].transactions.push({
      id: txn.id,
      amount: txn.amount,
      points,
    });
    customerMap[customerId].months[monthKey].points += points;
    customerMap[customerId].totalPoints += points;
  });

  return Object.values(customerMap).sort((a, b) => a.customerName.localeCompare(b.customerName));
}
