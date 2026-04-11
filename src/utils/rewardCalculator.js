
export function calculatePoints(amount) {
  if (typeof amount !== 'number' || !isFinite(amount) || amount < 0) {
    return 0;
  }

  let rawPoints = 0;

  if (amount <= 50) {
    rawPoints = 0;
  } else if (amount <= 100) {
    rawPoints = (amount - 50) * 1;
  } else {
    rawPoints = 50 + (amount - 100) * 2;
  }

  return Math.round(rawPoints);
}

export function isValidTransaction(transaction) {
  if (!transaction || typeof transaction !== 'object') return false;

  const { id, amount, date } = transaction;

  if (!id || typeof id !== 'string') return false;

  if (typeof amount !== 'number' || !isFinite(amount) || amount < 0) return false;

  if (!date || typeof date !== 'string') return false;
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return false;

  return true;
}
