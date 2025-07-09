import DropZoneCommon from "@/Common/DropZoneCommon";
import dynamic from "next/dynamic";
import React from "react";

const AddNewPackageForm = () => {
  const MultipleSelectBox = dynamic(
    () => import("@/Common/MultipleSelectBox"),
    { ssr: false }
  );

  return (
    <form className="theme-form mega-form">
      <div className="mb-3">
        <label className="form-label-title">Tour Name</label>
        <input className="form-control" type="text" placeholder="Tour name" />
      </div>
      <div className="mb-3">
        <label className="form-label-title  ">Tour Places</label>
        {/* <MultipleSelectBox /> */}
      </div>
      <div className="mb-3">
        <label className="form-label-title ">
          Upload Tour Banner Image here{" "}
        </label>
        <DropZoneCommon onFilesSelected={() => console.log("DropZoneCommon")} />
      </div>
      <div className="mb-3">
        <label className="form-label-title ">Tour Duration </label>
        <input
          className="form-control"
          type="Number"
          placeholder="Enter Duration of tour"
        />
      </div>
      <div className="mb-3">
        <label className="form-label-title ">Package Price</label>
        <div className="input-group mb-3">
          <span className="input-group-text">$ </span>
          <input
            className="form-control"
            placeholder="$200"
            type="text"
            aria-label="Amount (to the nearest dollar)"
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="tour-category" className="form-label-title ">
          Tour Category
        </label>
        <select
          id="tour-category"
          className="js-example-basic-single col-sm-12"
        >
          <option value="BU">Business Travel</option>
          <option value="FA">Family Vacation</option>
          <option value="LO">Long-Term Slow Trip</option>
          <option value="GR">Group Travel</option>
          <option value="LU">Luxury Travel</option>
          <option value="WE"> Weekend Travel</option>
          <option value="RO">Road Trip</option>
          <option value="AD">Adventure Travel</option>
        </select>
      </div>
    </form>
  );
};

export default AddNewPackageForm;
