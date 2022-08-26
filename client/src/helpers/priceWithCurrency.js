export const priceWithCurrency = (price, currency) => {
  return `${price} ${getCurrencySymbol(currency)}`;
};

const getCurrencySymbol = (currency) => {
  switch (currency) {
    case "usd":
      return "$";
    case "eur":
      return "€";    
    case "rub":
      return "₽";
    case "uah":
      return "₴";
    default:
      return "$";
  }
};
