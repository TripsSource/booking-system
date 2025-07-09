import React from "react";
import DynamicFeatherIcon from "./DynamicFeatherIcon";

const SocialIcons = () => {
  return (
    <div className="social mt-4">
      <div className="btn-showcase">
        <a
          className="btn btn-light"
          href="https://www.linkedin.com/login"
          target="_blank"
        >
          <DynamicFeatherIcon iconName="Linkedin" className="txt-linkedin" />
          LinkedIn
        </a>
        <a
          className="btn btn-light"
          href="https://twitter.com/login?lang=en"
          target="_blank"
        >
          <DynamicFeatherIcon iconName="Twitter" className="txt-twitter" />
          twitter
        </a>
        <a
          className="btn btn-light"
          href="https://www.facebook.com/"
          target="_blank"
        >
          <DynamicFeatherIcon iconName="Facebook" className="txt-fb" />
          facebook
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
