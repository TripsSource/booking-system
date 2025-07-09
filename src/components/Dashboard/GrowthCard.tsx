import React from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { growthCardData } from "@/data/Dashboard";

const GrowthCard = () => {
  return (
    <>
      {growthCardData.map((data, index) => (
        <div className="col-sm-6 col-xxl-3 col-lg-6" key={index}>
          <div className={`b-b-${data.color} border-5 border-0 card o-hidden`}>
            <div className={`custome-${data.number} b-r-4 card-body`}>
              <div className="media align-items-center static-top-widget">
                <div className="media-body p-0">
                  <span className="m-0">{data.title}</span>
                  <h4 className="mb-0 counter">
                    {data.counter}
                    <span className={`badge ms-2 badge-light-${data.color} grow  `}>
                      <DynamicFeatherIcon iconName={data.growth ? "TrendingUp" : "TrendingDown"}/>
                      8.5%
                    </span>
                  </h4>
                </div>
                <div className="align-self-center text-center">
                  <DynamicFeatherIcon iconName={data.icon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GrowthCard;
