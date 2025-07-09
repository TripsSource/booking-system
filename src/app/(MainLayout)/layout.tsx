"use client";

import Header from "@/layouts/Header/index";
import Loader from "@/layouts/Loader";
import SideBar from "@/layouts/SideBar/index";
import ThemeCustomizer from "@/layouts/ThemeCustomizer/index";

import { responsiveSideBar } from "@/store/ThemeCustomize";
import { AppDispatch, RootState } from "@/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TokenProvider } from "@/providers/TokenProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { toggleRtl } = useSelector((state: RootState) => state.ThemeCustomize);
  const dispatch = useDispatch<AppDispatch>();
  const modifiedSideBar = () => {
    if (window.innerWidth <= 992) {
      dispatch(responsiveSideBar(true));
    } else {
      dispatch(responsiveSideBar(false));
    }
  };

  useEffect(() => {
    modifiedSideBar();

    const handleResize = () => {
      modifiedSideBar();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    // dispatch(getProductsAction());

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  return (
    <TokenProvider>
      <Loader />
      <div className="page-wrapper compact-wrapper modern-type">
        <Header />
        <div className="page-body-wrapper">
          <SideBar />
          <div className="page-body">
            {children}
            {/* <div className="container-fluid">
                <footer className="footer">
                  <div className="row">
                    <div className="col-md-12 footer-copyright text-center">
                      <p className="mb-0">
                        Copyright {new Date(Date.now()).getFullYear()} ©
                        Tourismus Group
                      </p>
                    </div>
                  </div>
                </footer>
              </div> */}
          </div>
        </div>
      </div>
      <ThemeCustomizer />
    </TokenProvider>
  );
};

export default layout;
