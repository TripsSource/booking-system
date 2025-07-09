"use client";
import CommonCardFooter from "@/Common/CommonCardFooter";
import DropZoneCommon from "@/Common/DropZoneCommon";
import dynamic from "next/dynamic";

const AllCars = () => {
  const MultipleSelectBox = dynamic(
    () => import("@/Common/MultipleSelectBox"),
    { ssr: false }
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add New car</h5>
                </div>
                <div className="card-body">
                  <form className="theme-form mega-form">
                    <div className="mb-3">
                      <label className="form-label-title">Car Name</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Car Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title ">
                        Upload Car Image here
                      </label>
                      <DropZoneCommon
                        onFilesSelected={() => console.log("DropZoneCommon")}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title  ">Facility</label>
                      {/* <MultipleSelectBox /> */}
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title ">Fare/km</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input
                          className="form-control"
                          placeholder={"20"}
                          type="text"
                          aria-label="Amount (to the nearest dollar)"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="car-type" className="form-label-title ">
                        Car Type
                      </label>
                      <select
                        id="car-type"
                        className="js-example-basic-single col-sm-12"
                      >
                        <option value="MI">Mini</option>
                        <option value="ME">Medium</option>
                        <option value="DU">Standard</option>
                        <option value="CY">Sadan</option>
                        <option value="TA">Luxury</option>
                        <option value="TA">Tempo Travel</option>
                        <option value="DE">Mini Bus</option>
                      </select>
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
