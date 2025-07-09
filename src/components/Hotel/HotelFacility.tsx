import React from "react";
import VerifiedWithTittle from "./common/VerifiedWithTittle";
import DisplayList from "./common/DisplayList";
import {activitiesList,basicFacility,foodNames,paymentMode,securityMode,} from "@/data/Hotel";

const HotelFacility = () => {
  return (
    <div className="row  g-4">
      <div className="col-xl-3 col-sm-6">
        <VerifiedWithTittle heading="Basic Facility" />
        <DisplayList nameList={basicFacility} />
      </div>
      <div className="col-xl-3 col-sm-6">
        <VerifiedWithTittle heading="payment mode" differentImage="credit-card"/>
        <DisplayList nameList={paymentMode} />
      </div>
      <div className="col-xl-3 col-sm-6">
        <VerifiedWithTittle heading="Security" differentImage="cctv" />
        <DisplayList nameList={securityMode} />
      </div>
      <div className="col-xl-3 col-sm-6">
        <VerifiedWithTittle heading="food & drinks" differentImage="tray" />
        <DisplayList nameList={foodNames} />
        <VerifiedWithTittle heading="activities" differentImage="barbell" />
        <DisplayList nameList={activitiesList} />
      </div>
    </div>
  );
};

export default HotelFacility;
