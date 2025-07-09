"use client";
import React, { useState } from "react";

const BankDetail = () => {
  return (
    <>
      <form className="theme-form mega-form">
        <div className="mb-3">
          <div className="row mt-3 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">
                Name of the Institution
              </label>
              <input type="input" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">IBAN</label>
              <input type="input" placeholder="" className="form-control" />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-8">
              <label className="form-label-title">BIC</label>
              <input type="input" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Payment Group</label>
              <select className="form-control">
                <option>Salary Payments</option>
                <option>Supplier Payments</option>
                <option>Expense Payments</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BankDetail;
