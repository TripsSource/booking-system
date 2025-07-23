import Image from "next/image";
import React from "react";

import {
  ProductBookingDetailsState,
  BookingFormState,
  TravellerState,
} from "@/types/app/booking";
import moment from "moment";
import { ProductDetailState } from "@/types/app/product";
import CustomDatePicker from "@/Common/CustomDatePicker";
import { BookingType } from "@/types/store/booking";

const TourBooking = ({
  product,
  bookingDetail,
  handleBookingDetails,
  updateNestedBookingDetails,
  updateBookingDetails,
}: {
  product: ProductDetailState;
  bookingDetail: BookingType;
  handleBookingDetails: (
    key: string,
    value: string | number | TravellerState[]
  ) => void;
  updateNestedBookingDetails: (
    type: keyof BookingType,
    key: string,
    value: string | boolean
  ) => void;
  updateBookingDetails: (
    type: keyof BookingType,
    value: string | boolean
  ) => void;
}) => {
  const { images, name, tours, bookingDetails } = product;
  const {
    adultCount,
    childCount,
    bookingDate,
    startTime,
    tourId,
    questions,
    otherTravellers,
  } = bookingDetail;
  const tour = tours.find((tour) => tour._id === tourId);

  const handleOtherTravellers = (index: number, key: string, val: string) => {
    let travellers = otherTravellers.map((value, i) => {
      if (i === index)
        return {
          ...value,
          [key]: val,
        };
      else return value;
    });
    handleBookingDetails("otherTravellers", travellers);
  };

  return (
    <form className="theme-form mega-form">
      <div className="mb-3">
        <label className="form-label-title fs-5 border-bottom border-5 border-success">
          Complete your booking
        </label>
      </div>
      <div className="mb-5 border rounded-2 p-3">
        <div className="d-flex justify-content-start">
          <Image
            src={typeof images[0] === "string" ? images[0] : ""}
            alt={typeof images[0] === "string" ? images[0] : "Image"}
            height={128}
            style={{ height: "auto", width: "27%", objectFit: "contain" }}
            width={128}
            className="rounded-2"
          />
          <div className="d-flex flex-column ms-3">
            <label className="fs-5">
              <strong>{name}</strong>
            </label>
            <div>
              <div className="form-label-title">Travellers</div>
              <div className="form-label-title">
                {adultCount !== 0 && adultCount + " Adult"}
                {childCount !== 0 ? (childCount !== 0 ? ", " : "") : ""}
                {childCount !== 0 && childCount + " child"}
              </div>
            </div>
            <div className="d-flex justify-content-start">
              <div>
                <div className="form-label-title">Departure</div>
                <div className="form-label-title">
                  {moment(bookingDate).format("ddd, MMMM D YYYY")} - {startTime}
                </div>
              </div>
              <div className="ms-5">
                <div className="form-label-title">Duration</div>
                <div className="form-label-title">{tour?.duration} Hours</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label-title">
            Where would you like the Meet and greet be?
          </label>
          <input
            className="form-control"
            type="text"
            value={
              tour?.isPrivate
                ? bookingDetail.meetingLocation
                : tour?.meetingLocation ?? ""
            }
            disabled={!tour?.isPrivate}
            onChange={(e) =>
              updateBookingDetails("meetingLocation", e.target.value)
            }
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label-title fs-5 border-bottom border-5 border-success">
          Booking Questions
        </label>
      </div>
      <div className="mb-5 border rounded-2 p-4">
        {bookingDetails.allergyQuestion && (
          <div className="mt-2">
            <label className="form-label-title">
              Do you have any allergies we should be aware of to help keep you
              comfortable during your trip?
            </label>
            <input
              className="form-control"
              type="text"
              value={questions.allergyQuestion}
              onChange={(e) =>
                updateNestedBookingDetails(
                  "questions",
                  "allergyQuestion",
                  e.target.value
                )
              }
            />
          </div>
        )}
        {bookingDetails.mobilityQuestion && (
          <div className="mt-2">
            <label className="form-label-title">
              Do you have any mobility or walking concerns so we can plan
              accordingly?
            </label>
            <input
              className="form-control"
              type="text"
              value={questions.mobilityQuestion}
              onChange={(e) =>
                updateNestedBookingDetails(
                  "questions",
                  "mobilityQuestion",
                  e.target.value
                )
              }
            />
          </div>
        )}
        {bookingDetails.medicalQuestion && (
          <div className="mt-2">
            <label className="form-label-title">
              Do you have any medical conditions we should consider when
              visiting higher altitudes to ensure your well-being?
            </label>
            <input
              className="form-control"
              type="text"
              value={questions.medicalQuestion}
              onChange={(e) =>
                updateNestedBookingDetails(
                  "questions",
                  "medicalQuestion",
                  e.target.value
                )
              }
            />
          </div>
        )}
        {otherTravellers.map((traveller, index) => (
          <div className="mt-4">
            <label className="form-label-title fs-5">
              Traveller {index + 2} (
              {Number(adultCount) - 1 >= index + 1 ? "Adult" : "Child"})
            </label>
            <div className="d-flex row">
              {bookingDetails.othersFullName && (
                <>
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      First name<span>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={traveller.firstname}
                      onChange={(e) =>
                        handleOtherTravellers(
                          index,
                          "firstname",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      Last name<span>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={traveller.lastname}
                      onChange={(e) =>
                        handleOtherTravellers(index, "lastname", e.target.value)
                      }
                    />
                  </div>
                </>
              )}
              <div className="d-flex row mt-3">
                <div className="col-sm-6">
                  <label className="form-label-title">
                    Date of birth<span>*</span>
                  </label>
                  <CustomDatePicker
                    date={
                      !traveller.birthDate
                        ? null
                        : moment(traveller.birthDate).toDate()
                    }
                    maxDate={moment(Date.now()).toDate()}
                    onChange={(e) =>
                      handleOtherTravellers(
                        index,
                        "birthDate",
                        moment(e).format("YYYY-MM-DD")
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default TourBooking;
