import CommonCardHeader from "@/Common/CommonCardHeader";
import AllHotelTableBody from "@/components/Hotel/AllHotelTableBody";
import React from "react";

const AllHotels = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonCardHeader navigate="/hotel/addhotel" tittle="All Hotel" />
            <div className="card-body">
              <div>
                <div className="all-hotel-table table-responsive table-desi">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <AllHotelTableBody />
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

export default AllHotels;
