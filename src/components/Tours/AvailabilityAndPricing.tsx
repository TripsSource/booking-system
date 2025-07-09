import React from "react";
import { Trash2 } from "react-feather";
import moment from "moment";
import CustomDatePicker from "@/Common/CustomDatePicker";
import { AvailabilityAndPricingProps } from "@/types/components/tour";

const AvailabilityAndPricing = ({ tour }: AvailabilityAndPricingProps) => {
  const { timeSlots, exclusions, inclusions, bring, knowBeforeGo } = tour;

  return (
    <form className="theme-form mega-form">
      <div className="b-light rounded mb-3">
        <label className="form-label-title">
          <h5>Availability</h5>
        </label>
        <div className="d-flex justify-content-start">
          <div className="justify-content-start align-items-center d-flex m-r-40">
            <label className="form-label-title m-r-10 pt-1">Start Date</label>
            <CustomDatePicker
              date={moment(timeSlots.startDate).toDate()}
              minDate={moment(Date.now()).toDate()}
            />
          </div>
          <div className="justify-content-start align-items-center d-flex m-r-10">
            <label className="form-label-title m-r-10 pt-1">End Date</label>
            <CustomDatePicker
              date={moment(timeSlots.endDate).toDate()}
              minDate={moment(Date.now()).toDate()}
            />
          </div>
        </div>
      </div>
      <div className="b-light rounded mb-5">
        <div className="row">
          <label className="form-label-title">Times</label>
          {timeSlots.times &&
            timeSlots.times.map((time, index) => (
              <div className="d-flex align-items-center g-3">
                <select className="col-sm-4" value={time}>
                  {Array.from({ length: (24 * 60) / 15 }, (_, index) => {
                    const totalMinutes = index * 15;
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    return (
                      <option
                        key={index}
                        value={`${String(hours).padStart(2, "0")}:${String(
                          minutes
                        ).padStart(2, "0")}`}
                      >
                        {String(hours).padStart(2, "0")}:
                        {String(minutes).padStart(2, "0")}
                      </option>
                    );
                  })}
                </select>
              </div>
            ))}
        </div>
      </div>
      <div className="b-light rounded mb-5">
        <div className="row">
          <label className="form-label-title">Blackout Days</label>
          {timeSlots.blackOuts &&
            timeSlots.blackOuts.map((blockOut, index) => (
              <div className="d-flex align-items-center g-3">
                <CustomDatePicker
                  date={moment(blockOut).toDate()}
                  key={index}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="b-light rounded">
        <div className="mb-5">
          <div>
            <label className="form-label-title">
              <h5>Inclusions</h5>
            </label>
          </div>
          {inclusions.map((inclusion: string, i: number) => (
            <div className="d-flex align-items-center">
              <input
                type="text"
                value={inclusion}
                placeholder="Enter inclusion"
                className="form-control mb-3"
              />
              <button className="mb-2 bg-transparent border-0" type="button">
                <Trash2 color={"#dc3545"} size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <div>
            <label className="form-label-title">
              <h5>Exclusions</h5>
            </label>
          </div>
          <div className="row">
            {exclusions.map((exclusion: string, i: number) => (
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  value={exclusion}
                  placeholder="Enter exclusion"
                  className="form-control mb-3"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label-title ">What to Bring</label>
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea1"
          value={bring}
        />
      </div>
      <div className="mb-3">
        <label className="form-label-title ">Know Before You Go</label>
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          value={knowBeforeGo}
        />
      </div>
    </form>
  );
};

export default AvailabilityAndPricing;
