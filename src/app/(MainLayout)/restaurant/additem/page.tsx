"use client";
import CommonCardFooter from "@/Common/CommonCardFooter";
import DropZoneCommon from "@/Common/DropZoneCommon";
import dynamic from "next/dynamic";

const AllRestaurant = () => {
  const MultipleSelectBox = dynamic(
    () => import("@/Common/MultipleSelectBox"),
    { ssr: false }
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add New Menu</h5>
                </div>
                <div className="card-body">
                  <form className="theme-form mega-form">
                    <div className="mb-3">
                      <label className="form-label-title">Menu Name</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Menu Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="menu-type" className="form-label-title ">
                        Menu Type
                      </label>
                      <select
                        id="menu-type"
                        className="js-example-basic-single col-sm-12"
                      >
                        <option value="ST">Static Menu</option>
                        <option value="AL">A La Carte</option>
                        <option value="DU">Du Jour</option>
                        <option value="CY">Cycle Menu</option>
                        <option value="TA">Table d'Hote</option>
                        <option value="TA">Tasting Menu</option>
                        <option value="DE">Dessert</option>
                        <option value="WI">Wine Captain's Book</option>
                        <option value="CH">Children's</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title  ">Ingredients </label>
                      {/* <MultipleSelectBox /> */}
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title ">item Price</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input
                          className="form-control"
                          placeholder="$200"
                          type="text"
                          aria-label="Amount (to the nearest dollar)"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label-title ">
                        Upload item Image here
                      </label>
                      <DropZoneCommon
                        onFilesSelected={() => console.log("DropZoneCommon")}
                      />
                    </div>
                  </form>
                </div>
                <CommonCardFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurant;
