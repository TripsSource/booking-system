"use client";
import PurePagination from "@/Common/PurePagination";
import { loadingState } from "@/store/financial";
import { BACKEND_URL } from "@/utils/api";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const CostCenter = ({
  data,
  handlePages,
}: {
  data: any;
  handlePages: (type: string, value: number | string) => void;
}) => {
  const loading = useSelector(loadingState);
  const invioces = data.data ?? [];
  const pages = {
    page: data.page,
    perPage: data.perPage,
    totalPages: data.totalPages,
  };
  return (
    <>
      {invioces && invioces.length > 0 && (
        <PurePagination
          {...{
            pages,
            handlePages,
            loading,
          }}
        />
      )}
      <table className="user-table table table-striped">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Final Price</th>
            <th>Account</th>
            <th>VAT</th>
            <th>Payment Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invioces.map((invoice: any, index: number) => (
            <tr key={index}>
              <td>{invoice.supplierName}</td>
              <td>{invoice.vatAmount}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.vat}</td>
              <td>{moment(invoice.createdAt).format()}</td>
              <td>
                <Link
                  href={`${BACKEND_URL}/api/mail/cost-invoice/${invoice._id}`}
                  target="_blank"
                >
                  <i className="fa fa-eye fs-5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CostCenter;
