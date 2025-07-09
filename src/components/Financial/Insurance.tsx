"use client";
import React, { useState } from "react";

const Insurance = () => {
  return (
    <>
      <form className="theme-form mega-form">
        <div className="mb-3">
          <div className="row mt-3 g-3">
            <label className="form-label-title">
              <input
                type="checkbox"
                className="form-check-input"
                defaultChecked
              />{" "}
              AHV Exempt
            </label>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-8">
              <label className="form-label-title">
                AHV Contributions at Retirement Age
              </label>
              <select className="form-control">
                <option>Select Contribution</option>
              </select>
            </div>
          </div>
          <div className="mt-1 g-3">
            <label className="form-label-title">AXA</label>
            <div className="d-flex justify-content-start">
              <label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="axaOption"
                  defaultChecked
                />{" "}
                UVG Gesellschafter
              </label>
              <label className="px-4">
                <input
                  type="radio"
                  className="form-check-input"
                  name="axaOption"
                />{" "}
                UVG Personal
              </label>
            </div>
          </div>
          <div className="mt-1 g-3">
            <label className="form-label-title">Occupational Accident</label>
            <div className="d-flex justify-content-start">
              <label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="OccupationalOption"
                />{" "}
                No contributions
              </label>
              <label className="px-4">
                <input
                  type="radio"
                  className="form-check-input"
                  name="OccupationalOption"
                  defaultChecked
                />{" "}
                Employer
              </label>
            </div>
          </div>
          <div className="mt-1 g-3">
            <label className="form-label-title">
              Non-Occupational Accident
            </label>
            <div className="d-flex justify-content-start">
              <label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="NonOccupationalOption"
                />{" "}
                No contributions
              </label>
              <label className="px-4">
                <input
                  type="radio"
                  className="form-check-input"
                  name="NonOccupationalOption"
                />{" "}
                Employer 100%
              </label>
              <label className="px-4">
                <input
                  type="radio"
                  className="form-check-input"
                  name="NonOccupationalOption"
                  defaultChecked
                />{" "}
                Employer 50%/100%
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Insurance;
