import React, { useState } from "react";
// import WorldMap from "../Dashboard/WorldMap";
import { ProductDetailProps } from "@/types/components/product";
import dynamic from "next/dynamic";
import { Trash2 } from "react-feather";

import {
  PRIVATE_TOUR,
  PRIVATE_TOUR_MIN,
  PRIVATE_TOUR_MAX,
  SMALLGROUP_TOUR,
  SMALLGROUP_TOUR_MIN,
} from "@/constants/data";
import { useSelector } from "react-redux";
import { destinationTitlesState } from "@/store/destination";
import { readDestinationTitleType } from "@/types/store/destination";

const WorldMap = dynamic(() => import("@/components/Dashboard/WorldMap"), {
  ssr: false,
});

const ProductDetail = ({
  product,
  handleProduct,
  handleTours,
  addTour,
  removeTour,
}: ProductDetailProps) => {
  const {
    name,
    description,
    onlineMap,
    destinationId,
    shortDescription,
    tours,
  } = product;
  const destinations = useSelector(destinationTitlesState) || [];
  const [checkPlace, setCheckPlace] = useState(false);

  return (
    <form className="theme-form mega-form">
      <div className="row g-3">
        <div className="col-sm-10">
          <label className="form-label-title">Tour Name</label>
          <input
            type="text"
            placeholder="Tour Name"
            className="form-control"
            value={name}
            onChange={(e) => handleProduct("name", e.target.value)}
          />
        </div>
        <div className="col-sm-2">
          <label className="form-label-title">Destination</label>
          <select
            className="form-control js-example-basic-single col-sm-12"
            value={destinationId}
            onChange={(e) => handleProduct("destinationId", e.target.value)}
          >
            {destinations.length > 0 ? (
              destinations.map((value: readDestinationTitleType) => (
                <option key={value._id} value={value._id}>
                  {value.destinationTitle}
                </option>
              ))
            ) : (
              <option disabled>No destinations available</option>
            )}
          </select>
        </div>
        <div className="mb-1">
          <label className="form-label-title">Short Description</label>
          <input
            className="form-control"
            type="text"
            placeholder="Briefly describe this tour—keep it to around 100 characters."
            value={shortDescription}
            onChange={(e) =>
              handleProduct("shortDescription", e.target.value.slice(0, 100))
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label-title">Description</label>
          <textarea
            className="form-control"
            placeholder="Provide the Tour description..."
            value={description}
            onChange={(e) => handleProduct("description", e.target.value)}
          />
        </div>
        <div className="mb-1">
          {tours.map((tour, index) => (
            <div
              className="row g-3 d-flex align-items-center border-1 border rounded-3 mx-1 m-3 p-3"
              key={index}
            >
              <div className="col-sm-11">
                <div className="row">
                  <div className="d-flex justify-content-start align-items-center">
                    <h3>Tour {index + 1}</h3>
                    <div className="ms-3">
                      <label className="form-label-title mx-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          checked={tour.isPrivate}
                          onChange={(e) =>
                            handleTours(index, "isPrivate", e.target.checked)
                          }
                        />
                        Private Tour
                      </label>
                    </div>
                    <div>
                      <label className="form-label-title mx-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          checked={tour.withDriver}
                          onChange={(e) =>
                            handleTours(index, "withDriver", e.target.checked)
                          }
                        />
                        Driver
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2">
                      <label className="form-label-title">Start Location</label>
                      <select
                        className="form-control js-example-basic-single col-sm-12"
                        value={tour.destinationId}
                        onChange={(e) =>
                          handleTours(index, "destinationId", e.target.value)
                        }
                      >
                        {destinations.length > 0 ? (
                          destinations.map(
                            (value: readDestinationTitleType) => (
                              <option key={value._id} value={value._id}>
                                {value.destinationTitle}
                              </option>
                            )
                          )
                        ) : (
                          <option disabled>No destinations available</option>
                        )}
                      </select>
                    </div>
                    <div className="col-sm-5">
                      <label className="form-label-title">
                        Meeting Location
                      </label>
                      <input
                        type="text"
                        placeholder="Enter a meeting location"
                        className="form-control"
                        value={
                          tour.isPrivate
                            ? "Provided by customer"
                            : tour.meetingLocation ?? ""
                        }
                        onChange={(e) =>
                          handleTours(index, "meetingLocation", e.target.value)
                        }
                        disabled={tour.isPrivate}
                      />
                    </div>
                    <div className="col-sm-3">
                      <label className="form-label-title">
                        Duration (Hours)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter hours"
                        className="form-control"
                        value={tour.duration}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (Number(value) < 1) value = "1";
                          handleTours(
                            index,
                            "duration",
                            `${Math.max(1, Math.min(23, Number(value)))}`
                          );
                        }}
                        min={1}
                      />
                    </div>
                    <div className="col-sm-2">
                      <label className="form-label-title">Members</label>
                      <input
                        type="number"
                        className="form-control"
                        value={tour.members}
                        onChange={(e) => {
                          let members = Number(e.target.value);
                          if (tour.isPrivate) {
                            members =
                              members > PRIVATE_TOUR_MIN
                                ? Math.min(members, PRIVATE_TOUR_MAX)
                                : PRIVATE_TOUR_MIN;
                          } else {
                            members = Math.max(members, SMALLGROUP_TOUR_MIN);
                          }
                          handleTours(index, "members", members.toString());
                        }}
                        min={1}
                        placeholder={`${
                          tour.isPrivate
                            ? "Input a number between " +
                              PRIVATE_TOUR_MIN +
                              " and " +
                              PRIVATE_TOUR_MAX
                            : "Input a number more than " + SMALLGROUP_TOUR_MIN
                        }`}
                      />
                    </div>
                    <label className="form-label-title mt-2">Times</label>
                    <div className="row mx-1">
                      {tour.times &&
                        tour.times.map((time, i) => (
                          <div
                            className="col-sm-2 d-flex align-items-center justify-content-start g-1"
                            key={i}
                          >
                            <select
                              onChange={(e) => {
                                const times = tour.times.map((tim, id) => {
                                  if (i === id) return e.target.value;
                                  else return tim;
                                });
                                handleTours(index, "times", times);
                              }}
                              value={time}
                            >
                              {Array.from(
                                { length: (24 * 60) / 15 },
                                (_, idex) => {
                                  const totalMinutes = idex * 15;
                                  const hours = Math.floor(totalMinutes / 60);
                                  const minutes = totalMinutes % 60;
                                  return (
                                    <option
                                      key={idex}
                                      value={`${String(hours).padStart(
                                        2,
                                        "0"
                                      )}:${String(minutes).padStart(2, "0")}`}
                                    >
                                      {String(hours).padStart(2, "0")}:
                                      {String(minutes).padStart(2, "0")}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                            <button
                              className="bg-transparent border-0"
                              type="button"
                              onClick={() => {
                                const times: string[] = tour.times.filter(
                                  (_, ind) => ind !== i
                                );
                                handleTours(index, "times", times);
                              }}
                            >
                              <Trash2 color={"#dc3545"} size={20} />
                            </button>
                          </div>
                        ))}
                    </div>
                    <button
                      className="col-sm-2 btn btn-outline-primary btn-block mx-3 mt-3"
                      type="button"
                      onClick={() => {
                        handleTours(index, "times", [
                          ...(Array.isArray(tour.times) ? tour.times : []),
                          "",
                        ]);
                      }}
                    >
                      Add Time
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-1 d-flex justify-content-center">
                <button
                  className="bg-transparent border-0"
                  type="button"
                  onClick={() => removeTour(index)}
                >
                  <Trash2 color={"#dc3545"} size={20} />
                </button>
              </div>
            </div>
          ))}
          <button
            className="btn btn-primary btn-block w-10 mt-3"
            type="button"
            disabled={destinations.length * 4 <= tours.length}
            onClick={() => addTour()}
          >
            Add Tour
          </button>
        </div>
      </div>
      <div className="mt-5 mb-5">
        <div className="mb-3">
          <label className="form-label-title d-flex justify-content-start align-items-end">
            <h5>Itinerary</h5>
            <h6 className="mx-2">(Use Ctrl+Scroll to zoom the map)</h6>
          </label>
          <WorldMap {...{ checkPlace, onlineMap, handleProduct }} />
          <br />
          <button
            className="btn btn-primary btn-block w-10"
            type="button"
            onClick={() => setCheckPlace(!checkPlace)}
          >
            {checkPlace ? "Click to Add Points" : "Add a point"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductDetail;
