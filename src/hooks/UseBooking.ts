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
  const [booking, setBooking] = useState<BookingType>({
    bookingDetails: {
      ...initalBooking.bookingDetails,
    },
  });
  const [checkout, setCheckout] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [maxStepReached, setMaxStepReached] = useState<number>(0);
  const [err, setErr] = useState<string>("");

  const fetchInitialData = async (id: string) => {
    await dispatch(getMarginAction({}));
    await dispatch(getDestinationTitlesAction({}));
    const { payload } = await dispatch(getProductIdAction(`${id}`));
    if (payload && "startingLocations" in payload) {
      setProduct(payload as ProductDetailState);
      if (type === "create")
        setBooking({
          ...booking,
          bookingDetails: {
            ...booking.bookingDetails,
            mainTraveller: {
              ...booking.bookingDetails.mainTraveller,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
            },
            productId: `${id}`,
            startingLocationId: payload.startingLocations[0]?._id as string,
          },
        });
    }
    if (user.role === "Travel Agent")
      await dispatch(getTravelAgentAction(user._id));
  };

  const fetchBooking = async (id: string) => {
    await dispatch(getMarginAction({}));
    const { payload } = await dispatch(getBookingByIdAction(id));
    if (payload && "bookingDetails" in payload) {
      const bookingDetails: BookingType["bookingDetails"] =
        payload.bookingDetails;
      const { _id, ...newbookingDetails } = bookingDetails;
      setBooking((prev) => ({
        bookingDetails: newbookingDetails,
      }));
      if (payload && "productId" in payload.bookingDetails) {
        await fetchInitialData(payload.bookingDetails.productId);
      }
    }
  };

  useEffect(() => {
    if (type === "create") fetchInitialData(id);
    else fetchBooking(id);
  }, [id]);

  useEffect(() => {
    if (currentStep > maxStepReached) setMaxStepReached(currentStep);
  }, [currentStep, maxStepReached]);

  const onStepClick = (index: number) => {
    setCurrentStep(index);
    if (index === 0) {
      const adult = Number(booking.bookingDetails.adultCount);
      const child = Number(booking.bookingDetails.childCount);
      let otherTravellers = Array.from({ length: adult + child - 1 }).map(
        (_) => ({ firstname: "", lastname: "", birthDate: "" })
      );
      handleBookingDetails("otherTravellers", otherTravellers);
    }
  };

  const handleBookingDetails = (
    key: string,
    value: string | number | TravellerState[]
  ) => {
    if (key === "bookingDate" && typeof value === "string") {
      setBooking((prev) => ({
        ...prev,
        bookingDetails: {
          ...prev.bookingDetails,
          [key]: value,
          startTime: product.timeSlots.times[0],
        },
      }));
    } else {
      setBooking((prev) => ({
        ...prev,
        bookingDetails: {
          ...prev.bookingDetails,
          [key]: value,
        },
      }));
    }
  };

  const handleBookingMintraveler = (phoneNumber: string, country: string) => {
    setBooking((prev) => ({
      ...prev,
      bookingDetails: {
        ...prev.bookingDetails,
        mainTraveller: {
          ...prev.bookingDetails.mainTraveller,
          phoneNumber,
          country,
        },
      },
    }));
  };

  const updateNestedBookingDetails = (
    type: keyof BookingType["bookingDetails"],
    key: string,
    value: string | boolean | undefined
  ) => {
    setBooking((prev) => ({
      ...prev,
      bookingDetails: {
        ...prev.bookingDetails,
        [type]: {
          ...(typeof prev.bookingDetails[type] === "object" &&
          prev.bookingDetails[type] !== null
            ? prev.bookingDetails[type]
            : {}),
          [key]: value,
        },
      },
    }));
  };

  const updateBookingDetails = (
    type: keyof BookingType["bookingDetails"],
    value: string | boolean | undefined
  ) => {
    setBooking((prev) => ({
      ...prev,
      bookingDetails: {
        ...prev.bookingDetails,
        [type]: value,
      },
    }));
  };

  const handleCheckout = (checked: boolean) => {
    setCheckout(checked);
  };

  const isButtonDisabled = () => {
    const processStep = currentStep;
    switch (processStep) {
      case 0:
        const { firstname, lastname, phoneNumber, lang, email, birthDate } =
          booking.bookingDetails.mainTraveller;
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
        } = booking.bookingDetails.questions;

        const { meetingLocation } = booking.bookingDetails;
        const { isPrivate } = product;

        const { allergyQuestion, mobilityQuestion, medicalQuestion } =
          product.bookingDetails;
        if (
          (allergyQuestion && allergy === "") ||
          (mobilityQuestion && mobility === "") ||
          (medicalQuestion && medical === "") ||
          (!meetingLocation.length && isPrivate)
        )
          return true;
        else {
          const validationMessages = booking.bookingDetails.otherTravellers
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
    if (!emailPattern.test(booking.bookingDetails.mainTraveller.email || "")) {
      toast.error("Invalid email");
      return;
    }
    if (currentStep < BOOKINGSTEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
    if (currentStep === BOOKINGSTEPS.length - 2) {
      setCheckout(true);
    }
    if (currentStep === BOOKINGSTEPS.length - 1) {
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
          setCurrentStep(currentStep - 1);
        } else if (
          payload?.["message"] &&
          payload.message === "Network Error"
        ) {
          toast.error(payload.message);
          setCurrentStep(2);
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
  };
};
