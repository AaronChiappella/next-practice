'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "./themeToggle.css";
import { ThemeContext } from "@/app/context/ThemeContext";
import { useContext } from "react";

export default function ThemeToggle() {
  const { toggle, theme } = useContext(ThemeContext);

  return (
    <div className={`theme-toggle ${theme}`}>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onClick={toggle}
        checked={theme === "dark"}
        readOnly
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <FontAwesomeIcon icon={faMoon} className="icon" />
        <FontAwesomeIcon icon={faSun} className="icon" />
        <span className="ball"></span>
      </label>
    </div>
  );
}
