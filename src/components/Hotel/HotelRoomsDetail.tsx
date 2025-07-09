import { Href, ImagePath } from "@/utils/Constant";
import Image from "next/image";
import React from "react";
import Amenities from "./common/Amenities";
import GuestService from "./common/GuestService";
import Inclusion from "./common/Inclusion";

const HotelRoomsDetail = () => {
  const datas = ["Deluxe", "suite", "Royal"];
  return (
    <table className="rooms-box border-0">
      <tbody>
        {datas.map((data, index) => (
          <tr key={index}>
            <td>
              <a href={Href}>
                <img src={`${ImagePath}/hotel/room/${index+4}.jpg`} className="img-fluid blur-up lazyload" alt=" "/>
              </a>
            </td>
            <td>
              <h6 className="room-title">{data} Room</h6>
              <div className="room-detail">
                <div className="row g-2">
                  <div className="col-sm-6 col-md-4 p-0">
                    <h6>Amenities</h6>
                    <div className="facility-detail">
                      <Amenities />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 p-0">
                    <h6>Guest Service</h6>
                    <div className="facility-detail">
                      <GuestService />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 p-0">
                    <h6>inclusion</h6>
                    <div className="facility-detail">
                      <Inclusion />
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HotelRoomsDetail;
