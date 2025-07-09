"use client";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { MenuItems } from "./MenuItems";
import MenuList from "./SideBarItems";

const SideBarMenus = () => {
  const [activeMenu, setActiveMenu] = useState([]);

  return (
    <div id="sidebar-menu">
      <ul className="sidebar-links">
        <SimpleBar style={{ maxHeight: 300 }}>
          <li className="back-btn">
            <Link href="/" className="active">
              <Image
                height={34}
                width={120}
                className="img-fluid"
                src={`${ImagePath}/logo/logo-icon.png`}
                alt=""
              />
            </Link>
            <div className="mobile-back text-end">
              <span>Back</span>
              <i className="fa fa-angle-right ps-2" />
            </div>
          </li>
          <MenuList
            menu={MenuItems()}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            level={0}
          />
        </SimpleBar>
      </ul>
    </div>
  );
};

export default SideBarMenus;
