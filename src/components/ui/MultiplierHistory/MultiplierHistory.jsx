import styles from "./MultiplierHistory.module.css";

export default function MultiplierHistory({ multiplierContainerRef }) {
  return (
    <div
      ref={multiplierContainerRef}
      className={styles.multiplier_container}
    ></div>
  );
}
