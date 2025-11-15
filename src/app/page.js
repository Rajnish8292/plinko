"use client";
import ControlTab from "@/components/ui/ControlTab/ControlTab";
import styles from "./page.module.css";
import Manual from "@/components/ui/Manual/Manual";
import Auto from "@/components/ui/Auto/Auto";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { LuNotebookText } from "react-icons/lu";
import { useState } from "react";
export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  const tabCallback = (index) => {
    setCurrentTab(index);
  };
  return (
    <div className={styles.plinko}>
      <div className={styles.game_container}>
        <div className={styles.control_panel}>
          <ControlTab callback={tabCallback} />
          {currentTab == 0 ? <Manual /> : <Auto />}
        </div>
        <div className={styles.canvas_container}>canvas</div>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.left_container}>
          <button>
            <IoMdSettings size={18} />
          </button>
          <button>
            <AiOutlineAlignLeft size={18} />
          </button>
        </div>
        <div className={styles.right_container}>
          <button>
            <LuNotebookText size={18} />
            Provably Fair
          </button>
        </div>
      </div>
    </div>
  );
}
