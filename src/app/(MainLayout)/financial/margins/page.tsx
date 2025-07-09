"use client";
import React, { useEffect } from "react";
import MarginSettings from "@/components/Financial/MarginSettings";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  createOTAAction,
  deleteOTAAction,
  getMarginAction,
  getOTASAction,
  updateMarginAction,
  updateOTAAction,
} from "@/store/financial";
import { marginsState, otaState } from "@/types/app/financial";
import { toast } from "react-toastify";
import RoleProvider from "@/providers/RoleProvider";

function page() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getMarginAction({}));
      await dispatch(getOTASAction({}));
    };
    fetchData();
  }, []);

  const saveMargins = async (data: marginsState) => {
    await dispatch(updateMarginAction(data)).then((res) => message(res));
  };

  const createOTA = async (data: otaState) => {
    await dispatch(createOTAAction(data)).then(async (res) => {
      await dispatch(getOTASAction({}));
      message(res);
    });
  };

  const saveOTA = async (data: otaState) => {
    await dispatch(updateOTAAction(data)).then((res) => message(res));
  };

  const deleteOTA = async (id: string) => {
    await dispatch(deleteOTAAction(id)).then((res) => message(res));
  };

  const message = (res: any) => {
    if (res.payload.message) {
      toast.success(`${res.payload.message}`);
    } else {
      toast.error(`${res.payload.error}`);
    }
  };

  return (
    <RoleProvider target="Financial">
      <div className="card">
        <div className="card-body">
          <MarginSettings {...{ saveMargins, createOTA, saveOTA, deleteOTA }} />
        </div>
      </div>
    </RoleProvider>
  );
}

export default page;
