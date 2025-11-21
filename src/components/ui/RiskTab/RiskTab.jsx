"use client";
import styles from "./RiskTab.module.css";
import { useState } from "react";
export default function RiskTab({
  defaultOption = "medium",
  options = ["easy", "medium", "hard"],
}) {
  const [selected, setSelected] = useState(defaultOption);
  return (
    <>
      <div className={styles.risk_tab_container}>
        {options.map((option) => {
          return (
            <div
              className={`${styles.risk_option} ${
                option == selected ? styles.risk_option_active : ""
              }`}
              key={option}
              onClick={(e) => {
                setSelected(option);
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
    </>
  );
}
