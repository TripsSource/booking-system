import CommonCardFooter from "@/Common/CommonCardFooter";
import React from "react";
import EditorsSimple from "@/Common/EditorsSimple";
import DropZoneCommon from "@/Common/DropZoneCommon";
// import WorldMap from "../Dashboard/WorldMap";
import CustomDatePicker from "@/Common/CustomDatePicker";

const TourDetails = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>TOUR DETAILS</h5>
                </div>
                <div className="card-body">
                  <form className="theme-form mega-form">
                    <div className="mb-3">
                      <label className="form-label-title  ">Select Tour</label>
                      <select className="form-control js-example-basic-single col-sm-12">
                        {Array.from({ length: 25 }, (_, i) => (
                          <React.Fragment key={i}>
                            <option value={i}>{i}</option>
                          </React.Fragment>
                        ))}
                      </select>
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

export default TourDetails;
