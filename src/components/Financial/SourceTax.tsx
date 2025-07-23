"use client";
import React, { useState } from "react";

const SourceTax = () => {
  const [taxOption, setTaxOption] = useState("Tariff");

  const handleTaxOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaxOption(event.target.value); // Update state when radio button changes
  };
  return (
    <>
      <form className="theme-form mega-form">
        <div className="mb-3">
          <div className="row mt-3 g-3">
            <label className="form-label-title">Tax Type</label>
            <div className="d-flex justify-content-start">
              <label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="TaxOption"
                  value="Tariff"
                  checked={taxOption === "Tariff"}
                  onChange={handleTaxOptionChange}
                />{" "}
                Tariff Code
              </label>
              <label className="px-4">
                <input
                  type="radio"
                  className="form-check-input"
                  name="TaxOption"
                  value="Predefined"
                  checked={taxOption === "Predefined"}
                  onChange={handleTaxOptionChange}
                />{" "}
                Predefined
              </label>
              <label className="px-4">
                <input
                  type="radio"
                  className="form-check-input"
                  name="TaxOption"
                  value="Open"
                  checked={taxOption === "Open"}
                  onChange={handleTaxOptionChange}
                />{" "}
                Open
              </label>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-12">
              {taxOption === "Tariff" && (
                <>
                  <label className="form-label-title">Tariff Code</label>
                  <input type="text" className="form-control" />
                </>
              )}
              {taxOption === "Predefined" && (
                <>
                  <label className="form-label-title">Predefined Tax</label>
                  <select className="form-control">
                    <option>0%</option>
                  </select>
                </>
              )}
              {taxOption === "Open" && (
                <>
                  <label className="form-label-title">Open Tax</label>
                  <input type="text" className="form-control" />
                </>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-12">
              <label className="form-label-title">Religion</label>
              <select className="form-control">
                <option>Christian</option>
                <option>Muslim</option>
                <option>Atheist</option>
              </select>
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-4">
              <label className="form-label-title">Type of Employment</label>
              <select className="form-control">
                <option>Type of Employment</option>
              </select>
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Concubinage</label>
              <select className="form-control">
                <option>Concubinage</option>
              </select>
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Further Employment</label>
              <select className="form-control">
                <option>Further Employment</option>
              </select>
            </div>
          </div>
          <div className="row mt-1 g-3">
            <label className="form-label-title">
              <input
                type="checkbox"
                className="form-check-input"
                defaultChecked
              />{" "}
              Pension
            </label>
          </div>
          <div className="row mt-1 g-3">
            <label className="form-label-title">
              <input
                type="checkbox"
                className="form-check-input"
                defaultChecked
              />{" "}
              Place of Residence Abroad
            </label>
          </div>
          <div className="row mt-1 g-3">
            <label className="form-label-title">Tax Type</label>
            <div className="d-flex justify-content-start">
              <label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="TaxOption"
                  defaultChecked
                />{" "}
                Resident (weekly)
              </label>
              <label className="px-4">
                <input
                  type="radio"
                  className="form-check-input"
                  name="TaxOption"
                />{" "}
                Resident (one day)
              </label>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-12">
              <label className="form-label-title">
                Working Days in Switzerland per Month
              </label>
              <select className="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-8">
              <label className="form-label-title">
                Street and House Number
              </label>
              <input
                type="text"
                placeholder="Input street and house number"
                className="form-control"
              />
            </div>
            <div className="col-sm-2">
              <label className="form-label-title">Zip Code</label>
              <input
                type="text"
                placeholder="Input zipcode"
                className="form-control"
              />
            </div>
            <div className="col-sm-2">
              <label className="form-label-title">City</label>
              <input
                type="text"
                placeholder="Input city"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Canton</label>
              <select className="form-control">
                <option>Select Canton</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">Municipality Number</label>
              <input
                type="text"
                placeholder="Input municipality number"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Place of Birth</label>
              <input
                type="text"
                placeholder="Input place of birth"
                className="form-control"
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">
                Tax ID at the Country of Origin
              </label>
              <input
                type="text"
                placeholder="Input Tax ID"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-12">
              <label className="form-label-title">
                Cross Border Commuter Since
              </label>
              <input type="date" placeholder="" className="form-control" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SourceTax;
