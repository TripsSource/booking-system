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
import { useParams } from "next/navigation";
import PageLoader from "@/layouts/PageLoader";
import RoleProvider from "@/providers/RoleProvider";
import isEqual from "lodash/isEqual";
import LoadingAuthButton from "@/Common/LoadingAuthButton";

const page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const loading = useSelector(destinationLoadingState);
  const initialDestination: DestinationDetailState = {
    destinationTitle: "",
    description: "",
    shortDescription: "",
    images: [],
  };
  const [destination, setDestination] =
    useState<DestinationDetailState>(initialDestination);

  const [updateForm, setUpdateForm] =
    useState<DestinationDetailState>(initialDestination);

  const getIdDestination = async () => {
    const { payload } = await dispatch(getDestinationIdAction(`${id}`));
    if (payload?.["error"]) {
      toast.error(`${payload.error}`);
    } else {
      setDestination({
        ...payload.data,
        currentImages: payload.data.images,
        images: [],
      });
      setUpdateForm({
        ...payload.data,
        currentImages: payload.data.images,
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

  const saveDestination = async () => {
    if (id) {
      const { payload } = await dispatch(updateDestinationAction(destination));
      if (payload?.["error"]) {
        toast.error(payload.error);
      } else {
        if (payload?.["message"]) {
          toast.success(payload.message);
          getIdDestination();
        }
      }
    } else {
      const { payload } = await dispatch(crateDestinationAction(destination));
      if (payload?.["error"]) {
        toast.error(payload.error);
      } else {
        if (payload?.["message"]) {
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
                  <LoadingAuthButton
                    {...{
                      loading,
                      onFunc: saveDestination,
                      title: "Update Destination",
                      classes: "btn btn-primary btn-block w-10",
                      disabled: isEqual(destination, updateForm),
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

export default page;
