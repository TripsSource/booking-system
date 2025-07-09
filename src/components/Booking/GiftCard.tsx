"use client";
import React, { useState } from "react";

import moment from "moment";
import { ProductDetailState } from "@/types/app/product";
import { BookingType } from "@/types/store/booking";
import { useSelector } from "react-redux";
import { selectedAgent } from "@/store/travelAgent";
import { userState } from "@/store/auth";
import { marginState } from "@/store/financial";

const GiftCard = ({
  product,
  booking,
}: {
  product: ProductDetailState;
  booking: BookingType;
}) => {
  if (!product) return null;
  const { name, revenues, startingLocations } = product;
  const { adultCount, childCount, bookingDate, startingLocationId } =
    booking.bookingDetails;
  const Cost = revenues?.find(
    (item) => item.startingLocationId === startingLocationId
  );
  const [active, setActive] = useState(false);

  const feePercent =
    useSelector(userState).role === "Travel Agent"
      ? useSelector(selectedAgent).travelAgentProfile?.percent ?? 5
      : 0;

  const margins = useSelector(marginState);
  const calculateMargin = (startingLocation: string) => {
    if (!Array.isArray(startingLocations)) {
      return 0;
    }
    const duration = Number(
      startingLocations.find((location) => location._id === startingLocation)
        ?.durationHours ?? 0
    );
    if (duration >= 1 && duration < 5) {
      return parseFloat(margins.shortMarkup);
    } else if (duration >= 5 && duration < 10) {
      return parseFloat(margins.mediumMarkup);
    } else {
      return parseFloat(margins.longMarkup);
    }
  };

  const adultPrice =
    Number(adultCount) *
    ((Cost?.totalBulkCost ?? 0) + (Cost?.totalIndividualCost ?? 0));

  const childPrice = Number(childCount) * Number(Cost?.childrenCost);

  const totalPrice =
    (adultPrice + childPrice) * calculateMargin(Cost?.startingLocationId ?? "");

  const fee = totalPrice * (feePercent / 100);

  return (
    <form className="theme-form mega-form border p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex flex-column ">
          <label className="form-label-title">{name}</label>
          <label>{moment(bookingDate).format("ddd D MMMM YYYY")}</label>
        </div>
        <div className="text-nowrap mt-1">
          <label>CHF {totalPrice.toFixed(2)}</label>
        </div>
      </div>
      <div className="d-flex flex-column border-bottom pb-3">
        {active && (
          <>
            {adultCount !== 0 && (
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-label-title">Adult</div>
                <div className="form-label-title">
                  CHF{" "}
                  {(
                    adultPrice * calculateMargin(Cost?.startingLocationId ?? "")
                  ).toFixed(2)}
                </div>
              </div>
            )}
            {childCount !== 0 && (
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-label-title">Child</div>
                <div className="form-label-title">
                  CHF{" "}
                  {(
                    childPrice * calculateMargin(Cost?.startingLocationId ?? "")
                  ).toFixed(2)}
                </div>
              </div>
            )}
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-label-title">Pick-up</div>
              <div className="form-label-title">Included</div>
            </div>
          </>
        )}
        <span
          style={{ cursor: "pointer" }}
          className="text-danger"
          onClick={() => setActive(!active)}
        >
          Show {active ? "less" : "more"}
        </span>
      </div>
      <div className="d-flex flex-column border-bottom pb-3">
        <div className="my-2">
          <label className="form-label-title">Promo Code</label>
          <div className="d-flex">
            <input type="text" name="promocode" className="form-control" />
            <button
              type="button"
              className="btn btn-light ms-3 border rounded-3"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column border-bottom py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="form-label-title">Items</div>
          <div className="form-label-title">CHF {totalPrice.toFixed(2)}</div>
        </div>
        {/* <div className="d-flex justify-content-between align-items-center">
          <div className="form-label-title">Booking Fees</div>
          <div className="form-label-title">CHF {fee.toFixed(2)}</div>
        </div> */}
      </div>
      <div className="d-flex flex-column pt-3">
        <div className="d-flex justify-content-between align-items-center fs-6">
          <div className="form-label-title">
            <strong>Total (CHF)</strong>
          </div>
          <div className="form-label-title">
            <strong>CHF {(totalPrice + fee).toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GiftCard;
