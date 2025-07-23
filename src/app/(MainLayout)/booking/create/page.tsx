"use client";
import { dashboardSlider, modalSlider } from "@/data/SliderData";
import CustomImage from "@/utils/CustomImage";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  getProductsAction,
  productsState,
  getProductIdAction,
  productLoadingState,
} from "@/store/products";
import {
  destinationLoadingState,
  getDestinationTitlesAction,
} from "@/store/destination";
import { readProductState } from "@/types/store/products";
import { ProductDetailState } from "@/types/app/product";
import Image from "next/image";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import RoleProvider from "@/providers/RoleProvider";
import PageLoader from "@/layouts/PageLoader";

const Tours = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getProducts = async () => {
    await dispatch(getProductsAction({}));
    await dispatch(getDestinationTitlesAction({}));
  };
  useEffect(() => {
    if (products.length < 2 || !Array.isArray(products)) getProducts();
  }, []);
  const productLoading = useSelector(productLoadingState);
  const products: readProductState[] = useSelector(productsState).filter(
    (product) => product.isActive
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({} as ProductDetailState);
  const toggleModal = () => setModalOpen(!modalOpen);
  const openModal = async (id: string) => {
    const { payload } = await dispatch(getProductIdAction(id));
    console.log(payload);
    if (payload && !(payload as any).error) {
      setData(payload.data as ProductDetailState);
    }
    setModalOpen(true);
  };
  return (
    <RoleProvider target="Booking">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header-title card-header">
            <h5>Tours</h5>
          </div>
          <div className="card-body">
            <div className="dashboard-tours ratio3_2">
              {productLoading ? (
                <PageLoader />
              ) : (
                <Slider
                  {...dashboardSlider}
                  className="w-100 dashboard-slider "
                >
                  {Array.isArray(products) &&
                    products.length > 0 &&
                    products.map((product: readProductState, index: number) => (
                      <div
                        key={index}
                        className="category-box"
                        style={{
                          width: "100%",
                          display: "inline-block",
                        }}
                      >
                        <div className="img-category">
                          <div className="img-category-box bg-size">
                            <CustomImage
                              src={`${product.image}`}
                              alt={`${product.image}`}
                              className="img-fluid bg-img"
                            />
                          </div>
                          <div className="top-bar">
                            <span className="offer">{product.destination}</span>
                          </div>
                        </div>
                        <div
                          className="content-category d-flex flex-column"
                          style={{ height: "18rem" }}
                        >
                          <div className="top">
                            <h3
                              style={{ cursor: "pointer" }}
                              onClick={() => openModal(product._id)}
                            >
                              {product.name}
                            </h3>
                          </div>
                          <p>{product.shortDescription}</p>
                          <div className="mt-auto">
                            <h6>
                              {product.minCost?.toLocaleString()}CHF
                              {product.minCost !== product.maxCost &&
                                " - " +
                                  product.maxCost?.toLocaleString() +
                                  "CHF"}
                              <Link href={`/booking/create/${product._id}`}>
                                <span style={{ cursor: "pointer" }}>
                                  Reserve
                                </span>
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                    ))}
                </Slider>
              )}
            </div>
          </div>
          <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
            <ModalHeader toggle={toggleModal}>{data.name}</ModalHeader>
            <ModalBody className="p-4">
              <div>
                {data.images && data.images.length > 0 && (
                  <Slider {...modalSlider} className="w-100 dashboard-slider ">
                    {data.images.map((image, index: number) => (
                      <div className="category-box" key={index}>
                        <Image
                          src={`${image}`}
                          width={100}
                          height={100}
                          alt={`${image}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
              <div className="row g-2">
                <div className="col-sm-12">
                  <p>Description:{data.description}</p>
                  {/* <p>
                    Private:{" "}
                    {data.isPrivate ? "Private Tour" : "Small Group Tour"}
                  </p> */}
                  <p>Tour Count: {data.tours?.length ?? 0}</p>
                  <div className="d-flex align-items-start justify-content-start">
                    <div>
                      <p>Inclusions:</p>
                      <ul className="mx-3">
                        {data.inclusions?.map(
                          (inclusion: string, index: number) => (
                            <li key={index} style={{ listStyleType: "square" }}>
                              {inclusion}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="ms-3">
                      <p>Exclusions:</p>
                      <ul className="mx-3">
                        {data.exclusions?.map(
                          (exclusion: string, index: number) => (
                            <li key={index} style={{ listStyleType: "square" }}>
                              {exclusion}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <div className="col-sm-6">
              <WorldMap checkPlace={false} onlineMap={data.onlineMap} />
            </div> */}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" type="button" onClick={toggleModal}>
                Cancel
              </Button>
              <Link href={`/booking/create/${data._id}`}>
                <Button color="primary" type="button" onClick={toggleModal}>
                  Booking
                </Button>
              </Link>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </RoleProvider>
  );
};

export default Tours;
