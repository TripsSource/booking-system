import { hotelsData } from "@/data/Hotel";
import { ImagePath } from "@/utils/Constant";
import React from "react";
import { Href } from "../../utils/Constant";
import Link from "next/link";

const AllHotelTableBody = () => {
  return (
    <tbody>
      {hotelsData.map((hotel, index) => (
        <tr key={index}>
          <td>
            <span>
              <img src={`${ImagePath}/hotel/${index + 1}.jpg`} alt="hotel" />
            </span>
          </td>
          <td>
            <a href={Href}>
              <span className="d-block fw-bold ">{hotel.name}</span>
              <span>{hotel.country}</span>
            </a>
          </td>
          <td>{hotel.phone}</td>
          <td>{hotel.email}</td>
          <td>
            <Link href="/hotel/hotelsdetail"><i className="fa fa-eye" /></Link>
          </td>
          <td>
            <a href={Href}><i className="fa fa-pencil-square-o"></i></a>
          </td>
          <td>
            <a href={Href}><i className="fa fa-trash-o"></i></a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AllHotelTableBody;
