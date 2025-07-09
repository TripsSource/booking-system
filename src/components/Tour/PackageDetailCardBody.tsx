"use client";
import { packageDetailData } from "@/data/Tour";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Highlight from "./highlight";
import Itinerary from "./itinerary";
import GalleryImage from "./GalleryImage";
import Accommodations from "./Accommodations";
import Location from "./Location";
import Review from "./review";
import TourPolicies from "./policies";

const PackageDetailCardBody = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div className="card-body">
      <section className="single-section small-section bg-inner">
        <div className="row">
          <div className="col-12">
            <div className="description-section tab-section">
              <div className="detail-img">
                <Image
                  height={252.11}
                  width={1500}
                  src={`${ImagePath}/tours/spain.jpg`}
                  className="img-fluid blur-up lazyload"
                  alt=""
                />
              </div>
              <div className="menu-top menu-up">
                <Nav tabs>
                  {packageDetailData?.map((item, i) => (
                    <NavItem
                      key={i}
                      onClick={() => {
                        setActiveTab(item.id);
                      }}
                    >
                      <NavLink
                        className={`${activeTab === item.id ? "active" : ""}`}
                      >
                        {item.title}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </div>
              <TabContent activeTab={activeTab} className="description-details">
                <TabPane tabId="1" className="menu-part about">
                  <Highlight />
                </TabPane>
                <TabPane tabId="2" className="menu-part accordion">
                  <Itinerary />
                </TabPane>
                <TabPane tabId="3" className="menu-part">
                  <GalleryImage />
                </TabPane>
                <TabPane tabId="4" className="menu-part">
                  <Accommodations  />
                </TabPane>
                <TabPane tabId="5" className="menu-part map">
                  <Location />
                </TabPane>
                <TabPane tabId="6" className="menu-part review">
                  <Review />
                </TabPane>
                <TabPane tabId="7" className="menu-part about">
                  <TourPolicies />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetailCardBody;
