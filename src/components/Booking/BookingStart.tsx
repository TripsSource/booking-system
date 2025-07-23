"use client";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FaBus, FaCircleInfo } from "react-icons/fa6";
import { FiCheckCircle, FiRefreshCcw, FiXCircle } from "react-icons/fi";
import { Check } from "react-feather";
import { FaClock } from "react-icons/fa6";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ProductDetailState } from "@/types/app/product";
import { BookingType } from "@/types/store/booking";
import { marginState } from "@/store/financial";

const RoundedButton = ({
  title,
  size,
  func,
  classes,
}: {
  title: string;
  size: string;
  func: () => void;
  classes: string;
}) => (
  <button
    type="button"
    className={classes}
    style={{ width: `${size}px`, height: `${size}px`, padding: 0 }}
    onClick={func}
  >
    {title}
  </button>
);

const BookingStart = ({
  product,
  booking,
  onStepClick,
  handleBookingDetails,
}: {
  product: ProductDetailState;
  booking: BookingType;
  onStepClick: (index: number) => void;
  handleBookingDetails: (param: string, value: string) => void;
}) => {
  const { name, inclusions, exclusions, tours, startDate, endDate, blackOuts } =
    product;
  const {
    tourId,
    adultCount,
    childCount,
    infantCount,
    bookingDate,
    startTime,
  } = booking;

  const tour = tours?.find((tour) => tour._id === tourId);
  const margins = useSelector(marginState);
  const calculateMargin = (duration: number) => {
    if (duration >= 1 && duration < 5) {
      return parseFloat(margins.shortMarkup);
    } else if (duration >= 5 && duration < 10) {
      return parseFloat(margins.mediumMarkup);
    } else {
      return parseFloat(margins.longMarkup);
    }
  };

  const adultPrice =
    (Number(tour?.revenue.totalBulkCost ?? 0) +
      Number(tour?.revenue.totalIndividualCost ?? 0)) *
    calculateMargin(Number(tour?.duration));

  const childPrice =
    Number(tour?.revenue.childrenCost ?? 0) *
    calculateMargin(Number(tour?.duration));

  const totalPrice = (
    Number(adultCount) * adultPrice +
    Number(childCount) * childPrice
  ).toFixed(2);

  const generatePriceEvents = () => {
    // Ensure startDate and endDate are correctly formatted
    const start = moment(startDate || Date.now()).format("YYYY-MM-DD");
    const end = moment(endDate || moment().add(10, "years")).format(
      "YYYY-MM-DD"
    );
    // Ensure blackOuts are defined
    const blackDays = blackOuts || [];
    // Calculate the total number of days between start and end
    const totalDays = moment(end).diff(moment(start), "days") + 1;
    // Get tomorrow's date and set it to start of the day (midnight)
    const tomorrow = moment()
      .add(1, "days")
      .startOf("day")
      .format("YYYY-MM-DD");
    // Generate events for the days between start and end
    const events = Array.from({ length: totalDays }).map((_, index) => {
      const date = moment(start)
        .clone()
        .add(index, "days")
        .format("YYYY-MM-DD");
      // Check if the date is in blackDays (exclude blackout dates)
      if (
        blackDays.some((blackout) => {
          const blackoutStart = moment(blackout.startDate).startOf("day"); // Start of blackout day
          const blackoutEnd = moment(blackout.endDate).endOf("day"); // End of blackout day
          return moment(date).isBetween(blackoutStart, blackoutEnd, null, "[]"); // Check if within blackout range (inclusive)
        })
      ) {
        return undefined; // Exclude this date from events
      }

      // Exclude dates before tomorrow (exclude the 19th if today is 20th)
      if (moment(date).isBefore(tomorrow, "day")) {
        return undefined;
      }

      return {
        title: `CHF(₣) ${totalPrice}`,
        date,
        className: "price-event",
      };
    });

    // Filter out undefined events
    return events.filter((event) => event !== undefined);
  };

  const showDayContent = (args: any) => {
    const dateFormatted = moment(args.date).format("YYYY-MM-DD");
    const tomorrow = moment()
      .add(1, "days")
      .startOf("day")
      .format("YYYY-MM-DD");

    // Check if it's a past date
    const isPastDate = moment(dateFormatted).isBefore(tomorrow, "day");

    // Check if the date is within any blackout date range
    const isBlackoutDate = blackOuts?.some((blackout) => {
      const blackoutStart = moment(blackout.startDate).startOf("day");
      const blackoutEnd = moment(blackout.endDate).endOf("day");
      return moment(dateFormatted).isBetween(
        blackoutStart,
        blackoutEnd,
        null,
        "[]"
      ); // Inclusive of start and end
    });

    return (
      <div
        className={`d-flex justify-content-center align-items-center ps-5 pe-4 p-2 ${
          isPastDate || isBlackoutDate ? "disabled-date" : ""
        }`}
        onClick={() => {
          if (!isPastDate && !isBlackoutDate) {
            handleBookingDetails("bookingDate", dateFormatted);
          }
        }}
        style={{
          cursor: isPastDate || isBlackoutDate ? "not-allowed" : "pointer",
          opacity: isPastDate || isBlackoutDate ? 0.5 : 1,
        }}
      >
        {moment(args.date).format("DD")}
      </div>
    );
  };

  return (
    <div className="mx-5 px-5">
      <form className="theme-form mega-form mx-5 px-5">
        <label className="form-label-title fs-4">{name}</label>
        <div className="mb-4">
          <label className="form-label-title fs-5 border-bottom border-5 border-success">
            Starting Location
          </label>
          <select
            className="form-control js-example-basic-single col-sm-12"
            value={booking.tourId}
            onChange={(e) => handleBookingDetails("tourId", e.target.value)}
          >
            {product !== undefined &&
              tours?.map((selectTour, index) => (
                <option
                  key={index}
                  value={selectTour._id}
                  className="form-control"
                >
                  {selectTour.destinationTitle} - ₣
                  {(
                    (Number(selectTour?.revenue.totalBulkCost ?? 0) +
                      Number(selectTour?.revenue.totalIndividualCost ?? 0)) *
                    calculateMargin(Number(selectTour?.duration))
                  ).toLocaleString()}{" "}
                  ({selectTour.isPrivate ? "Private Tour" : "Small Group Tour"}-
                  {selectTour.withDriver ? "With Driver" : "No Driver"})
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="form-label-title fs-5 border-bottom border-5 border-success">
            Participants
          </label>
          <div className="mb-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <label className="form-label-title mt-1">Adult</label>
                <label>Age 16+</label>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <RoundedButton
                  title="-"
                  classes="btn btn-outline-past rounded-circle fs-4 mx-2"
                  size="40"
                  func={() => {
                    handleBookingDetails(
                      "adultCount",
                      `${Math.min(
                        Number(tour?.members) -
                          Number(childCount) -
                          Number(infantCount),
                        Math.max(+adultCount - 1, 1)
                      )}`
                    );
                  }}
                />
                <div className="fs-5">
                  <label className="mt-2">{adultCount}</label>
                </div>
                <RoundedButton
                  title="+"
                  classes="btn btn-outline-past rounded-circle fs-4 mx-2"
                  size="40"
                  func={() => {
                    handleBookingDetails(
                      "adultCount",
                      `${Math.min(
                        Number(tour?.members) -
                          Number(childCount) -
                          Number(infantCount),
                        Math.max(+adultCount + 1, 0)
                      )}`
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <label className="form-label-title mt-1">Child</label>
                <label>Age 6 - 15</label>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <RoundedButton
                  title="-"
                  classes="btn btn-outline-past rounded-circle fs-4 mx-2"
                  size="40"
                  func={() => {
                    handleBookingDetails(
                      "childCount",
                      `${Math.min(
                        Number(tour?.members) -
                          Number(adultCount) -
                          Number(infantCount),
                        Math.max(+childCount - 1, 0)
                      )}`
                    );
                  }}
                />
                <div className="fs-5">
                  <label className="mt-2">{childCount}</label>
                </div>
                <RoundedButton
                  title="+"
                  classes="btn btn-outline-past rounded-circle fs-4 mx-2"
                  size="40"
                  func={() => {
                    handleBookingDetails(
                      "childCount",
                      `${Math.min(
                        Number(tour?.members) -
                          Number(adultCount) -
                          Number(infantCount),
                        Math.max(+childCount + 1, 0)
                      )}`
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <label className="form-label-title mt-1">Infant</label>
                <label>Age 0 - 5</label>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <RoundedButton
                  title="-"
                  classes="btn btn-outline-past rounded-circle fs-4 mx-2"
                  size="40"
                  func={() => {
                    handleBookingDetails(
                      "infantCount",
                      `${Math.min(
                        Number(tour?.members) -
                          Number(adultCount) -
                          Number(childCount),
                        Math.max(+infantCount - 1, 0)
                      )}`
                    );
                  }}
                />
                <div className="fs-5">
                  <label className="mt-2">{infantCount}</label>
                </div>
                <RoundedButton
                  title="+"
                  classes="btn btn-outline-past rounded-circle fs-4 mx-2"
                  size="40"
                  func={() => {
                    handleBookingDetails(
                      "infantCount",
                      `${Math.min(
                        Number(tour?.members) -
                          Number(adultCount) -
                          Number(childCount),
                        Math.max(+infantCount + 1, 0)
                      )}`
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {bookingDate === "" && (
          <div className="mb-4">
            <label className="form-label-title fs-5 border-bottom border-5 border-success">
              Choose a date
            </label>
            <div style={{ width: "100%", maxWidth: "100%", minWidth: "100%" }}>
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                initialDate={moment(Date.now()).format("YYYY-MM-DD")}
                fixedWeekCount={false}
                events={generatePriceEvents()}
                headerToolbar={{
                  left: "prev",
                  center: "title",
                  right: "next",
                }}
                height="auto"
                eventColor="#28a745"
                eventTextColor="#fff"
                eventBorderColor="#1e7e34"
                aspectRatio={1.5}
                eventClick={(info) => {
                  handleBookingDetails(
                    "bookingDate",
                    moment(info.event.start).format("YYYY-MM-DD")
                  );
                }}
                dayCellContent={(args) => showDayContent(args)}
                contentHeight="auto"
              />
            </div>
          </div>
        )}
        {bookingDate !== "" && (
          <div className="mb-4">
            <label
              className="form-label-title fs-5 border-bottom border-5 border-success"
              style={{ cursor: "pointer" }}
              onClick={() => handleBookingDetails("bookingDate", "")}
            >
              <span className="text-success fs-5">{"< "}</span>
              {moment(new Date(bookingDate)).format("D MMMM YYYY")}
            </label>
            <div className="d-flex align-items-center mt-3">
              <FaClock color={"#198754"} size={20} className="me-2" />
              <label className="mt-2">Choose a time</label>
            </div>
            {tour?.times.map((time, index) => (
              <button
                type="button"
                className={`btn mt-2 mx-1 ${
                  startTime === time ? "btn-past" : "btn-outline-past"
                }`}
                key={index}
                onClick={() => handleBookingDetails("startTime", time)}
              >
                <div className="d-flex align-items-center">
                  <FaClock size={20} className="me-2" />
                  {time}
                </div>
              </button>
            ))}

            <div
              className="mt-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleBookingDetails("bookingDate", "")}
            >
              <label>{"< Back to calendar"}</label>
            </div>
            <div className="d-flex flex-column my-5">
              <div
                className="d-flex justify-content-end text-end"
                style={{ margin: "-15px 25px", zIndex: 1 }}
              >
                <div className="bg-past rounded px-2 py-1 d-flex align-items-center">
                  Selected <Check size={15} className="ms-1" />
                </div>
              </div>
              <div className="border border-success rounded pt-4 px-3">
                <div className="d-flex justify-content-between border-bottom pb-3">
                  <div>
                    <strong>
                      <label>Standard rate</label>
                    </strong>
                  </div>
                  <div>CHF(₣) {totalPrice}</div>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <FaBus color={"#198754"} size={20} className="me-2" />
                  <label>Pick-up available (included in price)</label>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <FaCircleInfo color={"#198754"} size={20} className="me-2" />
                  <label>Can be booked for up to 8 per booking</label>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <FiRefreshCcw color={"#198754"} size={20} className="me-2" />
                  <label>Cancellation policy</label>
                </div>
                <div className="d-flex align-items-center mt-1 ms-4">
                  <label>
                    - Fully refundable until{" "}
                    {moment(new Date(bookingDate)).format("D MMMM YYYY")} at{" "}
                    {startTime}
                  </label>
                </div>
                <div className="mt-2">
                  <div className="d-flex align-content-center">
                    <FiCheckCircle
                      color={"#198754"}
                      size={20}
                      className="me-2"
                    />
                    <label>Inclusions</label>
                  </div>
                  {inclusions?.length &&
                    inclusions?.map((inclusion) => (
                      <div className="d-flex align-items-center ms-4">
                        <label>- {inclusion}</label>
                      </div>
                    ))}
                </div>
                <div>
                  <div className="d-flex align-content-center">
                    <FiXCircle color={"#198754"} size={20} className="me-2" />
                    <label>Exclusions</label>
                  </div>
                  {exclusions?.length &&
                    exclusions?.map((exclusion) => (
                      <div className="d-flex align-items-center ms-4">
                        <label>- {exclusion}</label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mb-4">
          <label className="form-label-title fs-5 border-bottom border-5 border-success">
            Booking Summary
          </label>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="fs-5 w-50 text-success">
                  {product.destinationTitle} Tour - {name}
                </div>
                <div>
                  <div className="fs-5 text-end text-success">
                    {startTime !== "" && startTime}
                  </div>
                  <div className="fs-6 text-success">
                    {bookingDate !== "" &&
                      moment(new Date(bookingDate)).format("ddd D MMMM YYYY")}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  {adultCount > 0 && (
                    <div className="w-50 text-nowrap">
                      <label>
                        Adult:{adultCount} x CHF(₣){" "}
                        {adultPrice.toLocaleString()}
                      </label>
                    </div>
                  )}
                  {childCount > 0 && (
                    <div className="w-50 text-nowrap">
                      <label>
                        Child:{childCount} x CHF(₣){" "}
                        {childPrice.toLocaleString()}
                      </label>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-end">
                    <label>Total:</label>
                  </div>
                  <div className="fs-6">
                    <label>CHF(₣) {totalPrice}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-past w-100 mt-3"
          onClick={() => onStepClick(0)}
          disabled={
            (adultCount === 0 && childCount === 0) || bookingDate === ""
          }
        >
          Checkout
        </button>
      </form>
    </div>
  );
};

export default BookingStart;
