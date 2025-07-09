"use client";
import { AppDispatch } from "@/store";
import { deleteInvoiceAction, getInvoicesAction } from "@/store/financial";
import { BACKEND_URL } from "@/utils/api";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const InvoicesSettled = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [invoices, setInvoices] = useState<any[]>([]);
  const fetchData = async () => {
    const { payload } = await dispatch(getInvoicesAction({}));
    if (payload?.["data"]) setInvoices(payload.data);
    console.log(payload);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteInvoice = async (id: string) => {
    const { payload } = await dispatch(deleteInvoiceAction(id));
    if (payload?.["message"]) await fetchData();
  };

  return (
    <table className="user-table table table-striped">
      <thead>
        <tr>
          <th>Tour Name</th>
          <th>Participants</th>
          <th>Total Price (incl.VAT)</th>
          <th>Account</th>
          <th>Deposit Payment (Date)</th>
          <th>Final Payment (Date)</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr>
            <td>{invoice.bookingId.bokun?.productName ?? ""}</td>
            <td>
              {invoice.bookingId.adultCount + invoice.bookingId.childCount}
            </td>
            <td>{invoice.amount}</td>
            <td>
              {invoice.bookingId.mainTraveller.firstname +
                " " +
                invoice.bookingId.mainTraveller.lastname}
            </td>
            <td>{moment(invoice.deposit).format()}</td>
            <td>{moment(invoice.pay).format()}</td>
            <td>{invoice.bookingId.status}</td>
            <td
              className="text-center text-nowrap"
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <div className="mt-1">
                  <Link
                    href={`${BACKEND_URL}/api/mail/invoice/${invoice._id}`}
                    target="_blank"
                  >
                    <i className="fa fa-eye fs-5" />
                  </Link>
                </div>
                <div className="ms-3">
                  <Link href={""} onClick={() => deleteInvoice(invoice._id)}>
                    <i className="fa fa-trash-o fs-5" />
                  </Link>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoicesSettled;
