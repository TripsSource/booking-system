import CommonCardFooter from "@/Common/CommonCardFooter";
import React from "react";
import AnimateCheckBox from "./AnimateCheckBox";

const RoomDetails = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Room Details</h5>
                </div>
                <div className="card-body">
                  <form className="theme-form mega-form">
                    <div className="mb-3">
                      <label className="form-label-title ">Room Category</label>
                      <select className="form-control js-example-basic-single col-sm-12">
                        <option value="SI"> Single Room</option>
                        <option value="DO">Double Room</option>
                        <option value="TR">Triple Room</option>
                        <option value="QU"> Quad Room</option>
                        <option value="QU">Queen Room</option>
                        <option value="KI"> King Room</option>
                        <option value="TW">Twin Room</option>
                        <option value="HO">Hollywood Twin Room</option>
                        <option value="MI">Mini Suite</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title ">Room Price</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input
                          className="form-control"
                          placeholder={"200"}
                          type="text"
                        />
                      </div>
                    </div>
                    <AnimateCheckBox />
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

export default RoomDetails;
