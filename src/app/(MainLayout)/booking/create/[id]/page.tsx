"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import BookingStart from "@/components/Booking/BookingStart";
import GiftCard from "@/components/Booking/GiftCard";
import ContactDetails from "@/components/Booking/ContactDetails";
import TourBooking from "@/components/Booking/TourBooking";
import BookingReview from "@/components/Booking/BookingReview";
import StripeCheckout from "@/components/Booking/StripeCheckout";
import PageLoader from "@/layouts/PageLoader";
import RoleProvider from "@/providers/RoleProvider";
import LoadingAuthButton from "@/Common/LoadingAuthButton";
import { BOOKINGSTEPS } from "@/constants/data";
import { useAllStatusBooking } from "@/hooks/UseBooking";
import TopSteps from "@/app/(MainLayout)/booking/common/TopSteps";

const page = () => {
  const { id } = useParams();
  const {
    isLoading,
    productLoading,
    destinationLoading,
    product,
    booking,
    checkout,
    clientSecret,
    currentStep,
    maxStepReached,
    setCurrentStep,
    onStepClick,
    handleBookingDetails,
    handleBookingMintraveler,
    updateNestedBookingDetails,
    updateBookingDetails,
    handleCheckout,
    isButtonDisabled,
    handleStepAdvance,
  } = useAllStatusBooking(id as string, "create");

  return (
    <RoleProvider target="Booking">
      <div className="card">
        <div className="card-header">
          <h4>Booking</h4>
        </div>
        {currentStep > -1 && currentStep < BOOKINGSTEPS.length && (
          <TopSteps {...{ currentStep, maxStepReached, setCurrentStep }} />
        )}
        {productLoading || destinationLoading ? (
          <PageLoader />
        ) : (
          <div className="card-body">
            {currentStep === -1 && (
              <BookingStart
                {...{
                  product,
                  booking,
                  onStepClick,
                  handleBookingDetails,
                }}
              />
            )}
            {currentStep !== -1 && (
              <div className="d-flex row">
                <div
                  className={
                    currentStep < BOOKINGSTEPS.length ? `col-sm-8` : ``
                  }
                >
                  {currentStep === 0 && (
                    <ContactDetails
                      {...{
                        mainTraveller: booking.bookingDetails.mainTraveller,
                        updateNestedBookingDetails,
                        handleBookingMintraveler,
                      }}
                    />
                  )}
                  {currentStep === 1 && (
                    <TourBooking
                      {...{
                        product,
                        bookingDetail: booking.bookingDetails,
                        handleBookingDetails,
                        updateNestedBookingDetails,
                        updateBookingDetails,
                      }}
                    />
                  )}
                  {currentStep === 2 && (
                    <BookingReview
                      {...{ product, booking, checkout, handleCheckout }}
                    />
                  )}
                  {currentStep === 3 &&
                    (clientSecret.length === 0 ? (
                      <PageLoader />
                    ) : (
                      <StripeCheckout {...{ product, booking, clientSecret }} />
                    ))}
                  <div
                    className={`text-end my-3 ${
                      currentStep < BOOKINGSTEPS.length ? "" : "mx-5"
                    }`}
                  >
                    <LoadingAuthButton
                      {...{
                        classes: `btn btn-outline-past ${
                          currentStep === BOOKINGSTEPS.length - 1 && "w-100"
                        } }`,
                        onFunc: handleStepAdvance,
                        disabled:
                          currentStep > BOOKINGSTEPS.length ||
                          isButtonDisabled() ||
                          checkout,
                        loading: isLoading,
                        title:
                          currentStep === BOOKINGSTEPS.length - 1
                            ? "Go to secure checkout"
                            : currentStep < BOOKINGSTEPS.length
                            ? "Continue"
                            : "Pay for Booking",
                        style:
                          currentStep < BOOKINGSTEPS.length
                            ? { display: "" }
                            : { display: "none" },
                      }}
                    />
                  </div>
                </div>
                {currentStep < BOOKINGSTEPS.length && (
                  <div className="col-sm-4">
                    <GiftCard {...{ product, booking }} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </RoleProvider>
  );
};

export default page;
