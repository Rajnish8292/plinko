"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ControlTab.module.css";
import { useContext } from "react";
import { gameContext } from "@/store/gameContext";

export default function ControlTab({ callback }) {
  const indicator_ref = useRef();
  const button_container_ref = useRef();
  const [currentPosition, setCurrentPosition] = useState(0);
  const { isRunning, setIsRunning } = useContext(gameContext);

  const changeIndicatorPositionTo = useCallback((index) => {
    if (!indicator_ref.current || !button_container_ref.current) return;

    const activeButton = button_container_ref.current.children[index];
    indicator_ref.current.style.left = `${activeButton.offsetLeft}px`;
    indicator_ref.current.style.top = `${activeButton.offsetTop}px`;

    callback(index);
  }, []);
  3;
  const resizeHandler = useCallback(() => {
    changeIndicatorPositionTo(currentPosition);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    changeIndicatorPositionTo(currentPosition);
  }, [currentPosition]);

  return (
    <div
      className={styles.tab_container}
      style={{
        opacity: isRunning ? 0.5 : 1,
        pointerEvents: isRunning ? "none" : "auto",
        transition: "opacity 0.25s ease",
      }}
    >
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
      </div>
    </div>
  );
}
