"use client";
import React from "react";
import { useParams } from "next/navigation";

import BookingStart from "@/components/Booking/BookingStart";
import GiftCard from "@/components/Booking/GiftCard";
import ContactDetails from "@/components/Booking/ContactDetails";
import TourBooking from "@/components/Booking/TourBooking";
import BookingReview from "@/components/Booking/BookingReview";
import StripeCheckout from "@/components/Booking/StripeCheckout";
import PageLoader from "@/layouts/PageLoader";
import { BOOKINGSTEPS } from "@/constants/data";
import RoleProvider from "@/providers/RoleProvider";
import LoadingAuthButton from "@/Common/LoadingAuthButton";
import { useAllStatusBooking } from "@/hooks/UseBooking";
import TopSteps from "@/app/(MainLayout)/booking/common/TopSteps";
import { useSelector } from "react-redux";
import { userState } from "@/store/auth";
import { selectedAgent } from "@/store/travelAgent";
import { marginState } from "@/store/financial";

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
    step,
    setStep,
    onStepClick,
    handleBookingDetails,
    handleBookingMintraveler,
    updateNestedBookingDetails,
    updateBookingDetails,
    handleCheckout,
    isButtonDisabled,
    handleStepAdvance,
    promo,
    setPromo,
    applyPromo,
  } = useAllStatusBooking(id as string, "update");
  const { tours } = product;
  const { adultCount, childCount, tourId, promoPercent } = booking;

  const tour = tours?.find((tour) => tour._id === tourId);

  const feePercent = 0.03;
  const travelPercent =
    useSelector(userState).role === "Travel Agent"
      ? useSelector(selectedAgent).travelAgentProfile?.percent ?? 0.04
      : 0;

  const margins = useSelector(marginState);
  const calculateMargin = (duration: number) => {
    if (duration >= 1 && duration < 5) {
      return parseFloat(margins.shortMarkup);
    } else if (duration >= 5 && duration < 10) {
      return parseFloat(margins.mediumMarkup);
    } else {
      return parseFloat(margins.longMarkup);
    }
  };

  const adultPrice =
    Number(adultCount) *
    (Number(tour?.revenue.totalBulkCost ?? 0) +
      Number(tour?.revenue.totalIndividualCost ?? 0)) *
    calculateMargin(Number(tour?.duration));

  const childPrice =
    Number(childCount) *
    Number(tour?.revenue.childrenCost) *
    calculateMargin(Number(tour?.duration));

  const totalPrice = (adultPrice + childPrice) * (1 - promoPercent);

  const bookingPrice = (1 - feePercent - travelPercent) * totalPrice;
  const fee = totalPrice * feePercent;
  const travelFee = totalPrice * travelPercent;

  return (
    <RoleProvider target="Booking">
      <div className="card">
        <div className="card-header">
          <h4>Update Booking</h4>
        </div>
        {step.current > -1 && step.current < BOOKINGSTEPS.length && (
          <TopSteps {...{ step, setStep }} />
        )}
        {productLoading || destinationLoading || isLoading ? (
          <PageLoader />
        ) : (
          <div className="card-body">
            {step.current === -1 && (
              <BookingStart
                {...{
                  product,
                  booking,
                  onStepClick,
                  handleBookingDetails,
                }}
              />
            )}
            {step.current !== -1 && (
              <div className="d-flex row">
                <div
                  className={
                    step.current < BOOKINGSTEPS.length ? `col-sm-8` : ``
                  }
                >
                  {step.current === 0 && (
                    <ContactDetails
                      {...{
                        mainTraveller: booking.mainTraveller,
                        updateNestedBookingDetails,
                        handleBookingMintraveler,
                      }}
                    />
                  )}
                  {step.current === 1 && (
                    <TourBooking
                      {...{
                        product,
                        bookingDetail: booking,
                        handleBookingDetails,
                        updateNestedBookingDetails,
                        updateBookingDetails,
                      }}
                    />
                  )}
                  {step.current === 2 && (
                    <BookingReview
                      {...{
                        product,
                        booking,
                        checkout,
                        handleCheckout,
                      }}
                    />
                  )}
                  {step.current === 3 &&
                    (clientSecret.length === 0 ? (
                      <PageLoader />
                    ) : (
                      <StripeCheckout
                        {...{
                          product,
                          booking,
                          clientSecret,
                          price: {
                            totalPrice,
                            adultPrice,
                            childPrice,
                            fee,
                            travelFee,
                            travelPercent,
                            feePercent,
                          },
                        }}
                      />
                    ))}
                  <div
                    className={`text-end my-3 ${
                      step.current < BOOKINGSTEPS.length ? "" : "mx-5"
                    }`}
                  >
                    <LoadingAuthButton
                      {...{
                        classes: `btn btn-outline-past ${
                          step.current === BOOKINGSTEPS.length - 1 && "w-100"
                        } }`,
                        bookingId: booking._id,
                        onFunc: handleStepAdvance,
                        disabled:
                          step.current > BOOKINGSTEPS.length ||
                          isButtonDisabled() ||
                          checkout,
                        loading: isLoading,
                        title:
                          step.current === BOOKINGSTEPS.length - 1
                            ? "Go to secure checkout"
                            : step.current < BOOKINGSTEPS.length
                            ? "Continue"
                            : "Pay for Booking",
                        style:
                          step.current < BOOKINGSTEPS.length
                            ? { display: "" }
                            : { display: "none" },
                      }}
                    />
                  </div>
                </div>
                {step.current < BOOKINGSTEPS.length && (
                  <div className="col-sm-4">
                    <GiftCard
                      {...{
                        product,
                        booking,
                        promo,
                        setPromo,
                        applyPromo,
                        price: {
                          totalPrice,
                          bookingPrice,
                          adultPrice,
                          childPrice,
                          fee,
                          travelFee,
                          travelPercent,
                        },
                      }}
                    />
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
