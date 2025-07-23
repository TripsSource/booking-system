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
  price,
}: {
  product: ProductDetailState;
  booking: BookingType;
  clientSecret: string;
  price: {
    totalPrice: number;
    adultPrice: number;
    childPrice: number;
    fee: number;
    travelFee: number;
    travelPercent: number;
    feePercent: number;
  };
}) {
  const stripeOptions = {
    clientSecret,
    paymentRequest: {
      currency: "CHF",
      requestPayerEmail: false,
      paymentMethodTypes: ["card"],
    },
  };
  const { name } = product;
  const { adultCount, childCount, infantCount, promoPercent } = booking;
  const {
    totalPrice,
    adultPrice,
    childPrice,
    fee,
    travelFee,
    travelPercent,
    feePercent,
  } = price;
  const convertTwoDecimal = (value: number) => Math.round(value * 100) / 100;
  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <div className="row">
            <div className="col-sm-6">
              <div className="pricing-container">
                <div className="pricing-header">
                  <h6 style={{ color: "grey" }}>{name}</h6>
                  <h3 className="price">CHF {convertTwoDecimal(totalPrice)}</h3>
                </div>

                <div className="pricing-details">
                  {adultCount !== 0 && (
                    <div className="d-flex mt-3">
                      <div>
                        <span style={{ fontWeight: "bold", display: "block" }}>
                          Adult x {adultCount}
                        </span>
                      </div>
                      <span style={{ flex: "1 1 auto" }}></span>
                      <span style={{ fontWeight: "bold" }}>
                        CHF{" "}
                        {convertTwoDecimal(
                          adultPrice *
                            (1 - feePercent - travelPercent) *
                            (1 - promoPercent)
                        )}
                      </span>
                    </div>
                  )}
                  {childCount !== 0 && (
                    <div className="d-flex mt-1">
                      <div>
                        <span style={{ fontWeight: "bold", display: "block" }}>
                          Child x {childCount}
                        </span>
                      </div>
                      <span style={{ flex: "1 1 auto" }}></span>
                      <span style={{ fontWeight: "bold" }}>
                        CHF{" "}
                        {convertTwoDecimal(
                          childPrice *
                            (1 - feePercent - travelPercent) *
                            (1 - promoPercent)
                        )}
                      </span>
                    </div>
                  )}
                  {infantCount !== 0 && (
                    <div className="d-flex mt-1">
                      <div>
                        <span style={{ fontWeight: "bold", display: "block" }}>
                          Infant x {infantCount}
                        </span>
                      </div>
                      <span style={{ flex: "1 1 auto" }}></span>
                      <span style={{ fontWeight: "bold" }}>CHF 0.00</span>
                    </div>
                  )}
                  <div className="d-flex mt-1">
                    <div>
                      <span style={{ fontWeight: "bold", display: "block" }}>
                        Booking Fee
                      </span>
                    </div>
                    <span style={{ flex: "1 1 auto" }}></span>
                    <span style={{ fontWeight: "bold" }}>
                      CHF {convertTwoDecimal(fee)}
                    </span>
                  </div>
                  {travelPercent > 0 && (
                    <div className="d-flex mt-1">
                      <div>
                        <span style={{ fontWeight: "bold", display: "block" }}>
                          Travel Agent Fee
                        </span>
                      </div>
                      <span style={{ flex: "1 1 auto" }}></span>
                      <span style={{ fontWeight: "bold" }}>
                        CHF {convertTwoDecimal(travelFee)}
                      </span>
                    </div>
                  )}
                  <hr />
                  <div className="">
                    <div className="d-flex">
                      <span style={{ fontWeight: "bold" }}>Subtotal</span>
                      <span style={{ flex: "1 1 auto" }}></span>
                      <span style={{ fontWeight: "bold" }}>
                        CHF {convertTwoDecimal(totalPrice)}
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
