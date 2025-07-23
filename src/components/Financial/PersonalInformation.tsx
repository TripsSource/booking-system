"use client";
import moment from "moment";
import React, { useState } from "react";

const PersonalInformation = () => {
  const childInfo = { name: "", birth: "", address: "" };
  const [personInfo, setPersonInfo] = useState({
    firstname: "",
    lastname: "",
    gender: 0,
    birth: "",
    nation: "",
    permit: "",
    settledform: "",
    maritalstatus: "",
    maritalform: "",
    language: "",
    retirement: "",
    email: "",
    phone: "",
    child: [childInfo],
  });

  const handlePersonInfo = (type: string, value: string | number) =>
    setPersonInfo({ ...personInfo, [type]: value });

  const handlePersonInfoChild = (index: number, type: string, value: string) =>
    setPersonInfo((pre) => ({
      ...pre,
      child: personInfo.child.map((child, i) => {
        if (i === index)
          return {
            ...child,
            [type]: value,
          };
        else return child;
      }),
    }));

  return (
    <>
      <form className="theme-form mega-form">
        <div className="mb-3">
          <div className="row mt-3 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Last Name</label>
              <input
                type="text"
                value={personInfo.lastname}
                onChange={(e) => handlePersonInfo("lastname", e.target.value)}
                placeholder="Last Name"
                className="form-control"
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">First Name</label>
              <input
                type="text"
                value={personInfo.firstname}
                onChange={(e) => handlePersonInfo("firstname", e.target.value)}
                placeholder="First Name"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-4">
              <label className="form-label-title">Gender</label>
              <select
                className="form-control"
                value={personInfo.gender}
                onChange={(e) => handlePersonInfo("gender", e.target.value)}
              >
                <option value={0}>Male</option>
                <option value={1}>Female</option>
              </select>
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={moment(personInfo.birth).format("YYYY-MM-DD")}
                onChange={(e) => handlePersonInfo("birth", e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              <label className="form-label-title">Nationality</label>
              <select
                className="form-control"
                value={moment(personInfo.nation).format()}
                onChange={(e) => handlePersonInfo("nation", e.target.value)}
              >
                <option>Switzerland</option>
                <option>USA</option>
              </select>
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Stay Permit Category</label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                value={personInfo.permit}
                onChange={(e) => handlePersonInfo("permit", e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">
                Settled Down Valid From
              </label>
              <input
                type="date"
                placeholder=""
                className="form-control"
                value={moment(personInfo.settledform).format("YYYY-MM-DD")}
                onChange={(e) =>
                  handlePersonInfo("settledform", e.target.value)
                }
              />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Marital Status</label>
              <select
                className="form-control"
                value={personInfo.permit}
                onChange={(e) => handlePersonInfo("permit", e.target.value)}
              >
                <option value="single">Single</option>
                <option value="separated">Separated</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">
                Marital Status Valid From
              </label>
              <input
                type="date"
                placeholder=""
                className="form-control"
                value={moment(personInfo.maritalform).format("YYYY-MM-DD")}
                onChange={(e) =>
                  handlePersonInfo("maritalform", e.target.value)
                }
              />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Language</label>
              <select
                className="form-control"
                value={personInfo.language}
                onChange={(e) => handlePersonInfo("language", e.target.value)}
              >
                <option value="german">German</option>
                <option value="english">English</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">
                Retirement Insurance Number
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                value={personInfo.retirement}
                onChange={(e) => handlePersonInfo("retirement", e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-1 g-3">
            <div className="col-sm-6">
              <label className="form-label-title">Email</label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                value={personInfo.email}
                onChange={(e) => handlePersonInfo("email", e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label-title">Phone Number</label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                value={personInfo.phone}
                onChange={(e) => handlePersonInfo("phone", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label-title mt-3">
            <strong>Children</strong>
          </label>
          <hr className="hr" />
          {personInfo.child.map((child, index) => (
            <div className="row mt-1 g-3" key={index}>
              <div className="col-sm-4">
                <label className="form-label-title">Child Full Name</label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  value={child.name}
                  onChange={(e) =>
                    handlePersonInfoChild(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label className="form-label-title">Child Date of Birth</label>
                <input
                  type="date"
                  placeholder=""
                  className="form-control"
                  value={moment(child.birth).format("YYYY-MM-DD")}
                  onChange={(e) =>
                    handlePersonInfoChild(index, "birth", e.target.value)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label className="form-label-title">Child Address</label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  value={child.address}
                  onChange={(e) =>
                    handlePersonInfoChild(index, "address", e.target.value)
                  }
                />
              </div>
              <div className="col-sm-12">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setPersonInfo({
                      ...personInfo,
                      child: personInfo.child.filter((_, i) => index !== i),
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
            setPersonInfo({
              ...personInfo,
              child: [...personInfo.child, childInfo],
            });
          }}
        >
          Add Child
        </button>
      </form>
    </>
  );
};

export default PersonalInformation;
