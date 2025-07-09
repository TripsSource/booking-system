"use client";
import DropZoneCommon from "@/Common/DropZoneCommon";
import {
  CompanyName,
  ContactNumber,
  EmailAddress,
  UploadItemImageHere,
  UserName,
  Website,
} from "@/utils/Constant";
import React from "react";

const AddUserForm = () => {
  return (
    <form className="theme-form mega-form">
      <div className="mb-3">
        <label className="form-label-title ">{UserName}</label>
        <input className="form-control" type="text" placeholder="User Name" />
      </div>
      <div className="mb-3">
        <label className="form-label-title ">{EmailAddress}</label>
        <input
          className="form-control"
          type="email"
          placeholder="Email Address"
        />
      </div>
      <div className="mb-3">
        <label className="form-label-title ">{ContactNumber}</label>
        <input
          className="form-control"
          type="Number"
          placeholder="Contact number"
        />
      </div>
      <div className="mb-3">
        <label className="form-label-title ">{CompanyName}</label>
        <input
          className="form-control"
          type="text"
          placeholder="Company Name"
        />
      </div>
      <div className="mb-3">
        <label className="form-label-title ">{Website}</label>
        <input className="form-control" type="text" placeholder="Website" />
      </div>
      <div className="mb-3">
        <label className="form-label-title ">{UploadItemImageHere}</label>
        <DropZoneCommon onFilesSelected={() => console.log("DropZoneCommon")} />
      </div>
    </form>
  );
};

export default AddUserForm;
