import ControlTab from "@/components/ui/ControlTab/ControlTab";
import styles from "./page.module.css";
import Manual from "@/components/ui/Manual/Manual";
export default function Home() {
  return (
    <div className={styles.plinko}>
      <div className={styles.control_panel}>
        <ControlTab />
        <Manual />
      </div>
      <div className={styles.canvas_container}>canvas</div>
    </div>
  );
}
