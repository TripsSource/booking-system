import { BookingDetailsProps } from "@/types/components/product";
import React from "react";
import { QUESTIONS } from "@/constants/data";

const BookingDetails = ({ product, handleProduct }: BookingDetailsProps) => {
  const { bookingDetails } = product;
  const {
    leadFullName,
    leadBirth,
    leadEmail,
    leadPhone,
    othersFullName,
    othersPhone,
    allergyQuestion,
    mobilityQuestion,
    medicalQuestion,
  } = bookingDetails;

  const handleBookingDetails = (type: string, value: boolean) => {
    handleProduct("bookingDetails", { ...bookingDetails, [type]: value });
  };

  const questionsTitles = [
    { title: QUESTIONS[0], type: "allergyQuestion", value: allergyQuestion },
    {
      title: QUESTIONS[1],
      type: "mobilityQuestion",
      value: mobilityQuestion,
    },
    { title: QUESTIONS[2], type: "medicalQuestion", value: medicalQuestion },
  ];

  const leaderTitles = [
    {
      title: "First and Last Name",
      type: "leadFullName",
      value: leadFullName,
    },
    { title: "Date of Birth", type: "leadBirth", value: leadBirth },
    { title: "Email Address", type: "leadEmail", value: leadEmail },
    { title: "Mobile Number", type: "leadPhone", value: leadPhone },
  ];

  const otherTitles = [
    {
      title: "Others First and Last Name",
      type: "othersFullName",
      value: othersFullName,
    },
    { title: "Others Date of Birth", type: "othersPhone", value: othersPhone },
  ];

  return (
    <form className="theme-form mega-form">
      <div className="mb-3">
        <label className="form-label-title">
          <h5>Questions</h5>
        </label>
        {questionsTitles.map((question, index) => (
          <div className="d-flex align-items-start" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={question.value}
              onChange={(e) =>
                handleBookingDetails(question.type, e.target.checked)
              }
              id={question.type}
            />
            <label className="form-check-label ms-1" htmlFor={question.type}>
              {question.title}
            </label>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <label className="form-label-title">
          <h5>Lead traveler</h5>
        </label>
        <div className="d-flex justify-content-start">
          {leaderTitles.map((leader, index) => (
            <div
              className={`d-flex align-items-start ${index !== 0 && "ms-4"}`}
              key={index}
            >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={leader.value}
                onChange={(e) =>
                  handleBookingDetails(leader.type, e.target.checked)
                }
                id={leader.type}
              />
              <label className="form-check-label ms-1" htmlFor={leader.type}>
                {leader.title}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label-title">
          <h5>If more than one traveler</h5>
        </label>
        <div className="d-flex justify-content-start">
          {otherTitles.map((other, index) => (
            <div
              className={`d-flex align-items-start ${index !== 0 && "ms-4"}`}
              key={index}
            >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={other.value}
                onChange={(e) =>
                  handleBookingDetails(other.type, e.target.checked)
                }
                id={other.type}
              />
              <label className="form-check-label ms-1" htmlFor={other.type}>
                {other.title}
              </label>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default BookingDetails;
