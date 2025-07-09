"use client";

import CommonCardHeader from "@/Common/CommonCardHeader";
import TourCategoriesTableBody from "@/components/Tour/TourCategoriesTableBody";

const TourCategories = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card package-heding">
            <CommonCardHeader
              navigate="/tour/addcategory"
              tittle="All Package Categories"
            />
            <div className="card-body">
              <div>
                <div className="table-responsive table-desi">
                  <table className="all-package-catogories table table-striped">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Category Name</th>
                        <th>No. Of Tours</th>
                        <th>Total Days</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <TourCategoriesTableBody />
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

export default TourCategories;
