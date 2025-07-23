import { destinationTitlesState } from "@/store/destination";
import { GuideDetailsProps } from "@/types/components/product";
import React, { useMemo, useState } from "react";
import { Trash2 } from "react-feather";
import { useSelector } from "react-redux";

const GuideDetails = ({ product, handleTours }: GuideDetailsProps) => {
  const { tours } = product;
  const destinations = useSelector(destinationTitlesState);
  const tabs = tours.map(
    (tour) =>
      destinations.find((destination) => destination._id === tour.destinationId)
        ?.destinationTitle
  );
  const [activeTab, setActiveTab] = useState(0);

  const { guideDetails, times, duration, isPrivate, meetingLocation } =
    tours[activeTab];
  const handleProductStops = (i: number, type: string, value: string) => {
    const newGuide = guideDetails.map((guideDetail, index) => {
      if (i === index)
        return {
          ...guideDetail,
          [type]: value,
        };
      else return guideDetail;
    });
    handleTours(activeTab, "guideDetails", newGuide);
  };

  const RemoveProductStops = (i: number) => {
    handleTours(
      activeTab,
      "guideDetails",
      guideDetails.filter((_, index) => i !== index)
    );
  };

  const AddProductStops = () => {
    handleTours(activeTab, "guideDetails", [
      ...guideDetails,
      { position: "", pointsToCover: "" },
    ]);
  };

  const convertEndDate = (startTime: string, duration: string) => {
    const [startHour, minute] = startTime.split(":").map(Number);
    const endHour = Math.floor(startHour + Number(duration)) % 24;
    const formattedEndTime = `${String(endHour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}`;
    return formattedEndTime;
  };

  return (
    <div>
      <ul className="nav nav-tabs mb-3">
        {tabs.map((tab, index) => (
          <li key={index} className="nav-item">
            <a
              className={`nav-link ${
                index === activeTab ? "active bg-primary text-white" : ""
              }`}
              aria-current="page"
              href="#"
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
      <form className="theme-form mega-form">
        <div className="mb-4">
          <div className="row">
            <div className="col-sm-4">
              <label className="form-label-title">Start Time</label>
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">End Time</label>
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Duration</label>
            </div>
          </div>
          {times.map((time, index) => (
            <div className="row mb-2" key={index}>
              <div className="col-sm-4">
                <input
                  value={time}
                  type="text"
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  value={convertEndDate(time, duration.toString())}
                  disabled={isPrivate}
                />
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  value={duration}
                  className="form-control"
                  readOnly
                  disabled={isPrivate}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <div className="d-flex justify-content-start">
            <label className="form-label-title text-nowrap mt-2 me-2">
              Meeting Point
            </label>
            <input
              type="text"
              className="form-control"
              value={
                isPrivate
                  ? "customer input for meeting location"
                  : meetingLocation ?? "Didn't input meetingLocation"
              }
              readOnly
              disabled={isPrivate}
            />
          </div>
        </div>
        <div className="mb-4">
          {guideDetails &&
            guideDetails.map((guide, index) => (
              <div className="row mb-3">
                <div className="col-sm-5">
                  <label className="form-label-title">Stop {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={guide.position}
                    onChange={(e) =>
                      handleProductStops(index, "position", e.target.value)
                    }
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label-title">Points to cover</label>
                  <textarea
                    className="form-control"
                    rows={1}
                    value={guide.pointsToCover}
                    onChange={(e) =>
                      handleProductStops(index, "pointsToCover", e.target.value)
                    }
                  />
                </div>
                <div className="col-sm-1 d-flex align-items-end">
                  <button
                    className="bg-transparent border-0"
                    type="button"
                    onClick={() => RemoveProductStops(index)}
                  >
                    <Trash2 color={"#dc3545"} size={20} />
                  </button>
                </div>
              </div>
            ))}
          <button
            className="btn btn-primary btn-block w-10"
            type="button"
            onClick={() => AddProductStops()}
          >
            Add Stop
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuideDetails;
