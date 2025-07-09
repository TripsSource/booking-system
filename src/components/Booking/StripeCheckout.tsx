"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import io from "socket.io-client";
import { ProductDetailState } from "@/types/app/product";
import { BookingType } from "@/types/store/booking";
import { useSelector } from "react-redux";
import { userState } from "@/store/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Spinner } from "reactstrap";
import { selectedAgent } from "@/store/travelAgent";
import { marginState } from "@/store/financial";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY || "");

if (!process.env.STRIPE_PUBLIC_KEY) {
  console.error(
    "STRIPE_PUBLIC_KEY is not defined in the environment variables."
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const user = useSelector(userState);
  const clientId = user._id;
  const elements = useElements();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
    socket.emit("register", clientId);
    socket.on("paymentStatus", (data) => {
      if (data.status) {
        toast.success("success");
        router.push("/booking/create");
      } else {
        toast.error(`${data.message}`);
      }
      setDisabledButton(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setDisabledButton(true);
    setMessage("");
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
      redirect: "if_required",
    });

    if (error && "message" in error && error.message) {
      setDisabledButton(true);
      setMessage(error.message);
    }
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <br />
        {message && <div>{message}</div>}
        <br />
        <button
          type="submit"
          className={`btn btn-outline-past`}
          disabled={stripe === null}
        >
          <div className="d-flex align-items-center">
            {disabledButton && <Spinner className="text-success" />}
            <span className={disabledButton ? "ms-1" : ""}>
              Pay for Booking
            </span>
          </div>
        </button>
      </form>
      <br />
    </div>
  );
}

function StripeCheckout({
  product,
  booking,
  clientSecret,
}: {
  product: ProductDetailState;
  booking: BookingType;
  clientSecret: string;
}) {
  const stripeOptions = {
    clientSecret,
    paymentRequest: {
      currency: "CHF",
      requestPayerEmail: false,
      paymentMethodTypes: ["card"],
    },
  };
  const { name, revenues, startingLocations } = product;
  const { adultCount, childCount, infantCount, startingLocationId } =
    booking.bookingDetails;
  const Cost = revenues?.find(
    (item) => item.startingLocationId === startingLocationId
  );
  const userRole = useSelector(userState).role;

  const margins = useSelector(marginState);
  const calculateMargin = (startingLocation: string) => {
    if (!Array.isArray(startingLocations)) {
      return 0;
    }
    const duration = Number(
      startingLocations.find((location) => location._id === startingLocation)
        ?.durationHours ?? 0
    );
    if (duration >= 1 && duration < 5) {
      return parseFloat(margins.shortMarkup);
    } else if (duration >= 5 && duration < 10) {
      return parseFloat(margins.mediumMarkup);
    } else {
      return parseFloat(margins.longMarkup);
    }
  };

  const feePercent =
    userRole === "Travel Agent"
      ? useSelector(selectedAgent).travelAgentProfile?.percent ?? 5
      : 0;

  const adultPrice =
    Number(adultCount) *
    ((Cost?.totalBulkCost ?? 0) + (Cost?.totalIndividualCost ?? 0));

  const childPrice = Number(childCount) * Number(Cost?.childrenCost);

  const totalPrice =
    (adultPrice + childPrice) * calculateMargin(Cost?.startingLocationId ?? "");

  const fee = (totalPrice * feePercent) / 100;

  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <div className="row">
            <div className="col-sm-6">
              <div className="pricing-container">
                <div className="pricing-header">
                  <h6 style={{ color: "grey" }}>{name}</h6>
                  <h3 className="price">CHF {(totalPrice + fee).toFixed(2)}</h3>
                </div>

                <div className="pricing-details">
                  {adultCount !== 0 && (
                    <div className="d-flex mt-3">
                      <div>
                        <span style={{ fontWeight: "bold", display: "block" }}>
                          Adult x {booking.bookingDetails.adultCount}
                        </span>
                      </div>
                      <span style={{ flex: "1 1 auto" }}></span>
                      <span style={{ fontWeight: "bold" }}>
                        CHF{" "}
                        {Math.ceil(
                          adultPrice *
                            100 *
                            calculateMargin(Cost?.startingLocationId ?? "")
                        ) / 100}
                      </span>
                    </div>
                  )}
                  {childCount !== 0 && (
                    <div className="d-flex mt-1">
                      <div>
                        <span style={{ fontWeight: "bold", display: "block" }}>
                          Child x {booking.bookingDetails.childCount}
                        </span>
                      </div>
                      <span style={{ flex: "1 1 auto" }}></span>
                      <span style={{ fontWeight: "bold" }}>
                        CHF{" "}
                        {Math.ceil(
                          childPrice *
                            100 *
                            calculateMargin(Cost?.startingLocationId ?? "")
                        ) / 100}
                      </span>
                    </div>
                  )}
                  {infantCount !== 0 && (
                    <div className="d-flex mt-1">
                      <div>
                        <span style={{ fontWeight: "bold", display: "block" }}>
                          Infant x {booking.bookingDetails.infantCount}
                        </span>
                      </div>
                      <span style={{ flex: "1 1 auto" }}></span>
                      <span style={{ fontWeight: "bold" }}>CHF 0.00</span>
                    </div>
                  )}
                  {/* {userRole === "Travel Agent" && (
                    <div className="d-flex mt-1">
                      <div>
                        <span style={{ fontWeight: "bold", display: "block" }}>
                          Travel Agent Fee
                        </span>
                      </div>
                      <span style={{ flex: "1 1 auto" }}></span>
                      <span style={{ fontWeight: "bold" }}>
                        CHF {fee.toFixed(2)}
                      </span>
                    </div>
                  )} */}
                  <hr />
                  <div className="">
                    <div className="d-flex">
                      <span style={{ fontWeight: "bold" }}>Subtotal</span>
                      <span style={{ flex: "1 1 auto" }}></span>
                      <span style={{ fontWeight: "bold" }}>
                        CHF {Math.ceil((totalPrice + fee) * 100) / 100}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <CheckoutForm />
            </div>
          </div>
        </Elements>
      ) : (
        <div
          style={{ height: "20rem" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner className="text-success" />
        </div>
      )}
    </>
  );
}

export default StripeCheckout;
