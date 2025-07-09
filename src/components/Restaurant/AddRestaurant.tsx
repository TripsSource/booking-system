import DropZoneCommon from "@/Common/DropZoneCommon";
import { addRestaurantData } from "@/data/Restaurant";
import DatePicker from "../Hotel/common/DatePicker";

const AddRestaurant = () => {
  return (
    <form className="theme-form mega-form">
      <div className="mb-3">
        <label className="form-label-title">Restaurant Name</label>
        <input
          className="form-control"
          type="text"
          placeholder="Restaurant Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="type-of-restaurant" className="form-label-title ">
          Type of Restaurant
        </label>
        <select
          id="type-of-restaurant"
          className="form-control js-example-basic-single col-sm-12"
        >
          <option value="FI">Fine Dining</option>
          <option value="BE"> Casual Dining</option>
          <option value="CO"> Contemporary Casual</option>
          <option value="FA">Family Style</option>
          <option value="FA">Fast Casual</option>
          <option value="FA"> Fast Food</option>
          <option value="BU">Buffet</option>
        </select>
      </div>
      <div className="row g-3">
        <label className="form-label-title mt-3">Facility Restaurant</label>
        {addRestaurantData.map((item, index) => (
          <div className=" mt-0 col-xs-12 col-md-6" key={index}>
            {item.children.map((data, i2) => (
              <label className="d-block" htmlFor={`Facility${i2 + 1}`} key={i2}>
                <input
                  className="checkbox_animated"
                  id="Facility1"
                  type="checkbox"
                />
                {data}
              </label>
            ))}
          </div>
        ))}
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label-title  ">Address</label>
        <input type="text" placeholder="Address" className="form-control" />
      </div>
      <div className="row g-3">
        <div className="col-sm-6">
          <select className="select form-control">
            <option>Country</option>
            <option value={2}>Option 1</option>
            <option value={3}>Option 2</option>
            <option value={4}>Option 3</option>
          </select>
        </div>
        <div className="col-sm-6">
          <select className="select form-control">
            <option>State</option>
            <option value={2}>Option 1</option>
            <option value={3}>Option 2</option>
            <option value={4}>Option 3</option>
          </select>
        </div>
        <div className="col-sm-6">
          <select className="select form-control">
            <option>City</option>
            <option value={2}>Option 1</option>
            <option value={3}>Option 2</option>
            <option value={4}>Option 3</option>
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
      <div className="mb-3 mt-3">
        <label className="form-label-title ">Contact Number</label>
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
      <div className="row">
        <div className="col-6">
          <label className="form-label-title ">Opening</label>
          <div className="input-group date">
            <DatePicker />
            <div className="input-group-text">
              <i className="fa fa-clock-o" />
            </div>
          </div>
        </div>
        <div className="col-6">
          <label className="form-label-title ">Closing</label>
          <div className="input-group date">
            <DatePicker />
            <div className="input-group-text">
              <i className="fa fa-clock-o" />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label-title ">
          Upload Restaurant Image here
        </label>
        <DropZoneCommon onFilesSelected={() => console.log("DropZoneCommon")} />
      </div>
    </form>
  );
};

export default AddRestaurant;
