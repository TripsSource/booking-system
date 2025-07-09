import { destinationTitlesState } from "@/store/destination";
import { GuideDetailsProps } from "@/types/components/product";
import React, { useMemo, useState } from "react";
import { Trash2 } from "react-feather";
import { useSelector } from "react-redux";

const GuideDetails = ({ product, handleProduct }: GuideDetailsProps) => {
  const { startingLocations, guideDetails, timeSlots, isPrivate } = product;
  const useTimeSlots = useMemo(() => timeSlots.times, [timeSlots.times]);
  const destinations = useSelector(destinationTitlesState);
  const tabs = startingLocations.map(
    (item) =>
      destinations.find((item2) => item2._id === item._id)?.destinationTitle
  );
  const [activeTab, setActiveTab] = useState(0);

  const handleProductStops = (ind: number, param: string, value: string) => {
    const newGuide = guideDetails.map((guideDetail, index) => {
      if (activeTab === index)
        return {
          ...guideDetails[activeTab],
          itineraryStops: guideDetails[activeTab].itineraryStops.map(
            (stop, i) => {
              if (ind === i) {
                return {
                  ...stop,
                  [param]: value,
                };
              } else return stop;
            }
          ),
        };
      else return guideDetail;
    });
    handleProduct("guideDetails", newGuide);
  };

  const RemoveProductStops = (i: number) => {
    const newGuide = guideDetails.map((guideDetail, index) => {
      if (activeTab === index)
        return {
          ...guideDetails[activeTab],
          itineraryStops: guideDetails[activeTab].itineraryStops.filter(
            (_, ind) => i !== ind
          ),
        };
      else return guideDetail;
    });
    handleProduct("guideDetails", newGuide);
  };

  const AddProductStops = () => {
    const newGuide = guideDetails.map((guideDetail, index) => {
      if (activeTab === index)
        return {
          ...guideDetails[activeTab],
          itineraryStops: [
            ...guideDetails[activeTab].itineraryStops,
            {
              position: "",
              pointsToCover: "",
            },
          ],
        };
      else return guideDetail;
    });
    handleProduct("guideDetails", newGuide);
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
          {useTimeSlots.map((time, index) => (
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
                  value={convertEndDate(
                    time,
                    startingLocations[activeTab].durationHours
                  )}
                  disabled={isPrivate}
                />
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  value={startingLocations[activeTab].durationHours}
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
                  ? ""
                  : startingLocations[activeTab]?.meetingLocation || ""
              }
              readOnly
              disabled={isPrivate}
            />
          </div>
        </div>
        <div className="mb-4">
          {guideDetails[activeTab] &&
            guideDetails[activeTab].itineraryStops &&
            guideDetails[activeTab].itineraryStops.map((guide, index) => (
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
