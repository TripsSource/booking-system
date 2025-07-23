import React, { useMemo } from "react";
import Image from "next/image";
import { BookingDetails } from "@/types/store/booking";
import { useSelector } from "react-redux";
import { bookingsLoadingState } from "@/store/ota";
import PageLoader from "@/layouts/PageLoader";
import moment from "moment";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

function OtaBookings({
  sort,
  order,
  bookings,
  handleSortOrder,
}: {
  sort: string;
  order: string;
  bookings: BookingDetails[];
  handleSortOrder: (value: string) => void;
}) {
  const mBookings = useMemo(() => bookings, [bookings]);
  const otaLoading = useSelector(bookingsLoadingState);
  const otaBookingTitles = [
    { label: "Booking Date", value: "bookingDateObj" },
    { label: "Tour Name", value: "productId.name" },
    { label: "Tour Type", value: "tourId.isPrivate" },
    { label: "Name", value: "mainTraveller.firstname" },
    { label: "Email", value: "mainTraveller.email" },
    { label: "PAX", value: "" },
    { label: "Price(CHF)", value: "amount" },
    { label: "Status", value: "status" },
  ];
  return (
    <div>
      <table className="user-table table table-striped">
        <thead>
          <tr>
            {otaBookingTitles.map((title, index) => (
              <th
                key={index}
                className="text-center text-nowrap"
                style={{ cursor: "pointer" }}
                onClick={() => handleSortOrder(title.value)}
              >
                <div className="d-flex justify-content-center align-items-center">
                  {title.label}
                  {title.value === sort && order === "asc" && (
                    <FaSortUp className="mt-2" />
                  )}
                  {title.value === sort && order === "desc" && (
                    <FaSortDown className="mb-2" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {otaLoading ? (
            <tr>
              <td colSpan={8}>
                <PageLoader />
              </td>
            </tr>
          ) : (
            mBookings.map((booking, index) => (
              <tr key={index}>
                <td className="text-center">
                  {moment(new Date(booking.bookingDate)).format("DD/MM/YYYY")}
                </td>
                <td className="text-center">{booking.productName}</td>
                <td className="text-center">
                  {booking.isPrivate ? "Private" : "Small Group"} Tour
                </td>
                <td className="text-center">
                  {booking.mainTraveller.firstname +
                    " " +
                    booking.mainTraveller.lastname}
                </td>
                <td className="text-center">{booking.mainTraveller.email}</td>
                <td className="text-center">
                  Adult - {booking.adultCount} / Child - {booking.childCount} /
                  Infant - {booking.infantCount}
                </td>
                <td className="text-center">{booking.amount}</td>
                <td className="text-center">
                  {booking.status === "PAID" ? "Booked" : "Cancelled"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OtaBookings;
