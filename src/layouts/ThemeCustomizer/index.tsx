import React, { useState } from "react";

const ThemeCustomizer = () => {
  const [Ltr, setLtr] = useState(false);

  const handleLtr = () => {
    if (Ltr) {
      document.body.classList.remove("rtl");
      document.dir = "ltr";
    } else {
      document.body.classList.add("rtl");
      document.dir = "rtl";
    }
    setLtr(!Ltr);
  };
  return (
    <div className="customizer-links">
      <button onClick={handleLtr} className={`rtl-btn ${Ltr ? "rtl" : ""}`}>
        {Ltr ? "LTR" : "RTL"}
      </button>
    </div>
  );
};

export default ThemeCustomizer;
