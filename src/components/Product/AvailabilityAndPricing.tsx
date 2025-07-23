import React from "react";
import { Trash2 } from "react-feather";
import moment from "moment";
import CustomDatePicker from "@/Common/CustomDatePicker";
import { AvailabilityAndPricingProps } from "@/types/components/product";

const AvailabilityAndPricing = ({
  product,
  handleProduct,
}: AvailabilityAndPricingProps) => {
  const {
    startDate,
    endDate,
    blackOuts,
    exclusions,
    inclusions,
    bring,
    knowBefore,
  } = product;

  return (
    <form className="theme-form mega-form">
      <div className="mb-3">
        <label className="form-label-title">
          <h5>Availability</h5>
        </label>
        <div className="d-flex justify-content-start mx-2">
          <div className="justify-content-start align-items-center d-flex m-r-40">
            <label className="form-label-title m-r-10 pt-1">Start Date</label>
            <CustomDatePicker
              date={moment(startDate).toDate()}
              minDate={moment(Date.now()).toDate()}
              onChange={(date) =>
                handleProduct(
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
              date={
                endDate !== null && endDate !== ""
                  ? moment(endDate).toDate()
                  : null
              }
              minDate={moment(startDate).toDate()}
              onChange={(date) => {
                handleProduct(
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
      <div className="mb-5 mx-2">
        <div className="row">
          <label className="form-label-title">Blackout Days</label>
          {blackOuts &&
            blackOuts.map((blockOut, index) => (
              <div className="d-flex align-items-center g-3" key={index}>
                <div className="mx-2">
                  <CustomDatePicker
                    date={moment(blockOut.startDate).toDate()}
                    onChange={(date) => {
                      const blocks = blackOuts.map((block, i) => {
                        if (index === i) {
                          return {
                            ...block,
                            startDate: date
                              ? moment(date).format("YYYY-MM-DD")
                              : moment(Date.now()).format("YYYY-MM-DD"),
                          };
                        } else {
                          return block;
                        }
                      });
                      handleProduct("blackOuts", blocks);
                    }}
                  />
                </div>
                <div className="mx-2">
                  <CustomDatePicker
                    date={moment(blockOut.endDate).toDate()}
                    onChange={(date) => {
                      const blocks = blackOuts.map((block, i) => {
                        if (index === i) {
                          return {
                            ...block,
                            endDate: date
                              ? moment(date).format("YYYY-MM-DD")
                              : moment(Date.now()).format("YYYY-MM-DD"),
                          };
                        } else {
                          return block;
                        }
                      });
                      handleProduct("blackOuts", blocks);
                    }}
                    minDate={moment(blockOut.startDate).toDate()}
                  />
                </div>
                <button
                  className="bg-transparent border-0"
                  type="button"
                  onClick={() =>
                    handleProduct(
                      "blackOuts",
                      blackOuts.filter((_, i) => i !== index)
                    )
                  }
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
            handleProduct("blackOuts", [
              ...(Array.isArray(blackOuts) ? blackOuts : []),
              {
                startDate: moment(Date.now()).format("YYYY-MM-DD"),
                endDate: moment(Date.now()).format("YYYY-MM-DD"),
              },
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
          value={knowBefore}
          onChange={(e) => handleProduct("knowBefore", e.target.value)}
        />
      </div>
    </form>
  );
};

export default AvailabilityAndPricing;
