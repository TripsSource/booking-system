"use client";
import CommonCardFooter from "@/Common/CommonCardFooter";
import AddCategoriesForm from "@/components/Tour/AddCategoriesForm";

const TourAddCategories = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add New Package Category</h5>
                </div>
                <AddCategoriesForm />
                <CommonCardFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourAddCategories;
