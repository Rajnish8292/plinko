"use client";

import { useState } from "react";
import styles from "./PriceInput.module.css";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function PriceInput() {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value) || 0;
    setValue(newValue);
  };

  const increment = () => setValue((prev) => +(prev + 0.5).toFixed(2));
  const decrement = () =>
    setValue((prev) => (prev > 0 ? +(prev - 0.5).toFixed(2) : 0));

  const half = () => setValue((prev) => +(prev / 2).toFixed(2));
  const double = () => setValue((prev) => +(prev * 2).toFixed(2));

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper} tabIndex={0}>
        <div className={styles.icon}>$</div>

        <input
          type="number"
          value={value.toFixed(2)}
          onChange={handleChange}
          className={styles.input}
        />

        <div className={styles.arrows}>
          <button onClick={increment}>
            <ChevronUp size={14} />
          </button>
          <button onClick={decrement}>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className={styles.buttons}>
        <button onClick={half}>½</button>
        <button onClick={double}>2x</button>
      </div>
    </div>
  );
}
