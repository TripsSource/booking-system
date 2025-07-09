import CommonCardHeader from "@/Common/CommonCardHeader";
import AllCarsTables from "@/components/cab/AllCarsTables";
import React from "react";

const AllCars = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonCardHeader navigate="/cab/adddrivers" tittle="All Drivers" />
            <div className="card-body">
              <div>
                <div className="table-responsive table-desi">
                  <table className="user-table all-driver-table table table-striped">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Driver Name</th>
                        <th>Gender</th>
                        <th>Location</th>
                        <th>Phone</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <AllCarsTables />
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
