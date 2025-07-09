"use client";
import React from "react";
import moment from "moment";
import CustomDatePicker from "@/Common/CustomDatePicker";
import { PromoCodeState } from "@/types/app/promo";

const CreatePromo = ({
  promo,
  handlePromo,
  savePromoCode,
}: {
  promo: PromoCodeState;
  handlePromo: (type: string, item: string | boolean) => void;
  savePromoCode: () => void;
}) => {
  const { code, percent, maxUses, expiresAt, noExpiry } = promo;

  const buttonDisabled = () => {
    if (code === "") return true;
    if (percent < 1 || percent > 100) return true;
    if (maxUses === "") return true;
    if (!noExpiry && expiresAt === "") return true;
    return false;
  };
  return (
    <div className="mx-5">
      <form className="theme-form mega-form">
        <label className="form-label-title">Code</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter code"
          value={code}
          onChange={(e) => handlePromo("code", e.target.value)}
        />
        <label className="form-label-title mt-2">Discount (%)</label>
        <input
          type="number"
          min={1}
          max={100}
          className="form-control"
          value={percent}
          onChange={(e) => handlePromo("percent", e.target.value)}
          placeholder="Enter code"
        />
        <label className="form-label-title mt-2">Limit</label>
        <br />
        {["1", "2", "3", "4", "5", "Infinity"].map((item, index) => (
          <label key={index} className="form-label-title me-2">
            <input
              role="switch"
              id={item}
              checked={maxUses === item ? true : false}
              type="checkbox"
              className="form-check-input me-1"
              onChange={() => handlePromo("maxUses", item)}
            />
            {item}
          </label>
        ))}
        <br />
        <label className="form-label-title">Expiry Date</label>
        <div className="d-flex justify-content-between align-items-center">
          <CustomDatePicker
            classes="form-control"
            date={expiresAt === "" ? null : moment(expiresAt).toDate()}
            onChange={(date) =>
              handlePromo(
                "expiresAt",
                date ? moment(date).format("YYYY-MM-DD") : ""
              )
            }
            minDate={moment().toDate()}
            disabled={noExpiry}
          />
          <label className="form-label-title d-flex justify-content-between mt-1">
            <input
              role="switch"
              checked={noExpiry}
              type="checkbox"
              className="form-check-input me-1"
              onChange={(e) => handlePromo("noExpiry", e.target.checked)}
            />
            NoExpiry
          </label>
        </div>
      </form>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-primary mt-3"
          disabled={buttonDisabled()}
          onClick={savePromoCode}
        >
          Create Promo Code
        </button>
      </div>
    </div>
  );
};

export default CreatePromo;
