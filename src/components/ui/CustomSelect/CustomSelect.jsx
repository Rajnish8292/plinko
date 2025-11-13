"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./CustomSelect.module.css";

export default function CustomSelect({
  defaultOption = "Medium",
  options = ["Low", "Medium", "High"],
  onChange,
}) {
  const [selected, setSelected] = useState(defaultOption);
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };

  return (
    <div ref={selectRef} className={styles.select_container}>
      <div
        className={styles.select_display}
        onClick={() => setOpen((prev) => !prev)}
        tabIndex={0}
      >
        <span>{selected}</span>
        <span className={`${styles.arrow} ${open ? styles.arrow_up : ""}`}>
          <IoIosArrowDown />
        </span>
      </div>

      {open && (
        <div className={styles.options_list}>
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.option} ${
                selected === option ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
