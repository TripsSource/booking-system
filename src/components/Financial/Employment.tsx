"use client";
import React, { useState } from "react";

const Employment = () => {
  return (
    <>
      <form className="theme-form mega-form">
        <div className="mb-3">
          <div className="row mt-3 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Entry Date</label>
              <input type="date" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">Withdrawal Date</label>
              <input type="date" placeholder="" className="form-control" />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-8">
              <label className="form-label-title">Employment Contract</label>
              <input type="input" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Working Type</label>
              <select className="form-control">
                <option>Regular</option>
                <option>Irregular</option>
              </select>
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-4">
              <label className="form-label-title">Employment Level (%)</label>
              <select className="form-control">
                <option>0%</option>
                <option>10%</option>
                <option>20%</option>
                <option>30%</option>
                <option>40%</option>
                <option>50%</option>
                <option>60%</option>
                <option>70%</option>
                <option>80%</option>
                <option>90%</option>
                <option>100%</option>
              </select>
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Monthly Wages (CHF)</label>
              <input type="number" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Workplace</label>
              <select className="form-control">
                <option>Head Office</option>
              </select>
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Employee Number</label>
              <input type="input" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">
                Effective Vacation Days
              </label>
              <input type="input" placeholder="" className="form-control" />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-4">
              <label className="form-label-title">
                Vacation Days on 100% Workload
              </label>
              <input type="number" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Hours per Week</label>
              <input type="number" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Lessons per Week</label>
              <input type="number" placeholder="" className="form-control" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Employment;
