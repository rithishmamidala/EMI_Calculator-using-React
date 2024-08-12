import React, { useState } from 'react';
import './App.css';

function App() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEMI = (p, r, n) => {
    const interestRate = r / (12 * 100);
    const emi = (p * interestRate * Math.pow(1 + interestRate, n)) / (Math.pow(1 + interestRate, n) - 1);
    return emi.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const n = parseInt(years) * 12;
    if (p && r && years) {
      const emiAmount = calculateEMI(p, r, n);
      setEmi(emiAmount);
    } else {
      setEmi(null);
    }
  };

  return (
    <div className="App">
      <h1>EMI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Principal Amount (₹):</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Annual Interest Rate (%):</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Loan Tenure (Years):</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate EMI</button>
      </form>
      {emi !== null && (
        <div className="result">
          <h2>Monthly EMI: ₹{emi}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
