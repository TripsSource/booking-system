"use client";
import AdditionalTravelers from "@/components/Customers/AdditionalTravelers";
import LeadTraveler from "@/components/Customers/LeadTraveler";
import SpecialRequirements from "@/components/Customers/SpecialRequirements";
import TourDetails from "@/components/Customers/TourDetails";
import React from "react";

const Book = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header mb-3">
                    <h3>Book a Tour</h3>
                  </div>
                  <LeadTraveler />
                  <AdditionalTravelers />
                  <TourDetails />
                  <SpecialRequirements />
                  <div className="mb-3 justify-content-end d-flex m-r-10">
                    <button
                      className="btn btn-primary btn-block w-10"
                      type="button"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
