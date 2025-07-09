"use client";
import dynamic from "next/dynamic";

const AddHotelsCardBody = () => {
  const MultipleSelectBox = dynamic(
    () => import("@/Common/MultipleSelectBox"),
    { ssr: false }
  );
  return (
    <div className="card-body">
      <form className="theme-form mega-form">
        <div className="mb-3">
          <label className="form-label-title">Hotel Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Hotal Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hotel-category" className="form-label-title ">
            Hotel Category
          </label>
          <select className="form-control js-example-basic-single col-sm-12">
            <option value="FA">Family Hotels and Resorts</option>
            <option value="BE">Beach and Vacation Resorts</option>
            <option value="HO">Holiday Condo Resorts</option>
            <option value="BO">Boutique Hotel Properties</option>
            <option value="LU">Luxury and High-End Hotels</option>
            <option value="HO"> Hotels on Private Islands</option>
            <option value="HO">Hotels That Float</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label-title">Facility</label>
          {/* <MultipleSelectBox /> */}
        </div>
        <div className="mb-3">
          <label className="form-label-title  ">Address</label>
          <input type="text" placeholder="Address" className="form-control" />
        </div>
        <div className="row g-3">
          <div className="col-sm-6">
            <select className="select form-control">
              <option>Country</option>
              <option value={2}> Austria</option>
              <option value={3}>Azerbaijan</option>
              <option value={4}>Bahrain </option>
            </select>
          </div>
          <div className="col-sm-6">
            <select className="select form-control">
              <option>State</option>
              <option value={2}> Ottawa</option>
              <option value={3}>Praia</option>
              <option value={4}>Yaounde</option>
            </select>
          </div>
          <div className="col-sm-6">
            <select className="select form-control">
              <option>City</option>
              <option value={2}>Vienna</option>
              <option value={3}> Nassau</option>
              <option value={4}> Manama</option>
            </select>
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              placeholder="Zip"
              id="form3Example3"
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label-title mt-4">Contact Number</label>
          <input
            className="form-control"
            type="Number"
            placeholder="Contact Number"
          />
        </div>
        <div className="mb-3">
          <label className="form-label-title "> Email Address</label>
          <input
            className="form-control"
            type="email"
            placeholder=" Email address"
          />
        </div>
      </form>
    </div>
  );
};

export default AddHotelsCardBody;
