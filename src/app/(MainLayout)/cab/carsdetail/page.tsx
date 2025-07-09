"use client";
import CommonEditCardHeader from "@/Common/CommonEditCardHeader";
import CabSingleDetail from "@/components/cab/CabSingleDetail";
import CarsPhotos from "@/components/cab/CarsPhotos";
import React from "react";

const AllCars = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonEditCardHeader heading="Car's Details" />
            <div className="card-body">
              <section className="single-section small-section bg-inner">
                <div className="row">
                  <h2 className="cars-title mb-2 mt-2">Peugeot Citroen</h2>
                  <div className="col-12">
                    <div className="image_section ">
                      <div className="row">
                        <div className="col-12">
                          <CarsPhotos/>
                        </div>
                      </div>
                    </div>
                    <CabSingleDetail />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCars;
