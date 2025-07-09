"use client";
import { AppDispatch } from "@/store";
import { getProductsAction, productsState } from "@/store/products";
import {
  getProductRevenueAction,
  loadingState,
  revenueState,
} from "@/store/financial";
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "@/layouts/PageLoader";

const RevenueInput = ({
  label,
  value,
  autoField,
  func,
}: {
  label: string;
  value?: number | undefined;
  autoField?: boolean;
  func?: () => void;
}) => (
  <>
    <label className="form-label-title text-nowrap">{`${label} (₣)`}</label>
    <input
      type="number"
      min={0}
      value={value?.toFixed(2) || ""}
      placeholder={autoField ? "Calculated automatically" : "Enter amount"}
      className="form-control"
      readOnly={autoField}
    />
  </>
);

const Revenue = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(productsState);
  const loading = useSelector(loadingState);
  const [productId, setProductId] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (products.length < 2 || !Array.isArray(products))
      dispatch(getProductsAction({ page: 1, perPage: 100 }));
  }, []);

  useEffect(() => {
    if (productId !== "") {
      (async () => {
        const { payload } = await dispatch(getProductRevenueAction(productId));
        console.log(payload);
      })();
    }
  }, [productId]);

  const product = useSelector(revenueState);
  const { revenues } = product;

  return (
    <>
      <div className="mb-5">
        <label className="form-label-title ">
          <strong>Revenues</strong>
        </label>
        <hr className="hr" />
        <div className="d-flex justify-content-between align-items-center g-4">
          <select
            className="form-control"
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value={""}>Select Product</option>
            {products.map((product, index) => (
              <option key={index} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {productId === "" ? null : !revenues || loading ? (
        <PageLoader />
      ) : (
        <form className="theme-form mega-form">
          <ul className="nav nav-tabs mb-3">
            {revenues.map((revenue, index) => (
              <li className="nav-item" key={index}>
                <a
                  className={`nav-link ${
                    activeTab === index ? "active bg-primary text-white" : ""
                  }`}
                  href="#"
                  aria-current="page"
                  onClick={() => setActiveTab(index)}
                >
                  {revenue.startingLocationId.destinationTitle}
                </a>
              </li>
            ))}
          </ul>
          <div className="mb-5">
            <label className="form-label-title ">
              <strong>Fixed Costs</strong>
            </label>
            <hr className="hr" />
            <div className="row">
              <div className="col-sm-4">
                <RevenueInput
                  {...{
                    label: "Guide Cost",
                    value: revenues[activeTab]?.guideCost,
                  }}
                />
              </div>
              <div className="col-sm-4">
                <RevenueInput
                  {...{
                    label: "Driver Cost",
                    value: revenues[activeTab]?.driverCost,
                  }}
                />
              </div>
              <div className="col-sm-4">
                <RevenueInput
                  {...{
                    label: "Total Fixed Cost",
                    autoField: true,
                    value: revenues[activeTab]?.totalFixedCost,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label className="form-label-title">
              <strong>Fixed Cost Mark-up & Earnings</strong>
            </label>
            <hr className="hr" />
            <div className="row">
              <div className="col-sm-6">
                <RevenueInput
                  {...{
                    label: "Fixed Cost Mark-up Total",
                    value: revenues[activeTab]?.fixedCostMarkup,
                  }}
                />
              </div>
              <div className="col-sm-6">
                <RevenueInput
                  {...{
                    label: "Earnings",
                    value: revenues[activeTab]?.earnings,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label className="form-label-title">
              <strong>Product Costs</strong>
            </label>
            <hr className="hr" />
            <div className="row">
              <div className="col-sm-4">
                <RevenueInput
                  {...{
                    label: "Individual",
                    value: revenues[activeTab]?.totalIndividualCost,
                  }}
                />
              </div>
              <div className="col-sm-4">
                <RevenueInput
                  {...{
                    label: "Bulk",
                    value: revenues[activeTab]?.totalBulkCost,
                  }}
                />
              </div>
              <div className="col-sm-4">
                <RevenueInput
                  {...{
                    label: "Child",
                    value: revenues[activeTab]?.childrenCost,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label className="form-label-title">
              <strong>Retail Prices</strong>
            </label>
            <hr className="hr" />
            <div className="row">
              <div className="col-sm-4">
                <RevenueInput
                  {...{
                    label: "Total Retail Price",
                    value: revenues[activeTab]?.totalRetailPrice,
                  }}
                />
              </div>
              <div className="col-sm-4">
                <RevenueInput
                  {...{
                    label: "Total Retail Price Per Person",
                    value: revenues[activeTab]?.totalRetailPricePerPerson,
                  }}
                />
              </div>
              <div className="col-sm-4">
                <RevenueInput
                  {...{
                    label: "Child Retail Price",
                    value: revenues[activeTab]?.childRetailPrice,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-1">
            <label className="form-label-title">
              <strong>OTA Prices</strong>
            </label>
            <hr className="hr" />
            {revenues[activeTab].otaPrices.map((ota, index) => (
              <div className="row mt-2" key={index}>
                <div className="col-sm-4">
                  <RevenueInput
                    {...{
                      label: `${ota.otaName} Price Total`,
                      value: ota.otaPriceTotal,
                    }}
                  />
                </div>
                <div className="col-sm-4">
                  <RevenueInput
                    {...{
                      label: `${ota.otaName} Price Per Person`,
                      value: ota.otaPricePerPerson,
                    }}
                  />
                </div>
                <div className="col-sm-4">
                  <RevenueInput
                    {...{
                      label: `${ota.otaName} Child Price`,
                      value: ota.otaChildPrice,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      )}
    </>
  );
};

export default Revenue;
