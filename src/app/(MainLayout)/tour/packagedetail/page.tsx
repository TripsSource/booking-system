"use client";
import CommonEditCardHeader from "@/Common/CommonEditCardHeader";
import PackageDetailCardBody from "@/components/Tour/PackageDetailCardBody";
import React from "react";

const TourAllPackageDetail = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonEditCardHeader heading="Package's Details" />
            <PackageDetailCardBody />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourAllPackageDetail;
