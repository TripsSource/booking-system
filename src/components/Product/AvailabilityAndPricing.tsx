import React from "react";
import { Trash2 } from "react-feather";
import moment from "moment";
import CustomDatePicker from "@/Common/CustomDatePicker";
import { AvailabilityAndPricingProps } from "@/types/components/product";

const AvailabilityAndPricing = ({
  product,
  handleProduct,
}: AvailabilityAndPricingProps) => {
  const { timeSlots, exclusions, inclusions, bring, knowBeforeGo } = product;
  const handleTimeSlots = (param: string, value: string | string[]) => {
    handleProduct("timeSlots", { ...product.timeSlots, [param]: value });
  };

  return (
    <form className="theme-form mega-form">
      <div className="mb-3">
        <label className="form-label-title">
          <h5>Availability</h5>
        </label>
        <div className="d-flex justify-content-start">
          <div className="justify-content-start align-items-center d-flex m-r-40">
            <label className="form-label-title m-r-10 pt-1">Start Date</label>
            <CustomDatePicker
              date={moment(timeSlots.startDate).toDate()}
              minDate={moment(Date.now()).toDate()}
              onChange={(date) =>
                handleTimeSlots(
                  "startDate",
                  date
                    ? moment(date).format("YYYY-MM-DD")
                    : moment(Date.now()).format("YYYY-MM-DD")
                )
              }
              classes="form-control"
            />
          </div>
          <div className="justify-content-start align-items-center d-flex m-r-10">
            <label className="form-label-title m-r-10 pt-1">End Date</label>
            <CustomDatePicker
              date={moment(timeSlots.endDate).toDate()}
              minDate={moment(timeSlots.startDate).toDate()}
              onChange={(date) => {
                handleTimeSlots(
                  "endDate",
                  date
                    ? moment(date).format("YYYY-MM-DD")
                    : moment(Date.now()).format("YYYY-MM-DD")
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="row">
          <label className="form-label-title">Times</label>
          {timeSlots.times &&
            timeSlots.times.map((time, index) => (
              <div className="d-flex align-items-center g-3">
                <select
                  className="col-sm-4"
                  onChange={(e) => {
                    const times = timeSlots.times.map((tim, i) => {
                      if (index === i) return e.target.value;
                      else return tim;
                    });
                    handleTimeSlots("times", times);
                  }}
                  value={time}
                >
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
                <button
                  className="bg-transparent border-0"
                  type="button"
                  onClick={() => {
                    const times: string[] = timeSlots.times.filter(
                      (_, i) => i !== index
                    );
                    handleTimeSlots("times", times);
                  }}
                >
                  <Trash2 color={"#dc3545"} size={20} />
                </button>
              </div>
            ))}
        </div>
        <button
          className="btn btn-outline-primary w-10 mt-3"
          type="button"
          onClick={() => {
            handleTimeSlots("times", [
              ...(Array.isArray(timeSlots.times) ? timeSlots.times : []),
              "",
            ]);
          }}
        >
          Add Times
        </button>

        <div className="row mt-4">
          <label className="form-label-title">Blackout Days</label>
          {timeSlots.blackOuts &&
            timeSlots.blackOuts.map((blockOut, index) => (
              <div className="d-flex align-items-center g-3">
                <CustomDatePicker
                  date={moment(blockOut).toDate()}
                  key={index}
                  onChange={(date) => {
                    const blocks: string[] = timeSlots.blackOuts.map(
                      (block, i) => {
                        if (index === i) {
                          return date
                            ? moment(date).format("YYYY-MM-DD")
                            : moment(Date.now()).format("YYYY-MM-DD");
                        } else {
                          return block;
                        }
                      }
                    );
                    handleTimeSlots("blackOuts", blocks);
                  }}
                />
                <button
                  className="bg-transparent border-0"
                  type="button"
                  onClick={() => {
                    const blocks: string[] = timeSlots.blackOuts.filter(
                      (_, i) => i !== index
                    );
                    handleTimeSlots("blackOuts", blocks);
                  }}
                >
                  <Trash2 color={"#dc3545"} size={20} />
                </button>
              </div>
            ))}
        </div>
        <button
          className="btn btn-dark btn-block w-10 mt-3"
          type="button"
          onClick={() => {
            handleTimeSlots("blackOuts", [
              ...(Array.isArray(timeSlots.blackOuts)
                ? timeSlots.blackOuts
                : []),
              moment(Date.now()).format("YYYY-MM-DD"),
            ]);
          }}
        >
          Add Blackout Day
        </button>
      </div>
      <div className="mt-5">
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
                onChange={(e) => {
                  const inclusion = inclusions.map((inclusion, index) => {
                    if (i === index) {
                      return e.target.value;
                    }
                    return inclusion;
                  });
                  handleProduct("inclusions", inclusion);
                }}
                placeholder="Enter inclusion"
                className="form-control mb-3"
              />
              <button
                className="mb-2 bg-transparent border-0"
                type="button"
                onClick={() => {
                  const inclusion = inclusions.filter(
                    (_, index) => i !== index
                  );
                  handleProduct("inclusions", inclusion);
                }}
              >
                <Trash2 color={"#dc3545"} size={20} />
              </button>
            </div>
          ))}

          <button
            className="btn btn-primary btn-block w-10"
            type="button"
            onClick={() => {
              handleProduct("inclusions", [...inclusions, ""]);
            }}
          >
            Add Inclusion
          </button>
        </div>
        <div className="mb-5">
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
                  onChange={(e) => {
                    const exclusion = exclusions.map((exclusion, index) => {
                      if (i === index) {
                        return e.target.value;
                      }
                      return exclusion;
                    });
                    handleProduct("exclusions", exclusion);
                  }}
                  placeholder="Enter exclusion"
                  className="form-control mb-3"
                />
                <button
                  className="mb-2 bg-transparent border-0"
                  type="button"
                  onClick={() => {
                    const exclusion = exclusions.filter(
                      (_, index) => i !== index
                    );
                    handleProduct("exclusions", exclusion);
                  }}
                >
                  <Trash2 color={"#dc3545"} size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            className="btn btn-primary btn-block w-10"
            type="button"
            onClick={() => {
              handleProduct("exclusions", [...exclusions, ""]);
            }}
          >
            Add Exclusion
          </button>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label-title ">What to Bring</label>
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea1"
          value={bring}
          onChange={(e) => handleProduct("bring", e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label-title ">Know Before You Go</label>
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          value={knowBeforeGo}
          onChange={(e) => handleProduct("knowBeforeGo", e.target.value)}
        />
      </div>
    </form>
  );
};

export default AvailabilityAndPricing;
