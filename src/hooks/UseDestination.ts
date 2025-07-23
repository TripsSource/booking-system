import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  deleteDestinationAction,
  destinationLoadingState,
  destinationsState,
  getDestinationsAction,
} from "@/store/destination";
import { readDestinationType } from "@/types/store/destination";
import { toast } from "react-toastify";

export const useGetAllDestinations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState<boolean>(false);
  const fetchData = async () => {
    const { payload } = await dispatch(getDestinationsAction({}));
    console.log(payload);
  };
  useEffect(() => {
    fetchData();
  }, [status]);
  const allDestinations: readDestinationType[] = useSelector(destinationsState);
  const loading = useSelector(destinationLoadingState);
  return [allDestinations, loading, status, setStatus] as const;
};

export const useDeleteIdDestination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [id, setId] = useState<string>("");
  const fetchData = async () => {
    const { payload } = await dispatch(deleteDestinationAction(id));
    if (payload && "error" in payload && payload.error) {
      toast.error(payload.error);
    } else {
      if (payload && "message" in payload) {
        toast.success(payload.message);
        await dispatch(getDestinationsAction({}));
      }
    }
  };
  useEffect(() => {
    if (id !== "") {
      fetchData();
    }
  }, [id]);
  const loading = useSelector(destinationLoadingState);
  return [loading, setId] as const;
};

export const handleMessage = (payload: any) => {
  if (payload && "error" in payload && payload.error) {
    toast.error(payload.error);
  } else {
    if (payload && "message" in payload) {
      toast.success(payload.message);
    }
  }
};

export const useGetDestinationTitles = () => {};
