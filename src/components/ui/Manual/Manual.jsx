import styles from "./Manual.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import PriceInput from "../PriceInput/PriceInput";
import RiskTab from "../RiskTab/RiskTab";
import RowsSelector from "../RowsSelector/RowsSelector";
import { gameContext } from "@/store/gameContext";
import { useContext } from "react";

export default function Manual({ children }) {
  const { betFn, setBeFn } = useContext(gameContext);
  const { isRunning, setIsRunning } = useContext(gameContext);

  return (
    <div className={styles.manual_container}>
      {children}
      <div
        style={{
          opacity: isRunning ? 0.5 : 1,
          pointerEvents: isRunning ? "none" : "auto",
          transition: "opacity 0.25s ease",
        }}
      >
        <div style={{ margin: "var(--spacing-lg) 0" }}>
          <div style={{ padding: "var(--spacing-md) 0", fontWeight: "bold" }}>
            Bet Amount
          </div>
          <PriceInput />
        </div>
        <div style={{ margin: "var(--spacing-lg) 0" }}>
          <div style={{ padding: "var(--spacing-md) 0", fontWeight: "bold" }}>
            Risk
          </div>
          <RiskTab />
        </div>
        <div style={{ margin: "var(--spacing-lg) 0", fontWeight: "bold" }}>
          <div style={{ padding: "var(--spacing-md) 0" }}>Rows</div>
          <RowsSelector />
        </div>
      </div>
      <div className={styles.bet_button} onClick={betFn}>
        Bet
      </div>
    </div>
  );
}
