import styles from "./MultiplierHistory.module.css";

export default function MultiplierHistory({ multiplierContainerRef }) {
  return (
    <div className={styles.multiplier_container}>
      <div
        className={styles.multiplier_wrapper}
        ref={multiplierContainerRef}
      ></div>
      <div className={styles.bottom_gradient}></div>
    </div>
  );
}
