"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import DestinationDetail from "@/components/Destination/destinationDetail";
import { DestinationDetailState } from "@/types/app/destination";
import {
  crateDestinationAction,
  getDestinationIdAction,
  destinationLoadingState,
  updateDestinationAction,
} from "@/store/destination";
import { TOUR_CITIES } from "@/constants/data";
import { useParams } from "next/navigation";
import PageLoader from "@/layouts/PageLoader";
import LoadingButton from "@/Common/LoadingButton";
import RoleProvider from "@/providers/RoleProvider";

const ReadIdDestination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const loading = useSelector(destinationLoadingState);
  const initialDestination: DestinationDetailState = {
    destinationTitle: TOUR_CITIES[0].city,
    generalDescription: "",
    images: [],
  };
  const [destination, setDestination] =
    useState<DestinationDetailState>(initialDestination);

  const getIdDestination = async () => {
    const { payload } = await dispatch(getDestinationIdAction(`${id}`));
    if (payload.error) {
      toast.error(`${payload.error}`);
    } else {
      setDestination({
        ...payload,
        currentImages: payload.images,
        images: [],
      });
    }
  };

  useEffect(() => {
    getIdDestination();
  }, [id]);

  const handleDistination = (
    params: string,
    value: string | string[] | File[]
  ) => {
    setDestination((pre) => ({ ...pre, [params]: value }));
  };

  const saveProduct = async () => {
    if (id) {
      const { payload } = await dispatch(updateDestinationAction(destination));
      if (payload && "error" in payload && payload.error) {
        toast.error(payload.error);
      } else {
        if (payload && "message" in payload) {
          toast.success(payload.message);
          getIdDestination();
        }
      }
    } else {
      const { payload } = await dispatch(crateDestinationAction(destination));
      if (payload && "error" in payload && payload.error) {
        toast.error(payload.error);
      } else {
        if (payload && "message" in payload) {
          toast.success(payload.message);
          setDestination(initialDestination);
        }
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
                <h3>Update a destination</h3>
                <div className="mb-5 justify-content-end d-flex m-l-50">
                  <LoadingButton
                    {...{
                      loading,
                      func: saveProduct,
                      title: "Update Destination",
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
      {/* <RoomDetails /> */}
    </RoleProvider>
  );
};

export default ReadIdDestination;
