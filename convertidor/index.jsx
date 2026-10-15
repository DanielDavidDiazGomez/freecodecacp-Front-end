
const { useState, useMemo } = React;

const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState(10);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  // Calcula todas las conversiones solamente cuando cambia
  // la cantidad o la moneda de origen.
  const convertedAmounts = useMemo(() => {
    const value = Number(amount) || 0;
    const amounts = {};

    for (const currency in exchangeRates) {
      amounts[currency] =
        (value / exchangeRates[fromCurrency]) *
        exchangeRates[currency];
    }

    return amounts;
  }, [amount, fromCurrency]);

  return (
    <div>
      <h1>Currency Converter</h1>

      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />

      <label htmlFor="fromCurrency">From</label>
      <select
        id="fromCurrency"
        value={fromCurrency}
        onChange={(event) => setFromCurrency(event.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      <label htmlFor="toCurrency">To</label>
      <select
        id="toCurrency"
        value={toCurrency}
        onChange={(event) => setToCurrency(event.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      <p>
        Converted Amount: {convertedAmounts[toCurrency].toFixed(2)}{" "}
        {toCurrency}
      </p>
    </div>
  );
}
