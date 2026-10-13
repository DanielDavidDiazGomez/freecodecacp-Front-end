import React, { useState, useMemo } from "react";

const RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7,
};

const CURRENCIES = Object.keys(RATES);

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  // Depende solo de amount y fromCurrency: cambiar toCurrency no recalcula.
  const convertedAmounts = useMemo(() => {
    const inBase = Number(amount) / RATES[fromCurrency];
    const result = {};
    CURRENCIES.forEach((code) => {
      result[code] = inBase * RATES[code];
    });
    return result;
  }, [amount, fromCurrency]);

  const result = `${convertedAmounts[toCurrency].toFixed(2)} ${toCurrency}`;

  return (
    <div className="converter">
      <h1 className="title">💱 Cambio Rápido</h1>

      <label className="field">
        <span>Cantidad</span>
        <input
          type="number"
          value={amount}
          min="0"
          step="any"
          onChange={(e) => setAmount(e.target.value === "" ? 0 : e.target.value)}
        />
      </label>

      <div className="row">
        <label className="field">
          <span>De</span>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>A</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="result" data-testid="converted-amount">
        {result}
      </p>
    </div>
  );
};
