"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch } from "@/store";
import TourDetail from "@/components/Tours/TourDetail";
import ClientCustomerDetails from "@/components/Tours/BookingDetails";
import AvailabilityAndPricing from "@/components/Tours/AvailabilityAndPricing";

import { TOURSTEPS } from "@/constants/data";
import { getProductIdAction, productLoadingState } from "@/store/products";
import { destinationTitlesState } from "@/store/destination";
import { getDestinationTitlesAction } from "@/store/destination";
import { TourDetailState, ProductCostState } from "@/types/app/tour";
import moment from "moment";
import { useParams } from "next/navigation";

const CreateTour = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [stepTab, setStepTab] = useState(0);
  const { id } = useParams();

  const handleStepTab = (
    _e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    step: React.SetStateAction<number>
  ) => {
    setStepTab(step);
  };

  const loading = useSelector(productLoadingState);
  const desitnation = useSelector(destinationTitlesState);
  const initialCost: ProductCostState = {
    startingLocationId: desitnation[0]._id,
    clientTrainTicket: "",
    swissHalfFareTravelPass: "",
    mountainTicket1: "",
    mountainTicket2: "",
    boatTicket: "",
    tasting1: "",
    tasting2: "",
    tasting3: "",
    guideTrainTicket: "",
    transportation: "",
    childrenCost: "",
  };

  const initialTour: TourDetailState = {
    name: "",
    description: "",
    destination: desitnation[0]._id,
    isPrivate: false,
    members: "15",
    withDriver: true,
    startingLocations: [
      { _id: desitnation[0]._id, meetingLocation: "", durationHours: "" },
    ],
    onlineMap: {
      usaPosition: [46.8, 8.23],
      locations: [],
    },
    timeSlots: {
      startDate: moment(Date.now()).format("YYYY-MM-DD"),
      endDate: moment(Date.now()).format("YYYY-MM-DD"),
      blackOuts: [],
      times: [],
    },
    exclusions: [""],
    inclusions: [""],
    images: [],
    bring: "",
    knowBeforeGo: "",
    bookingDetails: {
      leadFullName: true,
      leadBirth: false,
      leadEmail: true,
      leadPhone: true,
      othersFullName: true,
      othersPhone: false,
      allergyQuestion: true,
      mobilityQuestion: true,
      medicalQuestion: false,
    },
    revenues: [initialCost],
    liveStatus: false,
  };

  const [tour, setTour] = useState<TourDetailState>(initialTour);
  const handleTour = (
    param: string,
    value: Date | string | boolean | File[] | string[]
  ) => {
    setTour({ ...tour, [param]: value });
  };

  const saveTour = () => {
    // dispatch(crateProductAction(product)).then((res) => {
    //   if (res.payload.error) {
    //     toast.error(`${res.payload.error}`);
    //   } else {
    //     toast.success(`${res.payload.message}`);
    //     setProduct(initialTour);
    //   }
    // });
  };

  useEffect(() => {
    dispatch(getDestinationTitlesAction({}));
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header mb-3">
            <div className="d-flex justify-content-between">
              <div>
                <h3>View Tour (Multi-Step)</h3>
              </div>
              <div className="d-flex align-content-center">
                <div className="form-check form-switch align-content-center d-flex">
                  <input
                    className="form-check-input"
                    style={{
                      width: "60px",
                      height: "30px",
                    }}
                    type="checkbox"
                    role="switch"
                    id="live_status"
                    checked={tour.liveStatus}
                    onChange={(e) => handleTour("liveStatus", e.target.checked)}
                  />
                  <label
                    className="form-check-label align-content-center m-l-10 mt-1"
                    htmlFor="live_status"
                  >
                    {tour.liveStatus ? "Live" : "Not Live"}
                  </label>
                </div>
                <button
                  className="btn btn-primary btn-block w-10 m-l-20"
                  type="button"
                  onClick={saveTour}
                  disabled={loading}
                >
                  Save Tour
                </button>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="">
                        <ul className="nav nav-tabs w-100">
                          {TOURSTEPS.map((step) => (
                            <li className="nav-item" key={step.count}>
                              <a
                                className={`nav-link ${
                                  stepTab === step.count ? "active" : null
                                }`}
                                aria-current="page"
                                href="#"
                                onClick={(e) => handleStepTab(e, step.count)}
                              >
                                {step.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="card-body">
                        {stepTab === 0 && <TourDetail {...{ tour }} />}
                        {stepTab === 1 && (
                          <AvailabilityAndPricing {...{ tour }} />
                        )}
                        {stepTab === 2 && (
                          <ClientCustomerDetails {...{ tour, handleTour }} />
                        )}
                      </div>
                      <div className="d-flex justify-content-between mb-3 m-l-10 m-r-10">
                        <button
                          className="btn btn-primary"
                          disabled={stepTab === 0}
                          onClick={() => setStepTab(stepTab - 1)}
                        >
                          Previous
                        </button>
                        <button
                          className="btn btn-primary"
                          disabled={stepTab === TOURSTEPS.length - 1}
                          onClick={() => setStepTab(stepTab + 1)}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <RoomDetails /> */}
    </>
  );
};

export default CreateTour;
