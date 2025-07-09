"use client";
import CommonCardHeader from "@/Common/CommonCardHeader";
import AllCarsTableBody from "@/components/cab/AllCarsTableBody";
import React from "react";

const AllCars = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonCardHeader navigate="/cab/addcars" tittle="All Cars" />
            <div className="card-body">
              <div>
                <div className=" table-responsive table-desi">
                  <table className="all-cars-table table table-striped">
                    <thead>
                      <tr>
                        <th>Car Photo</th>
                        <th>Car Name</th>
                        <th>Type</th>
                        <th>Fare/km</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <AllCarsTableBody />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCars;
