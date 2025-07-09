import CommonCardFooter from "@/Common/CommonCardFooter";
import React from "react";
import EditorsSimple from "@/Common/EditorsSimple";
import DropZoneCommon from "@/Common/DropZoneCommon";
// import WorldMap from "../Dashboard/WorldMap";
import CustomDatePicker from "@/Common/CustomDatePicker";

const LeadTraveler = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>LEAD TRAVELER</h5>
                </div>
                <div className="card-body">
                  <form className="theme-form mega-form">
                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label className="form-label-title  ">Name</label>
                        <input
                          type="text"
                          placeholder="John"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title  ">Surname</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label className="form-label-title  ">
                          Date of Birth
                        </label>
                        <CustomDatePicker />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title  ">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+41771234567"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title  ">Email</label>
                      <input
                        type="email"
                        placeholder="john.doe@test.io"
                        className="form-control"
                      />
                    </div>
                  </form>
                </div>
                {/* <CommonCardFooter /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadTraveler;
