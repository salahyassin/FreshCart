export function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(amount)
  }
  
  // Output: $26,230.00 (or equivalent based on locale and currency)