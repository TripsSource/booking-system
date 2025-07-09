"use client";
import CostCenter from "@/components/Financial/CostCenter";
import RoleProvider from "@/providers/RoleProvider";
import { AppDispatch } from "@/store";
import { getMailInvoiceAction } from "@/store/financial";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface dataType {
  data: any[];
  page: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
}

function CostCenterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [stepTab, setStepTab] = useState<number>(0);
  const [data, setData] = useState<dataType>({
    data: [],
    page: 1,
    perPage: 10,
    totalPages: 0,
    totalCount: 0,
  });
  const { page, perPage } = data;
  const fetchData = async () => {
    const { payload } = await dispatch(getMailInvoiceAction({ page, perPage }));
    if (payload?.["data"]) setData(payload);
    console.log(payload);
  };
  const handlePages = (type: string, value: number | string) => {
    if (type === "perPage")
      setData((pre: any) => ({ ...pre, page: 1, perPage: Number(value) }));
    else setData((pre: any) => ({ ...pre, [type]: value }));
  };
  useEffect(() => {
    fetchData();
  }, [page, perPage]);
  return (
    <RoleProvider target="Financial">
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs mb-3">
            {["Outstanding Costs", "Paid Costs"].map(
              (StepTab, index: number) => (
                <li className="nav-item" key={index}>
                  <a
                    className={`nav-link ${
                      stepTab === index ? "active bg-past text-white" : ""
                    }`}
                    href="#"
                    aria-current="page"
                    onClick={() => setStepTab(index)}
                  >
                    {StepTab}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="card-body">
          <CostCenter {...{ data, handlePages }} />
        </div>
      </div>
    </RoleProvider>
  );
}

export default CostCenterPage;
