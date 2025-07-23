"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch } from "@/store";
import CostDetails from "@/components/Product/CostDetails";
import ProductDetail from "@/components/Product/ProductDetail";
import BookingDetails from "@/components/Product/BookingDetails";
import PictureInsertion from "@/components/Product/PictureInsertion";
import ContentWriterArea from "@/components/Product/ContentWriterArea";
import AvailabilityAndPricing from "@/components/Product/AvailabilityAndPricing";

import {
  ProductDetailState,
  ProductBookingDetailsState,
  ProductTourState,
  ProductRevenueState,
  onlineMapState,
  ProductSupplierState,
  ProductGuideDetailState,
} from "@/types/app/product";
import { PRODUCTSTEPS, SMALLGROUP_TOUR_DEFAULT } from "@/constants/data";
import { crateProductAction, productLoadingState } from "@/store/products";
import { destinationTitlesState } from "@/store/destination";
import { getDestinationTitlesAction } from "@/store/destination";
import { readDestinationTitleType } from "@/types/store/destination";
import RoleProvider from "@/providers/RoleProvider";
import {
  initialTour,
  initialProduct,
} from "@/app/(MainLayout)/product/InitialProductState";
import GuideDetails from "@/components/Product/GuideDetails";
import SupplierDetails from "@/components/Product/SupplierDetails";
import { getSuppliersAction } from "@/store/contacts";
import LoadingAuthButton from "@/Common/LoadingAuthButton";

const CreateProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [stepTab, setStepTab] = useState(0);

  const handleStepTab = (
    _e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    step: React.SetStateAction<number>
  ) => {
    setStepTab(step);
  };

  const loading = useSelector(productLoadingState);
  const [product, setProduct] = useState<ProductDetailState>(initialProduct);

  useEffect(() => {
    const getDestinationTitles = async () => {
      const { payload } = await dispatch(getDestinationTitlesAction({}));
      await dispatch(getSuppliersAction({}));
      if (payload?.["data"]) formatProduct(payload.data[0]._id);
    };
    getDestinationTitles();
  }, []);

  const desitnation = useSelector(destinationTitlesState);

  const handleProduct = (
    type: string,
    value:
      | Date
      | string
      | boolean
      | onlineMapState
      | ProductBookingDetailsState
      | File[]
      | string[]
      | ProductTourState[]
      | { startDate: string; endDate: string }[]
  ) => {
    setProduct({ ...product, [type]: value });
  };

  const handleTours = (
    i: number,
    type: string,
    value:
      | string
      | boolean
      | number
      | ProductRevenueState
      | string[]
      | ProductSupplierState[]
      | ProductGuideDetailState[]
  ) =>
    handleProduct(
      "tours",
      product.tours.map((tour: ProductTourState, index: number) => {
        if (i === index) {
          return {
            ...tour,
            [type]: value,
            ...(type === "isPrivate"
              ? {
                  members: value ? "" : SMALLGROUP_TOUR_DEFAULT.toString(),
                  meetingLocation: "",
                }
              : {}),
          };
        } else {
          return tour;
        }
      })
    );

  const addTour = () => {
    let destinations: { _id: string }[] = [];
    product.tours.forEach((tour) => {
      const count = product.tours.filter(
        (pTour) => pTour.destinationId === tour.destinationId
      ).length;
      if (count < 4) destinations.push({ _id: tour.destinationId });
    });
    if (destinations.length < 1)
      destinations = desitnation.filter(
        (desitnation: readDestinationTitleType) =>
          !product.tours.some(
            (tour: ProductTourState) => tour.destinationId === desitnation._id
          )
      );
    const newTours = [
      ...product.tours,
      { ...initialTour, destinationId: destinations[0]._id },
    ];
    handleProduct("tours", newTours);
  };

  const removeTour = (i: number) => {
    const tours = product.tours.filter((_, index) => index !== i);
    handleProduct("tours", tours);
  };

  const formatProduct = (Id: string) => {
    setProduct({
      ...initialProduct,
      destinationId: Id,
      tours: [{ ...initialTour, destinationId: Id }],
    });
  };

  const saveProduct = async () => {
    const { payload } = await dispatch(crateProductAction(product));
    if (payload.error) {
      toast.error(`${payload.error}`);
    } else {
      toast.success(`${payload.message}`);
      formatProduct(desitnation[0]._id);
    }
  };

  return (
    <RoleProvider target="Product">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header mb-3">
            <div className="d-flex justify-content-between">
              <div>
                <h3>Create a new Product (Multi-Step)</h3>
              </div>
              <div className="d-flex">
                <div className="form-check form-switch d-flex">
                  <label
                    className="form-check-label mx-5 mt-2"
                    htmlFor="live_status"
                  >
                    {product.isActive ? "Live" : "Not Live"}
                  </label>
                  <input
                    className="form-check-input"
                    style={{
                      width: "60px",
                      height: "30px",
                    }}
                    type="checkbox"
                    role="switch"
                    id="live_status"
                    checked={product.isActive}
                    onChange={(e) =>
                      handleProduct("isActive", e.target.checked)
                    }
                  />
                </div>
                <LoadingAuthButton
                  {...{
                    loading,
                    onFunc: saveProduct,
                    title: "Save Product",
                    classes: "btn btn-primary btn-block w-10 m-l-20",
                    disabled: product.name === "",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="">
              <ul className="nav nav-tabs w-100">
                {PRODUCTSTEPS.map((step) => (
                  <li className="nav-item" key={step.count}>
                    <a
                      className={`nav-link ${
                        stepTab === step.count ? "active" : null
                      }`}
                      aria-current="page"
                      href="#"
                      onClick={(e) => handleStepTab(e, step.count)}
                    >
                      {step.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-body">
              {stepTab === 0 && (
                <>
                  <ProductDetail
                    {...{
                      product,
                      handleProduct,
                      handleTours,
                      addTour,
                      removeTour,
                    }}
                  />
                  <AvailabilityAndPricing {...{ product, handleProduct }} />
                </>
              )}
              {stepTab === 1 && <ContentWriterArea {...{ product }} />}
              {stepTab === 2 && (
                <PictureInsertion {...{ product, handleProduct }} />
              )}
              {stepTab === 3 && <CostDetails {...{ product, handleTours }} />}
              {stepTab === 4 && (
                <BookingDetails {...{ product, handleProduct }} />
              )}
              {stepTab === 5 && <GuideDetails {...{ product, handleTours }} />}
              {stepTab === 6 && (
                <SupplierDetails {...{ product, handleTours }} />
              )}
            </div>
            <div className="d-flex justify-content-between mb-3 m-l-10 m-r-10">
              <button
                className="btn btn-primary"
                disabled={stepTab === 0}
                onClick={() => setStepTab(stepTab - 1)}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                disabled={stepTab === PRODUCTSTEPS.length - 1}
                onClick={() => setStepTab(stepTab + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </RoleProvider>
  );
};

export default CreateProduct;
