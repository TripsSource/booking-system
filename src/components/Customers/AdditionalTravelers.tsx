import CommonCardFooter from "@/Common/CommonCardFooter";
import React from "react";
import EditorsSimple from "@/Common/EditorsSimple";
import DropZoneCommon from "@/Common/DropZoneCommon";
// import WorldMap from "../Dashboard/WorldMap";
import CustomDatePicker from "@/Common/CustomDatePicker";

const AdditionalTravelers = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>ADDITIONAL TRAVELERS</h5>
                </div>
                <div className="card-body">
                  <form className="theme-form mega-form">
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Traveler Name"
                      />
                      <button type="button" className="btn btn-danger">
                        Remove
                      </button>
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn btn-primary btn-block w-10"
                        type="button"
                      >
                        Add Traveler
                      </button>
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

export default AdditionalTravelers;
