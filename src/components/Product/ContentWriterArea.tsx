import React from "react";
import { useSelector } from "react-redux";
import { destinationTitlesState } from "@/store/destination";
import { ContentWriterAreaProps } from "@/types/components/product";

const ContentWriterArea = ({ product }: ContentWriterAreaProps) => {
  const destinations = useSelector(destinationTitlesState);
  const { name, description, destination, startingLocations, isPrivate } =
    product;
  return (
    <form className="theme-form mega-form">
      <div className="mb-3">
        <label className="form-label-title">
          Please review the Rundown Details:
        </label>
      </div>
      <div className="card-body b-light rounded mb-3">
        <div className="row g-3 mb-3">
          <div className="col-sm-8">
            <label className="form-label-title">Title</label>
            <input
              type="text"
              placeholder="No title provided for this rundown"
              className="form-control"
              value={name}
              readOnly
            />
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">Destination</label>
            <input
              type="text"
              placeholder="Enter Destination"
              className="form-control"
              value={
                destinations.find((value) => value._id === destination)
                  ?.destinationTitle
              }
              readOnly
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label-title ">Description</label>
          <textarea
            className="form-control"
            placeholder="Provide the rundown description..."
            id="floatingTextarea"
            value={
              description
                ? description
                : "No description provided for this rundown"
            }
            readOnly
          />
        </div>
        <div className="mb-3">
          {startingLocations.map((location, index) => (
            <div className="row g-3 mb-3 d-flex align-items-end" key={index}>
              <div className="col-sm-4">
                {index === 0 && (
                  <label className="form-label-title">Start Locations</label>
                )}
                <input
                  type="text"
                  className="form-control"
                  value={
                    destinations.find((value) => value._id === location._id)
                      ?.destinationTitle
                  }
                  readOnly
                />
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
                  readOnly
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
                  readOnly
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default ContentWriterArea;
