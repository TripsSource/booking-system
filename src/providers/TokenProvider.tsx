"use client";
import Loader from "@/layouts/Loader";
import { AppDispatch } from "@/store";
import { accountValidAction, loadingState } from "@/store/auth";
import { api } from "@/utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const TokenContext = createContext({});

export const useAuthCtxt = () => useContext(TokenContext);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(loadingState);
  const router = useRouter();
  const handleCheckAuth = async () => {
    const { payload } = await dispatch(accountValidAction({}));
    if (payload?.["error"]) {
      localStorage.removeItem("token");
      Cookies.remove("token");
      alert("sdf");
      return await router.push("/auth/login");
    } else if (payload.message) {
      if (payload.message === "Network Error") toast.error(payload.message);
      else toast.info(payload.message);
    }
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    api.defaults.headers.common["Authorization"] = storedToken;
    setToken(storedToken === null ? "" : storedToken);

    if (storedToken) {
      handleCheckAuth();
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token }}>
      {token === null || loading ? <Loader /> : children}
    </TokenContext.Provider>
  );
};
