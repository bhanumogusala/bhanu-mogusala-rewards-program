export function calculatePoints(amount) {
  const MIN_THRESHOLD = 50;
  const MAX_THRESHOLD = 100;

  if (typeof amount !== 'number' || !isFinite(amount) || amount < 0) {
    return 0;
  }

  const amountSpent = Math.floor(amount);
  let rawPoints = 0;

  if (amountSpent <= MIN_THRESHOLD) {
    rawPoints = 0;
  } else if (amountSpent <= MAX_THRESHOLD) {
    rawPoints = amountSpent - MIN_THRESHOLD;
  } else {
    rawPoints = MAX_THRESHOLD - MIN_THRESHOLD + (amountSpent - MAX_THRESHOLD) * 2;
  }

  return rawPoints;
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
