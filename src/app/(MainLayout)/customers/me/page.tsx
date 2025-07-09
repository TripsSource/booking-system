"use client";
import React from "react";
import CommonCardHeader from "@/Common/CommonCardHeader";
import MyBookings from "@/components/Customers/MyBookings";

const ViewTours = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonCardHeader navigate="/customers/me" tittle="My Bookings" />
            <div className="card-body">
              <div className="col-sm-4">
                <input
                  type="text"
                  placeholder="Start typing to search or filter your tours"
                  className="form-control"
                />
                <br />
              </div>
              <div>
                <div className="table-responsive table-desi">
                  <MyBookings />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTours;
