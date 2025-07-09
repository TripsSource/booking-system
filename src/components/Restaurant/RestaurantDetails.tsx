import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Location from "../Tour/Location";
import Review from "../Tour/review";
import RestaurantOrderOnline from "./RestaurantOrderOnline";
import Overview from "./OverView";
import RestaurantGallery from "./RestaurantGallery";

const RestaurantDetails = () => {
  const navItems = ["Order Online","OverView","gallery","location","reviews",];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="description-section tab-section">
      <div className="menu-top menu-up">
        <Nav tabs className="mt-0">
          {navItems.map((data, index) => (
            <NavItem
              key={index}
              onClick={() => {setActiveTab(index + 1);}}
            >
              <NavLink active={activeTab === index + 1 ? true : false} className="nav-link--2">
                {data}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>
      <TabContent activeTab={activeTab} className="description-details">
        <TabPane tabId={1} className="menu-part ">
          <RestaurantOrderOnline />
        </TabPane>
        <TabPane tabId={2} className="about menu-part">
          <Overview />
        </TabPane>
        <TabPane tabId={3} className="menu-part facility ">
          <RestaurantGallery />
        </TabPane>
        <TabPane tabId={4} className="menu-part map ">
          <Location />
        </TabPane>
        <TabPane tabId={5} className="menu-part review ">
          <Review />
        </TabPane>
        
      </TabContent>
    </div>
  );
};

export default RestaurantDetails;
