import CommonCardFooter from "@/Common/CommonCardFooter";
import React from "react";
import EditorsSimple from "@/Common/EditorsSimple";
import DropZoneCommon from "@/Common/DropZoneCommon";
// import WorldMap from "../Dashboard/WorldMap";
import CustomDatePicker from "@/Common/CustomDatePicker";
import { AdditionalTravelersProps } from "@/types/components/booking";

const AdditionalTravelers = ({
  book,
  handleCustomBook,
}: AdditionalTravelersProps) => {
  const { travelers } = book;
  return (
    <div className="container-fluid">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">
            <h5>ADDITIONAL TRAVELERS</h5>
          </div>
          <div className="card-body">
            <form className="theme-form mega-form">
              {travelers.map((traveler: string, index: number) => (
                <div className="input-group mb-2">
                  <input
                    type="text"
                    value={traveler}
                    onChange={(e) => {
                      const newTravelers = [...travelers];
                      newTravelers[index] = e.target.value;
                      handleCustomBook("travelers", newTravelers);
                    }}
                    className="form-control"
                    placeholder="Traveler Name"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      const newTravelers = travelers.filter(
                        (_, i) => i !== index
                      );
                      handleCustomBook("travelers", newTravelers);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="mb-3">
                <button
                  className="btn btn-primary btn-block w-10"
                  type="button"
                  onClick={() => {
                    const newTravelers = [...travelers, ""];
                    handleCustomBook("travelers", newTravelers);
                  }}
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
  );
};

export default AdditionalTravelers;
