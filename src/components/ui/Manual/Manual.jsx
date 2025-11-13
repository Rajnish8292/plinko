import styles from "./Manual.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import PriceInput from "../PriceInput/PriceInput";

export default function Manual() {
  return (
    <div className={styles.manual_container}>
      <div style={{ margin: "var(--spacing-2xl) 0" }}>
        <div style={{ padding: "var(--spacing-md) 0", fontWeight: "bold" }}>
          Bet Amount
        </div>
        <PriceInput />
      </div>
      <div style={{ margin: "var(--spacing-2xl) 0" }}>
        <div style={{ padding: "var(--spacing-md) 0", fontWeight: "bold" }}>
          Risk
        </div>
        <CustomSelect defaultOption="low" options={["low", "medium", "high"]} />
      </div>
      <div style={{ margin: "var(--spacing-2xl) 0", fontWeight: "bold" }}>
        <div style={{ padding: "var(--spacing-md) 0" }}>Rows</div>
        <CustomSelect
          defaultOption="8"
          options={Array.from({ length: 16 - 8 + 1 }, (_, i) => i + 8)}
        />
      </div>
      <div className={styles.bet_button}>Bet</div>
    </div>
  );
}
