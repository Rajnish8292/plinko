"use client";
import { useState } from "react";
import styles from "./NoOfBet.module.css";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function NoOfBet() {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue((prev) => prev + 1);
  };

  const decrement = () => {
    setValue((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_wrapper}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        {value == 0 && <div className={styles.infinite}>Infinite</div>}
      </div>

      <div className={styles.arrows}>
        <button onClick={increment}>
          <ChevronUp size={14} />
        </button>

        <button onClick={decrement}>
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
