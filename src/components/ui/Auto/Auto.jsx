import styles from "./Auto.module.css";
import PriceInput from "../PriceInput/PriceInput";
import RowsSelector from "../RowsSelector/RowsSelector";
import NoOfBet from "../NoOfBet/NoOfBet";
import RiskTab from "../RiskTab/RiskTab";
import { useContext } from "react";
import { gameContext } from "@/store/gameContext";
export default function Auto({ children }) {
  const { isRunning, setIsRunning } = useContext(gameContext);

  return (
    <div className={styles.auto_container}>
      {children}
      <div
        style={{
          opacity: isRunning ? 0.5 : 1,
          pointerEvents: isRunning ? "none" : "auto",
          transition: "opacity 0.25s ease",
        }}
      >
        <div style={{ margin: "var(--spacing-md) 0" }}>
          <div style={{ padding: "var(--spacing-md) 0", fontWeight: "bold" }}>
            Bet Amount
          </div>
          <PriceInput />
        </div>
        <div style={{ margin: "var(--spacing-md) 0" }}>
          <div style={{ padding: "var(--spacing-md) 0", fontWeight: "bold" }}>
            Risk
          </div>
          <RiskTab />
        </div>
        <div style={{ margin: "var(--spacing-md) 0", fontWeight: "bold" }}>
          <div style={{ padding: "var(--spacing-md) 0" }}>Rows</div>
          <RowsSelector />
        </div>
        <div style={{ margin: "var(--spacing-md) 0", fontWeight: "bold" }}>
          <div style={{ padding: "var(--spacing-md) 0" }}>Number of Bets</div>
          <NoOfBet />
        </div>
      </div>
      <div className={styles.bet_button}>Start Autobet</div>
    </div>
  );
}
