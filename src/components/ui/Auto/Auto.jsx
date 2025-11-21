import styles from "./Auto.module.css";
import PriceInput from "../PriceInput/PriceInput";
import RowsSelector from "../RowsSelector/RowsSelector";
import NoOfBet from "../NoOfBet/NoOfBet";
import RiskTab from "../RiskTab/RiskTab";
export default function Auto() {
  return (
    <div className={styles.auto_container}>
      <div>
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
