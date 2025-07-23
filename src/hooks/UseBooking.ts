"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { initalBooking } from "@/app/(MainLayout)/booking/InitialBookingState";
import { BOOKINGSTEPS } from "@/constants/data";
import { emailPattern } from "@/utils/validation";

import { AppDispatch } from "@/store";
import {
  destinationLoadingState,
  getDestinationTitlesAction,
} from "@/store/destination";
import { userState } from "@/store/auth";
import { getTravelAgentAction } from "@/store/travelAgent";
import { getProductIdAction, productLoadingState } from "@/store/products";
import {
  bookingsLoadingState,
  createBookingAction,
  getBookingByIdAction,
  updateBookingAction,
} from "@/store/booking";
import { useRouter } from "next/navigation";
import { BookingType } from "@/types/store/booking";
import { TravellerState } from "@/types/app/booking";
import { ProductDetailState } from "@/types/app/product";
import { getMarginAction } from "@/store/financial";
import { validPromoAction } from "@/store/promo";

export const useAllStatusBooking = (id: string, type: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const productLoading = useSelector(productLoadingState);
  const destinationLoading = useSelector(destinationLoadingState);
  const user = useSelector(userState);
  const isLoading = useSelector(bookingsLoadingState);

  const [product, setProduct] = useState<ProductDetailState>(
    {} as ProductDetailState
  );
  const [booking, setBooking] = useState<BookingType>(initalBooking);
  const [checkout, setCheckout] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [step, setStep] = useState<{ current: number; max: number }>({
    current: -1,
    max: 0,
  });
  const [promo, setPromo] = useState("");
  const [err, setErr] = useState<string>("");

  const fetchInitialData = async (id: string) => {
    await dispatch(getMarginAction({}));
    await dispatch(getDestinationTitlesAction({}));
    const { payload } = await dispatch(getProductIdAction(`${id}`));
    console.log(payload);
    if (payload?.["data"]) {
      setProduct(payload.data as ProductDetailState);
      if (type === "create")
        setBooking({
          ...booking,
          mainTraveller: {
            ...booking.mainTraveller,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          },
          productId: id,
          startTime: payload.data.tours[0].times[0],
          tourId: payload.data.tours[0]?._id,
        });
    }
    if (user.role === "Travel Agent")
      await dispatch(getTravelAgentAction(user._id));
  };

  const fetchBooking = async (id: string) => {
    await dispatch(getMarginAction({}));
    const { payload } = await dispatch(getBookingByIdAction(id));
    if (payload?.["data"]) {
      setBooking((pre) => ({ ...pre, ...payload.data.booking }));
      setProduct((pre) => ({ ...pre, ...payload.data.product }));
    }
  };

  useEffect(() => {
    if (type === "create") fetchInitialData(id);
    else fetchBooking(id);
  }, [id]);

  useEffect(() => {
    if (step.current > step.max)
      setStep((pre) => ({ ...pre, max: step.current }));
  }, [step]);

  const onStepClick = (index: number) => {
    setStep((pre) => ({ ...pre, current: index }));
    if (index === 0) {
      const adult = Number(booking.adultCount);
      const child = Number(booking.childCount);
      const requiredTravellers = adult + child - 1;
      const currentTravellers = booking.otherTravellers || [];
      if (currentTravellers.length < requiredTravellers) {
        const newTravellers = Array.from({
          length: requiredTravellers - currentTravellers.length,
        }).map(() => ({
          firstname: "",
          lastname: "",
          birthDate: "",
        }));
        const updatedTravellers = [...currentTravellers, ...newTravellers];
        handleBookingDetails("otherTravellers", updatedTravellers);
      } else {
        handleBookingDetails(
          "otherTravellers",
          currentTravellers.slice(0, requiredTravellers)
        );
      }
    }
  };

  const applyPromo = async () => {
    const { payload } = await dispatch(validPromoAction(promo));
    if (payload?.["data"]) {
      toast.success(`${payload.message}`);
      setBooking((pre) => ({
        ...pre,
        promoCode: payload.data._id,
        promoPercent: payload.data.percent,
      }));
      setPromo("");
    } else toast.error(`${payload.error}`);
    console.log(payload);
  };

  const handleBookingDetails = (
    key: string,
    value: string | number | TravellerState[]
  ) => {
    if (key === "tourId" && typeof value === "string") {
      setBooking((prev) => ({
        ...prev,
        [key]: value,
        startTime:
          product.tours?.find((tour) => tour._id === value)?.times[0] ?? "",
      }));
    } else {
      setBooking((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleBookingMintraveler = (phoneNumber: string, country: string) => {
    setBooking((prev) => ({
      ...prev,
      mainTraveller: {
        ...prev.mainTraveller,
        phoneNumber,
        country,
      },
    }));
  };

  const updateNestedBookingDetails = (
    type: keyof BookingType,
    key: string,
    value: string | boolean | undefined
  ) => {
    setBooking((prev) => ({
      ...prev,
      [type]: {
        ...(typeof prev?.[type] === "object" && prev?.[type] !== null
          ? prev?.[type]
          : {}),
        [key]: value,
      },
    }));
  };

  const updateBookingDetails = (
    type: keyof BookingType,
    value: string | boolean | undefined
  ) => {
    setBooking((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleCheckout = (checked: boolean) => {
    setCheckout(checked);
  };

  const isButtonDisabled = () => {
    const processStep = step.current;
    const tour = product.tours.find((tour) => tour._id === booking.tourId);
    switch (processStep) {
      case 0:
        const { firstname, lastname, phoneNumber, lang, email, birthDate } =
          booking.mainTraveller;
        if (
          firstname === "" ||
          lastname === "" ||
          phoneNumber === "" ||
          lang === "" ||
          email === "" ||
          birthDate === ""
        )
          return true;
        else return false;
      case 1:
        const {
          allergyQuestion: allergy,
          mobilityQuestion: mobility,
          medicalQuestion: medical,
        } = booking.questions;

        const { meetingLocation } = booking;
        // const { isPrivate } = product;

        const { allergyQuestion, mobilityQuestion, medicalQuestion } =
          product.bookingDetails;
        if (
          (allergyQuestion && allergy === "") ||
          (mobilityQuestion && mobility === "") ||
          (medicalQuestion && medical === "") ||
          (!meetingLocation.length && tour?.isPrivate)
        )
          return true;
        else {
          const validationMessages = booking.otherTravellers
            .map((traveler: TravellerState, index: number) => {
              const { firstname, lastname, birthDate } = traveler;
              if (!firstname || !lastname || !birthDate) {
                return `Traveler at index ${index} is missing required fields.`;
              }
              return null;
            })
            .filter(Boolean);
          if (validationMessages.length > 0) return true;
          else return false;
        }
      case 2:
      // if (booking.paymentInfo.checkBooking) return false;
      // else return true;
      case 3:
      // const { cardNumber, expirationDate, securityCode, country, zipCode } =
      //   booking.paymentInfo;
      // if (
      //   cardNumber === "" ||
      //   expirationDate === "" ||
      //   securityCode === "" ||
      //   country === "" ||
      //   zipCode === ""
      // )
      //   return true;
      // else return false;
      default:
        break;
    }
  };

  const handleStepAdvance = async (_id?: string) => {
    if (!emailPattern.test(booking.mainTraveller.email || "")) {
      toast.error("Invalid email");
      return;
    }
    if (step.current < BOOKINGSTEPS.length) {
      setStep((prev) => ({ ...prev, current: prev.current + 1 }));
    }
    if (step.current === BOOKINGSTEPS.length - 2) {
      setCheckout(true);
    }
    if (step.current === BOOKINGSTEPS.length - 1) {
      setClientSecret("");
      if (err === "" || err === undefined) {
        const data: BookingType = {
          ...booking,
        };
        const { payload } = await dispatch(
          type === "create"
            ? createBookingAction(data)
            : updateBookingAction({ ...booking, _id: id as string })
        );
        if (payload?.["error"]) {
          toast.error(payload.error);
          setStep((prev) => ({ ...prev, current: prev.current - 1 }));
        } else if (
          payload?.["message"] &&
          payload.message === "Network Error"
        ) {
          toast.error(payload.message);
          setStep((prev) => ({ ...prev, current: 2 }));
        } else if (payload?.["clientSecret"])
          setClientSecret(payload.clientSecret);
        else if (payload?.["message"]) {
          toast.success(payload.message);
          router.push("/booking/view");
        }
      } else toast.error(err);
    }
    // if (currentStep === BOOKINGSTEPS.length) {
    //   router.push("/booking/create");
    // }
  };

  return {
    isLoading,
    productLoading,
    destinationLoading,
    product,
    booking,
    checkout,
    clientSecret,
    step,
    promo,
    setStep,
    setPromo,
    onStepClick,
    handleBookingDetails,
    handleBookingMintraveler,
    updateNestedBookingDetails,
    updateBookingDetails,
    handleCheckout,
    isButtonDisabled,
    handleStepAdvance,
    applyPromo,
  };
};
