"use client";
import CommonCardFooter from "@/Common/CommonCardFooter";
import AddNewPackageForm from "@/components/Tour/AddNewPackageForm";
import React from "react";

const TourAddPackage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add New Package</h5>
                </div>
                <div className="card-body">
                  <AddNewPackageForm />
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

export default TourAddPackage;
