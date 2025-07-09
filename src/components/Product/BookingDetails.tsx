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

  const handleBookingDetails = (param: string, value: boolean) => {
    handleProduct("bookingDetails", { ...bookingDetails, [param]: value });
  };

  const questionsTitles = [
    { title: QUESTIONS[0], param: "allergyQuestion", value: allergyQuestion },
    {
      title: QUESTIONS[1],
      param: "mobilityQuestion",
      value: mobilityQuestion,
    },
    { title: QUESTIONS[2], param: "medicalQuestion", value: medicalQuestion },
  ];

  const leaderTitles = [
    {
      title: "First and Last Name",
      param: "leadFullName",
      value: leadFullName,
    },
    { title: "Date of Birth", param: "leadBirth", value: leadBirth },
    { title: "Email Address", param: "leadEmail", value: leadEmail },
    { title: "Mobile Number", param: "leadPhone", value: leadPhone },
  ];

  const otherTitles = [
    {
      title: "Others First and Last Name",
      param: "othersFullName",
      value: othersFullName,
    },
    { title: "Others Date of Birth", param: "othersPhone", value: othersPhone },
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
                handleBookingDetails(question.param, e.target.checked)
              }
              id={question.param}
            />
            <label className="form-check-label ms-1" htmlFor={question.param}>
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
                  handleBookingDetails(leader.param, e.target.checked)
                }
                id={leader.param}
              />
              <label className="form-check-label ms-1" htmlFor={leader.param}>
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
                  handleBookingDetails(other.param, e.target.checked)
                }
                id={other.param}
              />
              <label className="form-check-label ms-1" htmlFor={other.param}>
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
