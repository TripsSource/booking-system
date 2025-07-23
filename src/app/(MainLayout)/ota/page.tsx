"use client";
import React, { useEffect, useState } from "react";
import { OtaProfile, OtaState } from "@/types/app/ota";
import { initialOTA } from "./initialOtaState";
import RoleProvider from "@/providers/RoleProvider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  getProductIdAction,
  getProductsAction,
  productLoadingState,
} from "@/store/products";
import { ProductDetailState } from "@/types/app/product";
import { bookingsLoadingState, getOtaBookingsAction } from "@/store/ota";
import PurePagination from "@/Common/PurePagination";
import OtaProducts from "@/components/ota/OtaProducts";
import OtaBookings from "@/components/ota/OtaBookings";
import { getMarginAction, getOTASAction } from "@/store/financial";

const otaTypes = [
  { label: "GetYourGuide", value: "get-your-guide" },
  { label: "Viator", value: "viator" },
  { label: "Project", value: "project" },
  { label: "Musement", value: "musement" },
];
const page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedOTA, setSelectedOTA] = useState<{
    label: string;
    value: string;
  }>(otaTypes[0]);
  const [selectedPanel, setSelectedPanel] = useState<string>("Products");
  const [ota, setOta] = useState<OtaState>(initialOTA);
  const [selectedProduct, setSelectedProduct] = useState(
    {} as ProductDetailState
  );
  const productLoading = useSelector(productLoadingState);
  const bookingLoading = useSelector(bookingsLoadingState);
  const checkProduct = selectedPanel === "Products";

  const [products, setProducts] = useState({
    data: [],
    page: 1,
    perPage: 10,
    totalPages: 0,
    totalCount: 0,
    search: "",
    sort: "",
    order: "",
  });

  const [bookings, setBookings] = useState({
    data: [],
    page: 1,
    perPage: 10,
    totalPages: 0,
    totalCount: 0,
    search: "",
    sort: "",
    order: "",
  });

  const {
    page: productPage,
    perPage: productPerPage,
    totalPages: productTotalPages,
    order: productOrder,
    sort: productSort,
  } = products;

  const {
    page: bookingPage,
    perPage: bookingPerPage,
    totalPages: bookingTotalPages,
    sort: bookingSort,
    order: bookingOrder,
  } = bookings;

  useEffect(() => {
    const fetchDataMargin = async () => {
      await dispatch(getMarginAction({}));
      await dispatch(getOTASAction({}));
    };
    fetchDataMargin();
  }, []);

  useEffect(() => {
    fetchData();
    if (selectedProduct && checkProduct)
      setSelectedProduct({} as ProductDetailState);
  }, [
    selectedPanel,
    productPage,
    productPerPage,
    productOrder,
    productSort,
    bookingPage,
    bookingPerPage,
    bookingSort,
    bookingOrder,
  ]);

  useEffect(() => {
    if (selectedPanel !== "Products") fetchData();
  }, [selectedOTA.label]);

  const handleOta = (type: string, value: string | string[] | OtaProfile) => {
    setOta({ ...ota, [type]: value });
  };

  const fetchData = async () => {
    if (selectedPanel === "Products") {
      const { payload } = await dispatch(
        getProductsAction({
          page: productPage,
          perPage: productPerPage,
          sort: productSort,
          order: productOrder,
        })
      );
      if (payload?.["data"]) setProducts((pre) => ({ ...pre, ...payload }));
    } else if (selectedPanel === "Bookings") {
      const { payload } = await dispatch(
        getOtaBookingsAction({
          url: selectedOTA.value,
          page: bookingPage,
          perPage: bookingPerPage,
          order: bookingOrder,
          sort: bookingSort,
        })
      );
      if (payload?.["data"]) setBookings((pre) => ({ ...pre, ...payload }));
      console.log(payload);
    }
  };

  const getProduct = async (id: string) => {
    const { payload } = await dispatch(getProductIdAction(id));
    console.log(payload);
    if (payload?.["data"]) {
      setSelectedProduct(payload.data);
    } else console.log(payload);
  };

  const handleProductPages = (type: string, value: number | string) => {
    if (type === "page")
      setProducts((pre) => ({ ...pre, page: Number(value) }));
    else setProducts((pre) => ({ ...pre, page: 1, perPage: Number(value) }));
  };

  const handleBookingPages = (type: string, value: number | string) => {
    if (type === "page")
      setBookings((pre) => ({ ...pre, page: Number(value) }));
    else setBookings((pre) => ({ ...pre, page: 1, perPage: Number(value) }));
  };

  const handleBookingSortOrder = (item: string) => {
    if (!bookingSort && !bookingOrder) {
      setBookings((pre) => ({ ...pre, sort: item, order: "asc" }));
    } else if (bookingSort === item) {
      const nextOrder =
        bookingOrder === "asc" ? "desc" : bookingOrder === "desc" ? "" : "asc";
      setBookings((pre) => ({
        ...pre,
        sort: nextOrder ? bookingSort : "",
        order: nextOrder,
      }));
    } else {
      setBookings((pre) => ({ ...pre, sort: item, order: "asc" }));
    }
  };

  const handleProductSortOrder = (item: string) => {
    if (!productSort && !productOrder) {
      setProducts((pre) => ({ ...pre, sort: item, order: "asc" }));
    } else if (productSort === item) {
      const nextOrder =
        productOrder === "asc" ? "desc" : productOrder === "desc" ? "" : "asc";
      setProducts((pre) => ({
        ...pre,
        sort: nextOrder ? productSort : "",
        order: nextOrder,
      }));
    } else {
      setProducts((pre) => ({ ...pre, sort: item, order: "asc" }));
    }
  };

  return (
    <RoleProvider target="OTA">
      <div className="card">
        <div className="card-header">
          <h3>Online Travel Agent(OTA) Details</h3>
        </div>
        <div className="d-flex justify-content-between align-items-start mx-5 mb-3">
          <ul className="nav nav-tabs">
            {otaTypes.map((title, index) => (
              <li className="nav-item" key={index}>
                <a
                  className={`nav-link ${
                    selectedOTA.value === title.value
                      ? "active bg-success text-white"
                      : null
                  }`}
                  aria-current="page"
                  href="#"
                  onClick={(e) => setSelectedOTA(title)}
                >
                  {title.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="d-flex justify-content-end align-items-start mx-5">
          <ul className="nav nav-tabs">
            {["Products", "Bookings"].map((label, index) => (
              <li className="nav-item" key={index}>
                <a
                  className={`nav-link ${
                    selectedPanel === label
                      ? "active bg-primary text-white"
                      : null
                  }`}
                  aria-current="page"
                  href="#"
                  onClick={() => setSelectedPanel(label)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <form className="theme-form mega-form">
          <div className="card-body mx-5">
            <PurePagination
              {...{
                pages: {
                  page: checkProduct ? productPage : bookingPage,
                  perPage: checkProduct ? productPerPage : bookingPerPage,
                  totalPages: checkProduct
                    ? productTotalPages
                    : bookingTotalPages,
                },
                handlePages: checkProduct
                  ? handleProductPages
                  : handleBookingPages,
                loading: checkProduct ? productLoading : bookingLoading,
              }}
            />
            {/* <OtaDetails {...{ ota, handleOta }} /> */}
            {checkProduct && (
              <OtaProducts
                {...{
                  selectedProduct,
                  products: products.data,
                  getProduct,
                  otaType: selectedOTA.label,
                  order: productOrder,
                  sort: productSort,
                  handleSortOrder: handleProductSortOrder,
                }}
              />
            )}
            {selectedPanel === "Bookings" && (
              <OtaBookings
                {...{
                  order: bookingOrder,
                  sort: bookingSort,
                  bookings: bookings.data,
                  handleSortOrder: handleBookingSortOrder,
                }}
              />
            )}
          </div>
        </form>
      </div>
    </RoleProvider>
  );
};

export default page;
