export const formatCurrency = (symbol: string, money: number, noDecimalPlace = false): string => {
  const moneyString = money.toLocaleString('en', {
    minimumFractionDigits: noDecimalPlace ? 0 : 2,
    maximumFractionDigits: noDecimalPlace ? 0 : 2,
  });
  return `${symbol}${moneyString}`;
};

export const getPrefixedCurrencyFormatter = (symbol: string)
  : (money: number, noDecimalPlace?: boolean) => string => formatCurrency.bind(null, symbol);
