"use client";
import styles from "./RowsSelector.module.css";
import { useContext, useState } from "react";
import { gameContext } from "@/store/gameContext";

export default function RowsSelector({
  min = 8,
  max = 16,
  defaultOption = 16,
}) {
  const [currentValue, setCurrentValue] = useState(defaultOption);
  const { rows, setRows } = useContext(gameContext);
  return (
    <div className={styles.row_selector_container}>
      <div style={{ flex: 1 }}>{currentValue}</div>
      <div style={{ flex: 10 }}>
        <input
          type="range"
          min={min}
          max={max}
          className={styles.row_slider}
          value={currentValue}
          onChange={(e) => {
            setCurrentValue(e.target.value);
            setRows(parseInt(e.target.value));
          }}
          style={{
            background: `linear-gradient(90deg,#e6007a 0%,#e6007a ${
              ((currentValue - min) / (max - min)) * 100
            }%,  #ffffff ${
              ((currentValue - min) / (max - min)) * 100
            }%,  #ffffff 100%)`,
          }}
        />
      </div>
      <div style={{ flex: 1 }}>{max}</div>
    </div>
  );
}
