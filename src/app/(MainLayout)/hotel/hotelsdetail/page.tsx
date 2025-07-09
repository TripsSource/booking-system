"use client";
import CommonEditCardHeader from "@/Common/CommonEditCardHeader";
import HotelsImageSection from "@/components/Hotel/HotelsImageSection";
import HotelsTopMenu from "@/components/Hotel/HotelsTopMenu";
import React from "react";

const AllHotelsDetails = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <CommonEditCardHeader heading="Hotel's Details" />
              <div className="card-body">
                <section className="single-section small-section bg-inner">
                  <div className="row">
                    <div className="col-12">
                      <div className="hotel_title_section">
                        <div className="hotel-name">
                          <div className="left-part">
                            <div className="top">
                              <h2>sea view hotel</h2>
                              <div className="rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-o" />
                              </div>
                            </div>
                            <p>
                              Mina Road, Bur Dubai, Dubai, United Arab Emirates
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="image_section ">
                        <HotelsImageSection />
                      </div>
                      <div className="description-section tab-section">
                        <div className="menu-top">
                          <HotelsTopMenu/>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllHotelsDetails;
