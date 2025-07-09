"use client";
import AddHotelsCardBody from "@/components/Hotel/AddHotelsCardBody";
import RoomDetails from "@/components/Hotel/RoomDetails";
import React from "react";

const AddHotels = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h5>Add New Hotel</h5>
                  </div>
                  <AddHotelsCardBody />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RoomDetails />
    </>
  );
};

export default AddHotels;
