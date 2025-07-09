"use client";
import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";

import { userState } from "@/store/auth";

export const AdminPage = ({ children }: { children: ReactNode }) => {
  const user = useSelector(userState);
  const router = useRouter();

  if (user.role !== "Admin") {
    router.push(`/travelagent/profile`);
    return null;
  }
  return <>{children}</>;
};
