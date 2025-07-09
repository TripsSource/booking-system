import Image from "next/image";
import React, { useState } from "react";

import moment from "moment";
import { ProductDetailState } from "@/types/app/product";
import { BookingType } from "@/types/store/booking";

const BookingReview = ({
  product,
  booking,
  checkout,
  handleCheckout,
}: {
  product: ProductDetailState;
  booking: BookingType;
  checkout: boolean;
  handleCheckout: (event: boolean) => void;
}) => {
  const { images, name, startingLocations } = product;
  const { startingLocationId, bookingDate, startTime, childCount, adultCount } =
    booking.bookingDetails;
  const [termsPolicy, setTermsPolicy] = useState(false);
  return (
    <form className="theme-form mega-form">
      <div className="mb-3">
        <label className="form-label-title fs-5 border-bottom border-5 border-success">
          You're booking
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
                {childCount !== 0 ? (adultCount !== 0 ? ", " : "") : ""}
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
                <div className="form-label-title">
                  {
                    startingLocations.filter(
                      (location) => startingLocationId === location._id
                    )[0].durationHours
                  }{" "}
                  Hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label-title fs-5 border-bottom border-5 border-success">
          Secure Checkout
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={!checkout}
          onClick={() => handleCheckout(!checkout)}
        />
        <label className="form-label-title">
          <span onClick={() => handleCheckout(!checkout)}>I accept the </span>
          <span
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => setTermsPolicy(!termsPolicy)}
          >
            terms and conditions
          </span>
        </label>
        {termsPolicy && (
          <div className="border rounded-3 p-4 d-flex flex-column">
            <label className="mb-4">Terms and conditions</label>
            <label className="fs-4 mb-4">
              <strong>Booking & Cancellation Policy</strong>
            </label>
            <label className="fs-5 mb-4">
              <strong>RATES AND PRICES</strong>
            </label>
            <label className="mb-4">
              All rates and prices quoted are subject to availability. Prices
              are subject to change until full payment is received and
              voucher(s) are issued. Unless we advise otherwise, the quoted
              prices include all taxes and commissions per your contract.
            </label>
            <label className="fs-6 mb-4">
              <strong>Private Day Trips or Small Group Day Trips</strong>
            </label>
            <ul className="ms-4 mb-4" style={{ listStyleType: "square" }}>
              <li>
                At the time of booking, a deposit amount will be processed
              </li>
              <li>
                30 days before the departure, 50% of the total amount is to be
                settled
              </li>
              <li>
                7 days before the departure, the remaining amount is to be
                settled
              </li>
              <li>
                Cancellation & Refunds are based on the Cancellation Policy
                below
              </li>
              <li>
                If you wish to settle the total price differently, please get in
                touch with us at booking@tourismusgroup.com
              </li>
            </ul>
            <label className="fs-6 mb-4">
              <strong>Packaged Multi-Day Trips</strong>
            </label>
            <ul className="ms-4 mb-4" style={{ listStyleType: "square" }}>
              <li>
                At the time of booking, a deposit of 10% will be processed
              </li>
              <li>
                180 days before the departure, 30% of the total amount is to be
                settled
              </li>
              <li>
                120 days before the departure, 30% of the total amount is to be
                settled
              </li>
              <li>
                60 days before the departure the remaining 30% of the total
                amount is to be settled
              </li>
              <li>
                Cancellation & Refunds are based on the Cancellation Policy
                below
              </li>
              <li>
                If you wish to settle the total price differently, please get in
                touch with us at booking@tourismusgroup.com
              </li>
            </ul>
            <label className="fs-5 mb-4">
              <strong>RATES AND PRICES</strong>
            </label>
            <label className="fs-6 mb-4">
              <strong>Private Day Trips or Small Group Day Trips</strong>
            </label>
            <label className="mb-4">
              Please present your voucher 10 minutes before departure to the
              driver or guide at the departure point of your tour. The location
              of the departure point can be found in the tour description and is
              stated on your booking confirmation. We can not be held
              responsible for clients being late for their tours.
            </label>
            <label className="fs-6 mb-4">
              <strong>Packaged Multi-Day Trips</strong>
            </label>
            <label className="mb-4">
              Your Trip Manager will always have your details; please present
              your Passport when identifying yourself at the hotel. The location
              of the departure point can be found in the tour description and is
              stated on your booking confirmation. We can not be held
              responsible for clients being late for their tours.
            </label>
            <label className="fs-6 mb-4">
              <strong>Transportation Services</strong>
            </label>
            <label className="mb-4">
              Please present your voucher 10 minute before departure to the
              driver at the departure point. The location of the departure point
              has to be advised at the time of booking. We can not be held
              responsible for clients late for their transfer.
            </label>
            <label className="fs-6 mb-4">
              <strong>Availability</strong>
            </label>
            <label className="mb-4">
              The travel products and services sold through this site are
              subject to availability and can be withdrawn without notice.
              Private Day Trip, Small Group Day Trip, or Packed Multi-Day Trip
              is confirmed when full payment is received.
            </label>
            <label className="fs-6 mb-4">
              <strong>Important</strong>
            </label>
            <label className="mb-4">
              We request that you carefully check your voucher's dates and
              contact information and contact us immediately if these are
              incorrect.
            </label>
            <label className="fs-6 mb-4">
              <strong>CANCELLATION POLICY</strong>
            </label>
            <label className="fs-6 mb-4">
              <strong>Private Day Trips or Small Group Day Trips</strong>
            </label>
            <ul className="ms-4 mb-4" style={{ listStyleType: "square" }}>
              <li>
                Cancellation, more than 2 days in advance, is fully refundable
              </li>
              <li>
                Cancellation up to 1 day before departure date: 50% of the total
                amount plus administration fees that might be imposed{" "}
                <strong>(Except if unforeseen circumstances arise)</strong>
              </li>
              <li>
                Cancellation up to and less than 1 day before the departure date
                and time or no-show: 100% of the total amount{" "}
                <strong>(Except if unforeseen circumstances arise)</strong>
              </li>
            </ul>
            <label className="fs-6 mb-4">
              <strong>Packaged Multi-Day Trips</strong>
            </label>
            <ul className="ms-4 mb-4" style={{ listStyleType: "square" }}>
              <li>
                Cancellation, up to 30 days in advance, is fully refundable
              </li>
              <li>
                Cancellation up to 14 days before departure date: 50% of the
                total amount plus administration fees that might be imposed{" "}
                <strong>(Except if unforeseen circumstances arise)</strong>
              </li>
              <li>
                Cancellation up to and less than 7 days before the departure
                date and time or no-show: 100% of the total amount{" "}
                <strong>(Except if unforeseen circumstances arise)</strong>
              </li>
            </ul>
            <label className="fs-6 mb-4">
              <strong>Transportation Services</strong>
            </label>
            <ul className="ms-4 mb-4" style={{ listStyleType: "square" }}>
              <li>
                Cancellation, more than 2 days in advance, is fully refundable
              </li>
              <li>
                Cancellation up to 1 day before departure date: 50% of the total
                amount plus administration fees that might be imposed{" "}
                <strong>(Except if unforeseen circumstances arise)</strong>
              </li>
              <li>
                Cancellation up to and less than 1 day before the departure date
                and time or no-show: 100% of the total amount{" "}
                <strong>(Except if unforeseen circumstances arise)</strong>
              </li>
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};

export default BookingReview;
