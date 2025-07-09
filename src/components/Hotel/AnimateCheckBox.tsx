"use client";
import DropZoneCommon from "@/Common/DropZoneCommon";
import EditorsSimple from "@/Common/EditorsSimple";
import { animateCheckBoxes, roomAmenitiesData } from "@/data/Hotel";

const AnimateCheckBox = () => {
  return (
    <div className="animate-chk">
      <div className="row g-2">
        <div className=" col-xl-12 col-xxl-6 ">
          <label className="form-label-title ">Room Inclusion</label>
          <div className="row g-3">
            {animateCheckBoxes.map((data, index) => (
              <div className=" col-xs-12 col-sm-6" key={index}>
                {data.children.map((item, detail) => (
                  <label className="d-block" htmlFor={item} key={detail}>
                    <input
                      className="checkbox_animated"
                      id={item}
                      type="checkbox"
                    />
                    {item}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className=" col-xl-12 col-xxl-6 ">
          <label className="form-label-title ">Room Amenities</label>
          <div className="row g-3">
            {roomAmenitiesData.map((data, index) => (
              <div className=" col-xs-12 col-sm-6" key={index}>
                {data.children.map((item, detail) => (
                  <label className="d-block" htmlFor={item} key={detail}>
                    <input
                      className="checkbox_animated"
                      id={item}
                      type="checkbox"
                    />
                    {item}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label-title mt-4">Upload Room Image here </label>
        <DropZoneCommon onFilesSelected={() => console.log("DropZoneCommon")} />
      </div>
      <label className="form-label-title ">Room Description</label>
      <EditorsSimple />
    </div>
  );
};

export default AnimateCheckBox;
