import CommonCardFooter from "@/Common/CommonCardFooter";
import React from "react";
import EditorsSimple from "@/Common/EditorsSimple";
import DropZoneCommon from "@/Common/DropZoneCommon";
// import WorldMap from "../Dashboard/WorldMap";
import CustomDatePicker from "@/Common/CustomDatePicker";
import { TourDetailsProps } from "@/types/components/booking";

const TourDetails = ({ book, handleCustomBook }: TourDetailsProps) => {
  const { tourDate } = book;
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
                    <div className="mb-3">
                      <label className="form-label-title  ">Tour Date</label>
                      <div className="col-sm-12">
                        <CustomDatePicker
                          date={
                            tourDate === ""
                              ? new Date(Date.now())
                              : new Date(tourDate)
                          }
                          onChange={(date) =>
                            handleCustomBook(
                              "tourDate",
                              date ? date?.toLocaleDateString() : ""
                            )
                          }
                        />
                      </div>
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
