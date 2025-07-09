"use client"
import { Href } from "@/utils/Constant";
import React, { useState } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";

const FullScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenHandler = (isFullScreen: boolean) => {
    setFullScreen(isFullScreen);
    if (isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document?.exitFullscreen();
    }
  };

  return (
    <li className="maximize">
      <a href={Href} className="text-dark">
        <DynamicFeatherIcon iconName="Maximize" onClick={() => {fullScreenHandler(!fullScreen);}}/>
      </a>
    </li>
  );
};

export default FullScreen;
