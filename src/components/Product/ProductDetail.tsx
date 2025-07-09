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
  handleLocations,
  addLocations,
  removeLocations,
}: ProductDetailProps) => {
  const {
    name,
    description,
    isPrivate,
    members,
    startingLocations,
    onlineMap,
    destination,
    withDriver,
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
            value={
              typeof destination === "string" ? destination : destination?._id
            }
            onChange={(e) => handleProduct("destination", e.target.value)}
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
        <div className="mb-3">
          <label className="form-label-title">Description</label>
          <textarea
            className="form-control"
            placeholder="Provide the Tour description..."
            value={description}
            onChange={(e) => handleProduct("description", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="d-flex justify-content-start">
            <div className="d-flex justify-content-start align-items-center ">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={isPrivate}
                  onChange={(e) => handleProduct("isPrivate", e.target.checked)}
                  id="isPrivate"
                />
                <label className="form-check-label" htmlFor="isPrivate">
                  {isPrivate ? PRIVATE_TOUR : SMALLGROUP_TOUR}
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center ps-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={withDriver}
                  onChange={(e) =>
                    handleProduct("withDriver", e.target.checked)
                  }
                  id="isDriver"
                />
                <label className="form-check-label" htmlFor="isDriver">
                  Driver
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center ps-5 w-50">
              <label className="form-label-title">Members</label>
              <input
                type="number"
                min={PRIVATE_TOUR_MIN}
                value={members}
                onChange={(e) => {
                  let members = Number(e.target.value);
                  if (isPrivate) {
                    members =
                      members > PRIVATE_TOUR_MIN
                        ? Math.min(members, PRIVATE_TOUR_MAX)
                        : PRIVATE_TOUR_MIN;
                  } else {
                    members = Math.max(members, SMALLGROUP_TOUR_MIN);
                  }
                  handleProduct("members", members.toString());
                }}
                placeholder={`${
                  isPrivate
                    ? "Input a number between " +
                      PRIVATE_TOUR_MIN +
                      " and " +
                      PRIVATE_TOUR_MAX
                    : "Input a number more than " + SMALLGROUP_TOUR_MIN
                }`}
                className="form-control mb-1 ms-2"
              />
            </div>
          </div>
        </div>
        <div className="mb-1">
          {startingLocations.map((location, index) => (
            <div className="row g-3 mb-3 d-flex align-items-end" key={index}>
              <div className="col-sm-3">
                {index === 0 && (
                  <label className="form-label-title">Start Locations</label>
                )}
                <select
                  className="form-control js-example-basic-single col-sm-12"
                  value={location._id}
                  onChange={(e) =>
                    handleLocations(index, "_id", e.target.value)
                  }
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
              <div className="col-sm-5">
                {index === 0 && (
                  <label className="form-label-title">Meeting Locations</label>
                )}
                <input
                  type="text"
                  placeholder="Enter a meeting location"
                  className="form-control"
                  value={
                    isPrivate
                      ? "Provided by customer"
                      : location.meetingLocation
                  }
                  onChange={(e) =>
                    handleLocations(index, "meetingLocation", e.target.value)
                  }
                  readOnly={isPrivate}
                />
              </div>
              <div className="col-sm-3">
                {index === 0 && (
                  <label className="form-label-title">Duration (Hours)</label>
                )}
                <input
                  type="number"
                  placeholder="Enter a duration hours"
                  className="form-control"
                  value={
                    isPrivate ? "Provided by customer" : location.durationHours
                  }
                  onChange={(e) => {
                    let value = e.target.value;
                    if (Number(e.target.value) < 1) value = "1";
                    handleLocations(
                      index,
                      "durationHours",
                      `${Math.max(1, Math.min(24, Number(e.target.value)))}`
                    );
                  }}
                  min={1}
                  readOnly={isPrivate}
                />
              </div>
              <div className="col-sm-1 mb-2">
                <button
                  className="bg-transparent border-0"
                  type="button"
                  onClick={() => removeLocations(index)}
                >
                  <Trash2 color={"#dc3545"} size={20} />
                </button>
              </div>
            </div>
          ))}
          <button
            className="btn btn-primary btn-block w-10"
            type="button"
            onClick={() => addLocations()}
          >
            Add Locations
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
