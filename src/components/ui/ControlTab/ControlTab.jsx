"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./ControlTab.module.css";

export default function ControlTab() {
  const indicator_ref = useRef();
  const button_container_ref = useRef();
  const [currentPosition, setCurrentPosition] = useState(0);

  const changeIndicatorPositionTo = useCallback((index) => {
    if (!indicator_ref.current || !button_container_ref.current) return;

    const activeButton = button_container_ref.current.children[index];
    const { top, left, width, height } = activeButton.getBoundingClientRect();

    console.log(top, left, width, height);

    indicator_ref.current.style.left = `${left}px`;
    indicator_ref.current.style.top = `${top}px`;
    indicator_ref.current.style.width = `${width}px`;
    indicator_ref.current.style.height = `${height}px`;
  }, []);

  useEffect(() => {
    changeIndicatorPositionTo(currentPosition);
  }, [currentPosition]);

  return (
    <div className={styles.tab_container}>
      <div ref={indicator_ref} className={styles.tab_indicator}></div>

      <div ref={button_container_ref} className={styles.buttons_container}>
        <div
          className={styles.tab_button}
          onClick={() => {
            setCurrentPosition(0);
          }}
        >
          Manual
        </div>
        <div
          className={styles.tab_button}
          onClick={() => {
            setCurrentPosition(1);
          }}
        >
          Auto
        </div>
        <div
          className={styles.tab_button}
          onClick={() => {
            setCurrentPosition(2);
          }}
        >
          Advanced
        </div>
      </div>
    </div>
  );
}
