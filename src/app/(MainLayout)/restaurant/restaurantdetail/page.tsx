"use client";
import CommonEditCardHeader from "@/Common/CommonEditCardHeader";
import RestaurantDetails from "@/components/Restaurant/RestaurantDetails";
import React from "react";

const AllRestaurant = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonEditCardHeader heading="Restaurant's Details" />
            <div className="card-body">
              <div className="single-section small-section bg-inner">
                <div className="row">
                  <div className="col-12">
                    <RestaurantDetails />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurant;
