"use client";
import CommonCardFooter from "@/Common/CommonCardFooter";
import DropZoneCommon from "@/Common/DropZoneCommon";
import DatePicker from "@/components/Hotel/common/DatePicker";
import React from "react";

const AllCars = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add New Driver</h5>
                </div>
                <div className="card-body">
                  <form className="theme-form mega-form">
                    <div className="mb-3">
                      <label className="form-label-title ">Driver Name</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Driver Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title ">
                        Upload Driver Image here{" "}
                      </label>
                      <DropZoneCommon
                        onFilesSelected={() => console.log("DropZoneCommon")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label-title ">
                        Gender
                      </label>
                      <select className="form-control js-example-basic-single col-sm-12">
                        <option value="MA">Male</option>
                        <option value="FE">Female</option>
                        <option value="HO">Other</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title ">
                        Date of Birthdate{" "}
                      </label>
                      <div className="input-group date">
                        <div className="input-group">
                          <DatePicker />
                          <div className="input-group-text">
                            <i className="fa fa-calendar" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 choose">
                      <label className="form-label-title ">ID Document </label>
                      <input className="form-control " type="file" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title ">
                        Contact Number
                      </label>
                      <input
                        className="form-control"
                        type="Number"
                        placeholder="Contact Number"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title ">Email Address</label>
                      <input
                        className="form-control"
                        type="email"
                        placeholder=" Email address"
                      />
                    </div>
                  </form>
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

export default AllCars;
