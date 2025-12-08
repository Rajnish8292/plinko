"use client";

import { useRef, useState } from "react";
import styles from "./PriceInput.module.css";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function PriceInput() {
  const [value, setValue] = useState(0);
  const inputRef = useRef();

  const handleChange = (e) => {
    if (inputRef.current) inputRef.current.value = inputRef.current.value;
  };

  const increment = () => {
    if (inputRef.current && inputRef.current.value.trim() != "")
      inputRef.current.value = parseFloat(inputRef.current.value) + 1;
    inputRef.current.value = parseFloat(inputRef.current.value).toFixed(2);
  };
  const decrement = () => {
    if (inputRef.current && inputRef.current.value.trim() != "")
      inputRef.current.value = Math.max(
        0,
        parseFloat(inputRef.current.value) - 1
      );
    inputRef.current.value = parseFloat(inputRef.current.value).toFixed(2);
  };

  const half = () => {
    if (inputRef.current && inputRef.current.value.trim() != "")
      inputRef.current.value = Math.max(
        0,
        parseFloat(inputRef.current.value) / 2
      );
    inputRef.current.value = parseFloat(inputRef.current.value).toFixed(2);
  };
  const double = () => {
    if (inputRef.current && inputRef.current.value.trim() != "")
      inputRef.current.value = parseFloat(inputRef.current.value) * 2;
    inputRef.current.value = parseFloat(inputRef.current.value).toFixed(2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper} tabIndex={0}>
        <div className={styles.icon}>$</div>
        <div>
          <input
            ref={inputRef}
            type="number"
            placeholder="price"
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.buttons}>
          <button onClick={half}>½</button>
          <button onClick={double}>2x</button>
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
    </div>
  );
}
