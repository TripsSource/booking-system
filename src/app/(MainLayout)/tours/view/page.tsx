"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReadTours from "@/components/Tours/ReadTours";
import { AppDispatch } from "@/store";
import {
  getProductsAction,
  productLoadingState,
  productsState,
} from "@/store/products";
import { readProductState } from "@/types/store/products";
import { getDestinationTitlesAction } from "@/store/destination";
import PageLoader from "@/layouts/PageLoader";

const ReadAllTours = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(productLoadingState);

  const getProducts = () => {
    dispatch(getProductsAction({}));
  };
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    getProducts();
  }, [deleted]);

  useEffect(() => {
    dispatch(getDestinationTitlesAction({}));
  }, []);

  const products: readProductState[] = useSelector(productsState);
  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h3>View Tours</h3>
          </div>
          <div className="card-body">
            <div>
              <div className="table-responsive table-desi">
                {loading ? <PageLoader /> : <ReadTours {...{ products }} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadAllTours;
