"use client";
import React, { useEffect, useState } from "react";
import ReadProducts from "@/components/Product/ReadProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { getProductsAction, productsState } from "@/store/products";
import { getDestinationTitlesAction } from "@/store/destination";
import RoleProvider from "@/providers/RoleProvider";
import { readProductState } from "@/types/store/products";

const ReadAllProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getProducts = async () => {
    await dispatch(getProductsAction({}));
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
    <RoleProvider target="Product">
      <div className="container-fluid">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h3>View Products</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive table-desi">
                <ReadProducts {...{ products, deleted, setDeleted }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleProvider>
  );
};

export default ReadAllProducts;
