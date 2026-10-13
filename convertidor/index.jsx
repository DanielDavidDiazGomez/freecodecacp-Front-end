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
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  // Solo se recalcula si cambian la cantidad o la moneda de origen.
  const convertedAmounts = useMemo(() => {
    const inUsd = (Number(amount) || 0) / RATES[from];
    return Object.fromEntries(
      CURRENCIES.map((code) => [code, inUsd * RATES[code]])
    );
  }, [amount, from]);

  const result = `${convertedAmounts[to].toFixed(2)} ${to}`;

  return (
    <div className="converter">
      <h1>Convertidor de divisas</h1>

      <input
        type="number"
        min="0"
        step="any"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        aria-label="Cantidad"
      />

      <div className="selects">
        <select value={from} onChange={(e) => setFrom(e.target.value)} aria-label="De">
          {CURRENCIES.map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>

        <span className="arrow">→</span>

        <select value={to} onChange={(e) => setTo(e.target.value)} aria-label="A">
          {CURRENCIES.map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>

      <p className="result">{result}</p>
    </div>
  );
};

export default CurrencyConverter;
