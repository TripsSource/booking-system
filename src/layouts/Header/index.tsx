import React, { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import SearchRica from "./SearchRica";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import NotificationBox from "./NotificationBox";
import DarkMode from "./DarkMode";
import MessageBox from "./MessageBox";
import FullScreen from "./FullScreen";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Header = () => {
  const { toggleSideBar } = useSelector(
    (state: RootState) => state.ThemeCustomize
  );
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  return (
    <div className={`page-header ${toggleSideBar ? "close_icon" : ""}`}>
      <div className="header-wrapper row m-0">
        <HeaderLogo />
        {/* <SearchRica
          searchBarOpen={searchBarOpen}
          setSearchBarOpen={setSearchBarOpen}
        /> */}
        <div className="nav-right col-4 pull-right right-header p-0">
          <ul className="nav-menus">
            <li onClick={() => setSearchBarOpen(!searchBarOpen)}>
              <span className="header-search">
                <DynamicFeatherIcon iconName="Search" />
              </span>
            </li>
            {/* <NotificationBox /> */}
            <DarkMode />
            {/* <MessageBox /> */}
            <FullScreen />
            <UserProfile />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
