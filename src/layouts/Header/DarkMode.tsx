"use client";
import { useState } from "react";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const DarkModeHandler = (name: string) => {
    setDarkMode(!darkMode);
    if (name === "bulb") {
      document.body.classList.remove("dark-only");
    } else if (name === "Moon") {
      document.body.classList.add("dark-only");
    }
  };
  return (
    <li>
      <div className="mode">
        {darkMode ? (
          <i
            className="fa fa-lightbulb-o"
            onClick={() => DarkModeHandler("bulb")}
          ></i>
        ) : (
          <i className="fa fa-moon-o" onClick={() => DarkModeHandler("Moon")} />
        )}
      </div>
    </li>
  );
};

export default DarkMode;
