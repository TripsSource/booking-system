"use client";
import { hotelsTopMenuData } from "@/data/Hotel";
import { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Review from "../Tour/review";
import Location from "../Tour/Location";
import HotelRoomsDetail from "./HotelRoomsDetail";
import HotelAbout from "./HotelAbout";
import HotelFacility from "./HotelFacility";
import HotelPolicies from "./HotelPolicies";

const HotelsTopMenu = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Nav tabs>
        {hotelsTopMenuData.map((data, index) => (
          <NavItem
            key={index}
            onClick={() => {
              setActiveTab(index + 1);
            }}
          >
            <NavLink active={activeTab === index + 1 ? true : false}>
              {data}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab} className="description-details">
        <TabPane tabId={1} className="menu-part ">
          <HotelRoomsDetail />
        </TabPane>
        <TabPane tabId={2} className="about menu-part">
          <HotelAbout />
        </TabPane>
        <TabPane tabId={3} className="menu-part facility ">
          <HotelFacility />
        </TabPane>
        <TabPane tabId={4} className="menu-part map ">
          <Location />
        </TabPane>
        <TabPane tabId={5} className="menu-part review ">
          <Review />
        </TabPane>
        <TabPane tabId={6} className="menu-part policy ">
          <HotelPolicies />
        </TabPane>
      </TabContent>
    </>
  );
};

export default HotelsTopMenu;
