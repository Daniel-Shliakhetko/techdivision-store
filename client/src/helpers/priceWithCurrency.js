export const priceWithCurrency = (price) => {
  return `${price.price} ${getCurrencySymbol(price.currency)}`;
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
