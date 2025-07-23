"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

import moment from "moment";
import { ProductDetailState } from "@/types/app/product";
import { BookingType } from "@/types/store/booking";
import { useSelector } from "react-redux";
import LoadingAuthButton from "@/Common/LoadingAuthButton";
import UseBotCheck from "@/hooks/UseBotCheck";
import ReCAPTCHA from "react-google-recaptcha";
import { PromoLoadingState } from "@/store/promo";

const GiftCard = ({
  product,
  booking,
  promo,
  setPromo,
  applyPromo,
  price,
}: {
  product: ProductDetailState;
  booking: BookingType;
  promo: string;
  setPromo: Dispatch<SetStateAction<string>>;
  applyPromo: () => void;
  price: {
    totalPrice: number;
    bookingPrice: number;
    adultPrice: number;
    childPrice: number;
    fee: number;
    travelFee: number;
    travelPercent: number;
  };
}) => {
  if (!product) return null;
  const loading = useSelector(PromoLoadingState);
  const { name } = product;
  const { adultCount, childCount, bookingDate, promoPercent } = booking;
  const {
    totalPrice,
    bookingPrice,
    adultPrice,
    childPrice,
    fee,
    travelFee,
    travelPercent,
  } = price;
  const [active, setActive] = useState(false);
  const convertTwoDecimal = (value: number) => Math.round(value * 100) / 100;
  return (
    <form className="theme-form mega-form border p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex flex-column ">
          <label className="form-label-title">{name}</label>
          <label>{moment(bookingDate).format("ddd D MMMM YYYY")}</label>
        </div>
        <div className="text-nowrap mt-1">
          <label>CHF {convertTwoDecimal(totalPrice)}</label>
        </div>
      </div>
      <div className="d-flex flex-column border-bottom pb-3">
        {active && (
          <>
            {adultCount !== 0 && (
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-label-title">Adult</div>
                <div className="form-label-title">
                  CHF {convertTwoDecimal(adultPrice * (1 - promoPercent))}
                </div>
              </div>
            )}
            {childCount !== 0 && (
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-label-title">Child</div>
                <div className="form-label-title">
                  CHF {convertTwoDecimal(childPrice * (1 - promoPercent))}
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
            <input
              type="text"
              className="form-control"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              disabled={promoPercent > 0}
            />
            <LoadingAuthButton
              {...{
                classes: "btn btn-primary ms-3 border rounded-3",
                types: "button",
                loading,
                disabled: loading || promoPercent > 0,
                title: "Apply",
                onFunc: applyPromo,
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex flex-column border-bottom py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="form-label-title">Items</div>
          <div className="form-label-title">
            CHF {convertTwoDecimal(bookingPrice)}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="form-label-title">Booking Fees</div>
          <div className="form-label-title">CHF {convertTwoDecimal(fee)}</div>
        </div>
        {travelPercent > 0 && (
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-label-title">Travel Agent Fees</div>
            <div className="form-label-title">
              CHF {convertTwoDecimal(travelFee)}
            </div>
          </div>
        )}
      </div>
      <div className="d-flex flex-column pt-3">
        <div className="d-flex justify-content-between align-items-center fs-6">
          <div className="form-label-title">
            <strong>Total (CHF)</strong>
          </div>
          <div className="form-label-title">
            <strong>CHF {convertTwoDecimal(totalPrice)}</strong>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GiftCard;
