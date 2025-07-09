import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SideBarMenus from "./SideBarMenus";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setToggleSideBar } from "@/store/ThemeCustomize";

const SideBar = () => {
  const { toggleSideBar } = useSelector(
    (state: RootState) => state.ThemeCustomize
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={`sidebar-wrapper ${toggleSideBar ? "close_icon" : ""}`}>
      <div>
        <div className="logo-wrapper">
          <span className="back">Back</span>
          <div
            className="back-btn"
            onClick={() => dispatch(setToggleSideBar())}
          >
            <i className="fa fa-angle-left" />
          </div>
          <div className="toggle-sidebar" defaultChecked>
            <DynamicFeatherIcon
              iconName="Grid"
              className="status_toggle middle sidebar-toggle"
            />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link href="/">
            <Image
              height={34}
              width={120}
              className="img-fluid"
              src={`${ImagePath}/logo/logo-icon.png`}
              alt=""
            />
          </Link>
        </div>
        <nav className="sidebar-main">
          <div className="left-arrow disabled">
            <DynamicFeatherIcon iconName="ArrowLeft" />
          </div>
          <SideBarMenus />
          <div className="right-arrow">
            <DynamicFeatherIcon iconName="ArrowRight" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
