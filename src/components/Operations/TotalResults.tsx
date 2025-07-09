import { OperationBookingState } from "@/types/app/operation";
import React, { ReactNode } from "react";

function TotalResults({ bookings }: { bookings: OperationBookingState[] }) {
  const label = [
    "Total Records",
    "Total Total Participants",
    "Total Num of Adults",
    "Total Num of Children",
  ];
  const totalRecords = bookings?.length ?? 0;
  const sumNestedField = (
    data: OperationBookingState[],
    field: string
  ): number => {
    return data?.reduce((acc, item) => {
      const dailyTotal = item.bookings.reduce((sum: number, booking: any) => {
        return sum + Number(booking[field] || 0);
      }, 0);
      return acc + dailyTotal;
    }, 0);
  };

  // Usage
  const totalParticipants = sumNestedField(bookings, "totalParticipants");
  const totalNumOfAdults = sumNestedField(bookings, "numOfAdults");
  const totalNumOfChildren = sumNestedField(bookings, "numOfChildren");
  const total = [
    totalRecords,
    totalParticipants,
    totalNumOfAdults,
    totalNumOfChildren,
  ];
  return (
    <div className="d-flex justify-content-center gap-4">
      {total.map((item, index) => {
        return (
          <div key={index}>
            <label htmlFor="" style={{ color: "grey" }}>
              {label[index]}
            </label>
            <h6>{item}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default TotalResults;
