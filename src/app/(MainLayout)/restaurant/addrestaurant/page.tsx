"use client"
import CommonCardFooter from "@/Common/CommonCardFooter";
import AddRestaurant from "@/components/Restaurant/AddRestaurant";
import React from "react";

const AllRestaurant = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add New Restaurant</h5>
                </div>
                <div className="card-body">
                  <AddRestaurant />
                </div>
                <CommonCardFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurant;
