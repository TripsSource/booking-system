import PageLoader from "@/layouts/PageLoader";
import { marginState, OTAState } from "@/store/financial";
import { productIdLoadingState, productLoadingState } from "@/store/products";
import { ProductDetailState } from "@/types/app/product";
import { readProductState } from "@/types/store/products";
import moment from "moment";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { useSelector } from "react-redux";

function OtaProducts({
  products,
  selectedProduct,
  getProduct,
  otaType,
  sort,
  order,
  handleSortOrder,
}: {
  products: readProductState[];
  selectedProduct: ProductDetailState;
  getProduct: (id: string) => void;
  otaType: string;
  sort: string;
  order: string;
  handleSortOrder: (value: string) => void;
}) {
  const mProducts = useMemo(() => products, [products]);
  const mSelectedProduct = useMemo(() => selectedProduct, [selectedProduct]);
  const {
    _id,
    timeSlots,
    description,
    destinationTitle,
    name,
    isPrivate,
    members,
    revenues,
    startingLocations,
    guideDetails,
  } = mSelectedProduct;
  const margin = useSelector(marginState);
  const otaMargins = useSelector(OTAState);
  const selectedRevenue = useCallback(
    (id: string) =>
      revenues.find((revenue) => revenue.startingLocationId === id),
    [revenues]
  );

  const productLoading = useSelector(productLoadingState);
  const productIdLoading = useSelector(productIdLoadingState);

  const productTitles = [
    { label: "Name", value: "name" },
    { label: "Destination", value: "destination.destinationTitle" },
    { label: "Total Tours", value: "options" },
    { label: "Available Date", value: "timeSlots.endDate" },
    { label: "Tour Type", value: "isPrivate" },
  ];

  const calculateMargin = (
    startingLocations: any,
    startingLocationId: string
  ) => {
    const shortTour = parseFloat(margin.shortMarkup);
    const mediumTour = parseFloat(margin.mediumMarkup);
    const longTour = parseFloat(margin.longMarkup);
    const duration = Number(
      startingLocations.find(
        (location: any) => location._id === startingLocationId
      ).durationHours
    );
    if (duration >= 1 && duration < 5) {
      return shortTour;
    } else if (duration >= 5 && duration < 10) {
      return mediumTour;
    } else {
      return longTour;
    }
  };

  const calculateOtaMargin = (
    otaName: string,
    startingLocations: any,
    startingLocationId: string
  ) => {
    const selectedOta = otaMargins.find((margin) => margin.otaName === otaName);
    const shortTour = parseFloat(selectedOta?.shortMarkup ?? "0");
    const longTour = parseFloat(selectedOta?.dayMarkup ?? "0");
    const duration = Number(
      startingLocations.find(
        (location: any) => location._id === startingLocationId
      ).durationHours
    );

    if (duration >= 1 && duration < 6) {
      return shortTour;
    } else {
      return longTour;
    }
  };

  return (
    <div className="row">
      <div className={selectedProduct && name ? "col-sm-8" : "col-sm-12"}>
        <table className="user-table table table-striped">
          <thead>
            <tr>
              <th className="text-center">Avatar</th>
              {productTitles.map((title, index) => (
                <th
                  key={index}
                  className="text-center text-nowrap"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortOrder(title.value)}
                >
                  <div className="d-flex justify-content-center align-items-center">
                    {title.label}
                    {title.value === sort && order === "asc" && (
                      <FaSortUp className="mt-2" />
                    )}
                    {title.value === sort && order === "desc" && (
                      <FaSortDown className="mb-2" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productLoading ? (
              <tr>
                <td colSpan={6}>
                  <PageLoader />
                </td>
              </tr>
            ) : (
              mProducts.map((product, index) => (
                <tr key={index} onClick={() => getProduct(product._id)}>
                  <td className="text-center">
                    {product.image && product.image.length > 0 && (
                      <Image
                        src={`${product.image}`}
                        width={50}
                        height={50}
                        alt={`${product.image}`}
                      />
                    )}
                  </td>
                  <td className="text-center" style={{ cursor: "pointer" }}>
                    {product.name}
                  </td>
                  <td className="text-center" style={{ cursor: "pointer" }}>
                    {product.destination}
                  </td>
                  <td className="text-center" style={{ cursor: "pointer" }}>
                    {product.options}
                  </td>
                  <td className="text-center" style={{ cursor: "pointer" }}>
                    {moment(new Date(product.availableDate ?? "")).format(
                      "DD/MM/YYYY"
                    )}
                  </td>
                  <td className="text-center" style={{ cursor: "pointer" }}>
                    {product.isPrivate ? "Private" : "Small Group"} Tour
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {productIdLoading ? (
        <PageLoader />
      ) : (
        destinationTitle &&
        name && (
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <label className="form-label-title">
                  {destinationTitle + ": " + name}
                </label>
                <div className="mt-3 mb-1">
                  <label className="form-label-title">Product Detail</label>
                  <div className="border p-2">
                    <div>
                      <label className="form-label-title">Title:</label>
                      <span className="mx-1">{name}</span>
                    </div>
                    <div>
                      <label className="form-label-title">Destiantion:</label>
                      <span className="mx-1">{destinationTitle}</span>
                    </div>
                    <div>
                      <label className="form-label-title">Description:</label>
                      <span className="mx-1">{description}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="mt-3 mb-1"
                  style={{ maxHeight: "520px", overflowY: "auto" }}
                >
                  <label className="form-label-title">Options</label>
                  {startingLocations &&
                    startingLocations.length > 0 &&
                    startingLocations.map((location, index) => (
                      <div className="border p-2 mb-4" key={index}>
                        <div className="mt-2">
                          <label className="form-label-title">
                            Meeting Location {index + 1}:
                          </label>
                          <span className="form-control">
                            {location.startingLocationName}
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">Title:</label>
                          <span className="form-control">{name}</span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">
                            Destiantion:
                          </label>
                          <span className="form-control">
                            {destinationTitle}
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">Duration:</label>
                          <span className="form-control">
                            {location.durationHours} Hour(s)
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">Type:</label>
                          <span className="form-control">
                            {isPrivate ? "Private" : "Small Group"} Tour
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">
                            External product ID:
                          </label>
                          <span className="form-control">
                            {otaType === "Project" || otaType === "Musement"
                              ? location._id
                              : _id + "_" + location._id}
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">
                            Available until:
                          </label>
                          <span className="form-control">
                            {timeSlots &&
                              moment(new Date(timeSlots.endDate)).format(
                                "DD/MM/YYYY"
                              )}
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">
                            Participants:
                          </label>
                          <span className="form-control">1 - {members}</span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">
                            Retail price:
                          </label>
                          <span className="form-control">
                            CHF{" "}
                            {Math.ceil(
                              Number(
                                selectedRevenue(location._id)?.childrenCost ?? 0
                              ) *
                                Number(
                                  calculateMargin(
                                    startingLocations,
                                    location._id
                                  ) ?? 0
                                ) *
                                Number(
                                  calculateOtaMargin(
                                    otaType,
                                    startingLocations,
                                    location._id
                                  ) ?? 0
                                ) *
                                100
                            ) / 100 || "0.00"}{" "}
                            / Child, CHF{" "}
                            {Math.ceil(
                              Number(selectedRevenue(location._id)?.total) *
                                Number(
                                  calculateMargin(
                                    startingLocations,
                                    location._id
                                  ) ?? 0
                                ) *
                                Number(
                                  calculateOtaMargin(
                                    otaType,
                                    startingLocations,
                                    location._id
                                  ) ?? 0
                                ) *
                                100
                            ) / 100 || "0.00"}{" "}
                            / Adult
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">
                            GuideDetails:
                          </label>
                          {guideDetails[index].itineraryStops.map((stop) => (
                            <span className="form-control">
                              {stop.position} - {stop.pointsToCover}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default OtaProducts;
