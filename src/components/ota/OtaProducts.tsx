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
  const mProducts = useMemo(() => products, [products]).filter(
    (product) => product.isActive
  );
  const mSelectedProduct = useMemo(() => selectedProduct, [selectedProduct]);
  const {
    _id,
    description,
    destinationTitle,
    name,
    tours,
    endDate,
    shortDescription,
    otaLive,
  } = mSelectedProduct;
  const margin = useSelector(marginState);
  const otaMargins = useSelector(OTAState);

  const productLoading = useSelector(productLoadingState);
  const productIdLoading = useSelector(productIdLoadingState);

  const productTitles = [
    { label: "Name", value: "name" },
    { label: "Destination", value: "destinationId.destinationTitle" },
    { label: "Total Tours", value: "options" },
    { label: "Available Date", value: "startDate" },
  ];

  const calculateMargin = (duration: number) => {
    const shortTour = parseFloat(margin.shortMarkup);
    const mediumTour = parseFloat(margin.mediumMarkup);
    const longTour = parseFloat(margin.longMarkup);
    if (duration >= 1 && duration < 5) {
      return shortTour;
    } else if (duration >= 5 && duration < 10) {
      return mediumTour;
    } else {
      return longTour;
    }
  };

  const calculateOtaMargin = (otaName: string, duration: number) => {
    const selectedOta = otaMargins.find((margin) => margin.otaName === otaName);
    const shortTour = parseFloat(selectedOta?.shortMarkup ?? "0");
    const longTour = parseFloat(selectedOta?.dayMarkup ?? "0");
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
                    {product.tours}
                  </td>
                  <td className="text-center" style={{ cursor: "pointer" }}>
                    {moment(new Date(product.startDate ?? "")).format(
                      "DD/MM/YYYY"
                    )}
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
                    </div>{" "}
                    <div>
                      <label className="form-label-title">
                        Short Description:
                      </label>
                      <span className="mx-1">{shortDescription}</span>
                    </div>
                    <div>
                      <label className="form-label-title">Description:</label>
                      <span className="mx-1">{description}</span>
                    </div>
                    <div>
                      <label className="form-label-title">
                        External ID(Code):
                      </label>
                      <span className="mx-1">
                        {otaLive.find((ota) => ota.otaName === otaType)?.id}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="mt-3 mb-1"
                  style={{ maxHeight: "520px", overflowY: "auto" }}
                >
                  <label className="form-label-title">Options</label>
                  {tours &&
                    tours.length > 0 &&
                    tours.map((tour, index) => (
                      <div className="border p-2 mb-4" key={index}>
                        <div className="mt-2">
                          <label className="form-label-title">
                            Meeting Location {index + 1}:
                          </label>
                          <span className="form-control">
                            {tour.meetingLocation}
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
                            {tour.duration} Hour(s)
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">Type:</label>
                          <span className="form-control">
                            {tour.isPrivate ? "Private" : "Small Group"} Tour
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">
                            External product ID:
                          </label>
                          <span className="form-control">
                            {
                              tour.otaLive.find(
                                (ota) => ota.otaName === otaType
                              )?.id
                            }
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">
                            Available until:
                          </label>
                          <span className="form-control">
                            {endDate
                              ? moment(new Date(endDate)).format("DD/MM/YYYY")
                              : "Forever"}
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">
                            Participants:
                          </label>
                          <span className="form-control">
                            1 - {tour.members}
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="form-label-title">
                            Retail price:
                          </label>
                          <span className="form-control">
                            CHF{" "}
                            {Math.ceil(
                              ((tour.revenue.totalBulkCost ?? 0) +
                                (tour.revenue.totalBulkCost ?? 0)) *
                                Number(
                                  calculateMargin(Number(tour.duration)) ?? 0
                                ) *
                                Number(
                                  calculateOtaMargin(
                                    otaType,
                                    Number(tour.duration)
                                  ) ?? 0
                                ) *
                                100
                            ) / 100 || "0.00"}{" "}
                            / Child, CHF{" "}
                            {Math.ceil(
                              Number(tour.revenue.childrenCost ?? 0) *
                                Number(
                                  calculateMargin(Number(tour.duration)) ?? 0
                                ) *
                                Number(
                                  calculateOtaMargin(
                                    otaType,
                                    Number(tour.duration)
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
                          {tour.guideDetails.map((stop) => (
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
