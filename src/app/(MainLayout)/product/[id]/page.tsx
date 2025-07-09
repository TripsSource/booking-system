"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import CostDetails from "@/components/Product/CostDetails";
import ProductDetail from "@/components/Product/ProductDetail";
import BookingDetails from "@/components/Product/BookingDetails";
import PictureInsertion from "@/components/Product/PictureInsertion";
import ContentWriterArea from "@/components/Product/ContentWriterArea";
import AvailabilityAndPricing from "@/components/Product/AvailabilityAndPricing";

import {
  ProductDetailState,
  ProductCostState,
  timeSlotsState,
  onlineMapState,
  ProductBookingDetailsState,
  ProductLocationState,
  ProductGuideState,
  ProductSuppliersState,
} from "@/types/app/product";
import { PRODUCTSTEPS, SMALLGROUP_TOUR_DEFAULT } from "@/constants/data";
import {
  getProductIdAction,
  crateProductAction,
  updateProductAction,
  productLoadingState,
} from "@/store/products";
import {
  destinationTitlesState,
  getDestinationTitlesAction,
} from "@/store/destination";

import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import PageLoader from "@/layouts/PageLoader";
import LoadingButton from "@/Common/LoadingButton";
import { readDestinationTitleType } from "@/types/store/destination";
import RoleProvider from "@/providers/RoleProvider";

import {
  initialCost,
  initialProduct,
} from "@/app/(MainLayout)/product/InitialProductState";
import GuideDetails from "@/components/Product/GuideDetails";
import SupplierDetails from "@/components/Product/SupplierDetails";
import { getSuppliersAction } from "@/store/contacts";

const ReadIdProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const getIdProduct = async () => {
    const { payload } = await dispatch(getProductIdAction(`${id}`));
    if (!payload || "error" in payload) {
      toast.error(`${payload?.error || "An unknown error occurred"}`);
    } else {
      if (
        "images" in payload &&
        "destination" in payload &&
        payload.destination
      )
        setProduct({
          ...product,
          ...payload,
          currentImages: payload.images.map((file: any) =>
            typeof file === "string" ? file : file.name || ""
          ),
          destination: payload.destination,
          images: [],
        });
    }
    await dispatch(getSuppliersAction({}));
  };

  useEffect(() => {
    getIdProduct();
  }, [id]);

  useEffect(() => {
    dispatch(getDestinationTitlesAction({}));
  }, []);
  const [stepTab, setStepTab] = useState(0);

  const handleStepTab = (
    _e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    step: React.SetStateAction<number>
  ) => {
    setStepTab(step);
  };

  const loading = useSelector(productLoadingState);
  const desitnation = useSelector(destinationTitlesState);

  const [product, setProduct] = useState<ProductDetailState>(initialProduct);

  const handleProduct = (
    param: string,
    value:
      | Date
      | string
      | boolean
      | timeSlotsState
      | onlineMapState
      | ProductBookingDetailsState
      | File[]
      | string[]
      | ProductCostState[]
      | ProductGuideState[]
      | ProductSuppliersState[]
  ) => {
    setProduct({ ...product, [param]: value });
  };

  const saveProduct = async () => {
    if (product._id && product._id.length < 1) {
      const { payload } = await dispatch(crateProductAction(product));
      if (payload.error) {
        toast.error(`${payload.error}`);
      } else {
        toast.success(`${payload.message}`);
        setProduct(initialProduct);
      }
    } else {
      const { payload } = await dispatch(updateProductAction(product));
      if (payload.error) {
        toast.error(`${payload.error}`);
      } else {
        getIdProduct();
        toast.success(`${payload.message}`);
      }
    }
  };

  const handleLocations = (i: number, param: string, value: string) => {
    const sameDestination = product.startingLocations.filter(
      (location: ProductLocationState) => location._id === value
    );
    let newLocations = product.startingLocations;
    if (sameDestination.length > 0) {
      newLocations = newLocations.map((location: ProductLocationState) => {
        if (sameDestination[0]._id === location._id)
          return { ...location, _id: product.startingLocations[i]._id };
        else return location;
      });
    }
    const startingLocations = newLocations.map(
      (location: ProductLocationState, index: number) => {
        if (index === i) return { ...location, [param]: value };
        else return location;
      }
    );
    if (param === "_id") {
      const revenues = product.revenues.map(
        (revenue: ProductCostState, index: number) => ({
          ...revenue,
          startingLocationId: startingLocations[index]._id,
        })
      );
      const guideDetails = product.guideDetails.map(
        (guide: ProductGuideState, index: number) => ({
          ...guide,
          startingLocationId: startingLocations[index]._id,
        })
      );
      const suppliers = product.suppliers.map((supplier, index) => ({
        ...supplier,
        startingLocationId: startingLocations[index]._id,
      }));
      setProduct({
        ...product,
        startingLocations,
        revenues,
        guideDetails,
        suppliers,
      });
    } else {
      setProduct({ ...product, startingLocations });
    }
  };

  const removeLocations = (i: number) => {
    const startingLocations = product.startingLocations.filter(
      (_, index) => index !== i
    );
    const revenues = product.revenues.filter((_, index) => index !== i);
    const guideDetails = product.guideDetails.filter((_, index) => index !== i);
    const suppliers = product.suppliers.filter((_, index) => index !== i);
    setProduct({
      ...product,
      startingLocations,
      revenues,
      guideDetails,
      suppliers,
    });
  };

  const addLocations = () => {
    const destinations = desitnation.filter(
      (item: readDestinationTitleType) =>
        !product.startingLocations.some(
          (location: ProductLocationState) => location._id === item._id
        )
    );
    setProduct({
      ...product,
      startingLocations: [
        ...product.startingLocations,
        { _id: destinations[0]._id, meetingLocation: "", durationHours: "" },
      ],
      revenues: [
        ...product.revenues,
        { ...initialCost, startingLocationId: destinations[0]._id },
      ],
      guideDetails: [
        ...product.guideDetails,
        {
          startingLocationId: destinations[0]._id,
          itineraryStops: [
            {
              position: "",
              pointsToCover: "",
            },
          ],
        },
      ],
      suppliers: [
        ...product.suppliers,
        {
          startingLocationId: destinations[0]._id,
          contacts: [{ supplierId: "", timeSlot: "" }],
        },
      ],
    });
  };

  useEffect(() => {
    handleProduct(
      "members",
      product.isPrivate ? "" : SMALLGROUP_TOUR_DEFAULT.toString()
    );
  }, [product.isPrivate]);

  useEffect(() => {
    const current = product.currentImages?.filter(
      (item) => !product.deletedImages?.includes(item)
    );
    handleProduct("currentImages", current || []);
  }, [product.deletedImages]);

  return (
    <RoleProvider target="Product">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header mb-3">
            <div className="d-flex justify-content-between">
              <h3>Update a Product (Multi-Step)</h3>
              <div className="d-flex">
                <div className="form-check form-switch d-flex">
                  <label
                    className="form-check-label mx-5 mt-2"
                    htmlFor="live_status"
                  >
                    {product.liveStatus ? "Live" : "Not Live"}
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
                    checked={product.liveStatus}
                    onChange={(e) =>
                      handleProduct("liveStatus", e.target.checked)
                    }
                  />
                </div>
                <LoadingButton
                  {...{
                    loading,
                    func: saveProduct,
                    title: "Update Product",
                    classes: "btn btn-primary btn-block w-10 m-l-20",
                  }}
                />
                {/* <button
                        className="btn btn-primary btn-block w-10 m-l-20"
                        type="button"
                        onClick={handleDownload}
                      >
                        Download PDF
                      </button> */}
              </div>
            </div>
            {loading ? (
              <PageLoader />
            ) : (
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="card">
                          <div className="">
                            <ul className="nav nav-tabs w-100">
                              {PRODUCTSTEPS.map(
                                (step: { count: number; label: string }) => (
                                  <li className="nav-item" key={step.count}>
                                    <a
                                      className={`nav-link ${
                                        stepTab === step.count ? "active" : null
                                      }`}
                                      aria-current="page"
                                      href="#"
                                      onClick={(e) =>
                                        handleStepTab(e, step.count)
                                      }
                                    >
                                      {step.label}
                                    </a>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                          <div className="card-body">
                            {stepTab === 0 && (
                              <>
                                <ProductDetail
                                  {...{
                                    product,
                                    handleProduct,
                                    handleLocations,
                                    addLocations,
                                    removeLocations,
                                  }}
                                />
                                <AvailabilityAndPricing
                                  {...{
                                    product,
                                    handleProduct,
                                  }}
                                />
                              </>
                            )}
                            {stepTab === 1 && (
                              <ContentWriterArea {...{ product }} />
                            )}
                            {stepTab === 2 && (
                              <PictureInsertion
                                {...{ product, handleProduct }}
                              />
                            )}
                            {stepTab === 3 && (
                              <CostDetails {...{ product, handleProduct }} />
                            )}
                            {stepTab === 4 && (
                              <BookingDetails
                                {...{
                                  product,
                                  handleProduct,
                                }}
                              />
                            )}
                            {stepTab === 5 && (
                              <GuideDetails {...{ product, handleProduct }} />
                            )}
                            {stepTab === 6 && (
                              <SupplierDetails
                                {...{ product, handleProduct }}
                              />
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
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleProvider>
  );
};

export default ReadIdProduct;
