import { bookingHistoryTableData, flightLand } from "@/data/Dashboard";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import React from "react";
import { flightTakeOff } from '../../data/Dashboard/index';
import Link from "next/link";

const BookingHistory = () => {
  return (
    <div className="col-xxl-8">
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">
            <h5>Booking History</h5>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive ">
            <table className=" dashboard-table table border-0 ">
              <tbody>
                {bookingHistoryTableData.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <Image height={45} width={65} src={`${ImagePath}/tours/${index + 1}.jpg`} alt="tour 1"/>
                    </td>
                    <td>
                      <Link href={"/tour/packagedetail"}>
                        <span className="fw-500">{data.title}</span>
                      </Link>
                      <span className="subtitle">{data.airline}</span>
                    </td>
                    <td>
                      <span>{data.nights}</span>
                    </td>
                    <td>
                      <span> {flightTakeOff()} {data.departureDate}</span>
                    </td>
                    <td><span /><span>{data.departureDetails}</span></td>
                    <td>
                      <span>{flightLand()}{data.arrivalDate}</span>
                    </td>
                    <td>
                      <span className={`badge badge-${data.status === "Active" ?"primary":"secondary"}`}>{data.status}</span>
                    </td>
                    <td>
                      <span>{data.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
