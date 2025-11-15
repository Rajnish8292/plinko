import styles from "./Auto.module.css";
import PriceInput from "../PriceInput/PriceInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import NoOfBet from "../NoOfBet/NoOfBet";
export default function Auto() {
  return (
    <div className={styles.auto_container}>
      <div>
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
          <CustomSelect
            defaultOption="low"
            options={["low", "medium", "high"]}
          />
        </div>
        <div style={{ margin: "var(--spacing-lg) 0", fontWeight: "bold" }}>
          <div style={{ padding: "var(--spacing-md) 0" }}>Rows</div>
          <CustomSelect
            defaultOption="8"
            options={Array.from({ length: 16 - 8 + 1 }, (_, i) => i + 8)}
          />
        </div>
        <div style={{ margin: "var(--spacing-lg) 0", fontWeight: "bold" }}>
          <div style={{ padding: "var(--spacing-md) 0" }}>Number of Bets</div>
          <NoOfBet />
        </div>
      </div>
      <div className={styles.bet_button}>Start Autobet</div>
    </div>
  );
}
