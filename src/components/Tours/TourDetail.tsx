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
import { TourDetailProps } from "@/types/components/tour";

const WorldMap = dynamic(() => import("@/components/Dashboard/WorldMap"), {
  ssr: false,
});

const ProductDetail = ({ tour }: TourDetailProps) => {
  const {
    name,
    description,
    isPrivate,
    members,
    startingLocations,
    onlineMap,
    destination,
    withDriver,
  } = tour;
  const destinations = useSelector(destinationTitlesState);
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
          />
        </div>
        <div className="col-sm-2">
          <label className="form-label-title">Destination</label>
          <select
            className="form-control js-example-basic-single col-sm-12"
            value={
              typeof destination === "string" ? destination : destination?._id
            }
          >
            {destinations.map((value: readDestinationTitleType) => (
              <option key={value._id} value={value._id}>
                {value.destinationTitle}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label-title">Description</label>
          <textarea
            className="form-control"
            placeholder="Provide the Tour description..."
            value={description}
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
                placeholder={`${
                  isPrivate
                    ? "Input a number between " +
                      PRIVATE_TOUR_MIN +
                      " and " +
                      PRIVATE_TOUR_MAX
                    : "Input a number more than " + SMALLGROUP_TOUR_MIN
                }`}
                className="form-control mb-1 ps-1"
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
                >
                  {destinations.map((value: readDestinationTitleType) => (
                    <option key={value._id} value={value._id}>
                      {value.destinationTitle}
                    </option>
                  ))}
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
                  min={1}
                  readOnly={isPrivate}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="b-light rounded mt-5 mb-3">
        <div className="mb-3">
          <label className="form-label-title">
            <h5>Itinerary</h5>
          </label>
          <WorldMap {...{ checkPlace, onlineMap }} />
        </div>
      </div>
    </form>
  );
};

export default ProductDetail;
