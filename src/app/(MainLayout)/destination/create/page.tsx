"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import DestinationDetail from "@/components/Destination/destinationDetail";
import { DestinationDetailState } from "@/types/app/destination";
import {
  crateDestinationAction,
  destinationLoadingState,
} from "@/store/destination";
import { TOUR_CITIES } from "@/constants/data";
import PageLoader from "@/layouts/PageLoader";
import LoadingButton from "@/Common/LoadingButton";
import RoleProvider from "@/providers/RoleProvider";

const CreateDestination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(destinationLoadingState);
  const initialDestination: DestinationDetailState = {
    destinationTitle: TOUR_CITIES[0].city,
    generalDescription: "",
    images: [],
  };

  const [destination, setDestination] =
    useState<DestinationDetailState>(initialDestination);

  const handleDistination = (
    params: string,
    value: string | string[] | File[]
  ) => {
    setDestination((pre) => ({ ...pre, [params]: value }));
  };

  const saveProduct = async () => {
    if (destination.destinationTitle === "") {
      toast.error("Please select a destination title");
      return;
    } else if (destination.generalDescription.trim() === "") {
      toast.error("Please provide a general description");
      return;
    }

    const { payload } = await dispatch(crateDestinationAction(destination));
    if (payload && "error" in payload && payload.error) {
      toast.error(payload.error);
    } else {
      if (payload && "message" in payload) {
        toast.success(payload.message);
        setDestination(initialDestination);
      }
    }
  };

  return (
    <RoleProvider target="Destination">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h3>Create a new destination</h3>
                <div className="justify-content-end d-flex">
                  <LoadingButton
                    {...{
                      loading,
                      func: saveProduct,
                      title: "Add Destination",
                      classes: "btn btn-primary btn-block w-10",
                    }}
                  />
                </div>
              </div>
              {loading ? (
                <PageLoader />
              ) : (
                <DestinationDetail {...{ destination, handleDistination }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </RoleProvider>
  );
};

export default CreateDestination;
