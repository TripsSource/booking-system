import CommonCardFooter from "@/Common/CommonCardFooter";
import React from "react";
import EditorsSimple from "@/Common/EditorsSimple";
import DropZoneCommon from "@/Common/DropZoneCommon";
// import WorldMap from "../Dashboard/WorldMap";
import CustomDatePicker from "@/Common/CustomDatePicker";

const SpecialRequirements = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>SPECIAL REQUIREMENTS</h5>
                </div>
                <div className="card-body">
                  <form className="theme-form mega-form">
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        placeholder="Let us know any special requirements..."
                        id="floatingTextarea"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialRequirements;
