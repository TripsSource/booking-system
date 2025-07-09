"use client";
import React, { useState } from "react";

const PersonalInformation = () => {
  const childInfo = { name: "", birth: "", address: "" };
  const [personal, setPersonal] = useState({
    child: [childInfo],
  });
  return (
    <>
      <form className="theme-form mega-form">
        <div className="mb-3">
          <div className="row mt-3 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Last Name</label>
              <input
                type="input"
                placeholder="Input your Last Name"
                className="form-control"
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">First Name</label>
              <input
                type="input"
                placeholder="Input your First Name"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-4">
              <label className="form-label-title">Gender</label>
              <select className="form-control">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Date of Birth</label>
              <input
                type="date"
                placeholder="Input your First Name"
                className="form-control"
              />
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Nationality</label>
              <select className="form-control">
                <option>Switzerland</option>
                <option>USA</option>
              </select>
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Stay Permit Category</label>
              <input type="input" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">
                Settled Down Valid From
              </label>
              <input type="date" placeholder="" className="form-control" />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Language</label>
              <select className="form-control">
                <option>German</option>
                <option>English</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">Marital Status</label>
              <select className="form-control">
                <option>Single</option>
                <option>Separated</option>
                <option>Married</option>
                <option>Widowed</option>
              </select>
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">
                Marital Status Valid From
              </label>
              <input type="date" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">
                Retirement Insurance Number
              </label>
              <input type="input" placeholder="" className="form-control" />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Email</label>
              <input type="input" placeholder="" className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">Phone Number</label>
              <input type="input" placeholder="" className="form-control" />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label-title mt-3">
            <strong>Children</strong>
          </label>
          <hr className="hr" />
          {personal.child.map((child, index) => (
            <div className="row mt-1 g-3" key={index}>
              <div className="col-sm-4">
                <label className="form-label-title">Child Full Name</label>
                <input type="input" placeholder="" className="form-control" />
              </div>
              <div className="col-sm-4">
                <label className="form-label-title">Child Date of Birth</label>
                <input type="date" placeholder="" className="form-control" />
              </div>
              <div className="col-sm-4">
                <label className="form-label-title">Child Address</label>
                <input type="input" placeholder="" className="form-control" />
              </div>
              <div className="col-sm-12">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setPersonal({
                      child: personal.child.filter((_, i) => index !== i),
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            setPersonal({ child: [...personal.child, childInfo] });
          }}
        >
          Add Child
        </button>
      </form>
    </>
  );
};

export default PersonalInformation;
