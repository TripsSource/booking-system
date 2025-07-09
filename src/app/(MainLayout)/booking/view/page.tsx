"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Href } from "@/utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  bookingsLoadingState,
  deleteBookingsAction,
  getBookingsAction,
} from "@/store/booking";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import PageLoader from "@/layouts/PageLoader";
import RoleProvider from "@/providers/RoleProvider";
import { BookingDetails } from "@/types/store/booking";
import moment from "moment";
import { getProductsAction, productsState } from "@/store/products";
import PurePagination from "@/Common/PurePagination";

const MyBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const loading = useSelector(bookingsLoadingState);
  const [pages, setPages] = useState({ page: 1, perPage: 10, totalPages: 0 });
  const handlePages = (type: string, value: number | string) => {
    if (type === "page") setPages((pre) => ({ ...pre, page: Number(value) }));
    else setPages((pre) => ({ ...pre, page: 1, perPage: Number(value) }));
  };
  const [deletefModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deletefModal);

  const openDeleteModal = () => {
    setDeleteModal(false);
  };

  const getBookings = async () => {
    const page = pages.page;
    const perPage = pages.perPage;
    const { payload } = await dispatch(getBookingsAction({ page, perPage }));
    if (payload?.["data"]) {
      setBookings(payload.data);
      setPages({
        page: payload.page || 1,
        perPage: payload.perPage || 10,
        totalPages: payload.totalPages || 0,
      });
    } else {
      console.error("Unexpected payload:", payload);
    }
  };

  useEffect(() => {
    dispatch(getProductsAction({}));
  }, []);

  useEffect(() => {
    getBookings();
  }, [pages.perPage, pages.page]);

  const handleDelete = async (id: string) => {
    const { payload } = await dispatch(deleteBookingsAction(id));
    if (payload.message) {
      toast.warn("Booking Cancelled");
      setBookings((prevBookings) => prevBookings.filter((b) => b._id !== id));
    }
  };

  const renderBookingActions = (booking: BookingDetails) => {
    const daysLeft = Math.abs(
      (new Date(booking.bookingDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return (
      <div
        className={`d-flex align-items-center justify-content-center ${
          daysLeft >= 2 ? "" : "d-none"
        }`}
      >
        <div className="mt-1 me-2">
          <Link href={`/booking/${booking._id}`} aria-disabled={loading}>
            <i className="fa fa-edit" style={{ color: "blue" }} />
          </Link>
        </div>
        <div className="ms-2">
          <Link
            href={""}
            onClick={() => handleDelete(booking._id as string)}
            aria-disabled={loading}
          >
            <i className="fa fa-times-circle" style={{ color: "red" }} />
          </Link>
        </div>
      </div>
    );
  };

  const renderBookingRow = (booking: BookingDetails) => {
    const totalPAX =
      booking.adultCount + booking.childCount + booking.infantCount;
    return (
      <tr key={booking._id}>
        <td className="text-center text-nowrap">{booking.ota}</td>
        <td className="text-center text-nowrap">{booking.productName}</td>
        <td className="text-center text-nowrap">
          <a href={Href}>
            <span className="d-block">
              {booking.isPrivate ? "Small Group" : "Private"}
            </span>
          </a>
        </td>
        <td className="text-center text-nowrap">
          {moment(booking.bookingDate).format("DD-MM-YYYY")}
        </td>
        <td className="text-center text-nowrap">
          {`${totalPAX} total/${booking.adultCount} adult(s)/${booking.childCount} child(ren)/${booking.infantCount} infant(s)`}
        </td>
        <td className="text-center text-nowrap">{"₣" + booking.amount}</td>
        <td className="text-center text-nowrap">{booking.status}</td>
        <td className="text-center text-nowrap">
          {renderBookingActions(booking)}
        </td>
      </tr>
    );
  };

  return (
    <RoleProvider target="Booking">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h3>All Bookings</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive table-desi">
                  <PurePagination
                    {...{
                      pages,
                      handlePages,
                      loading,
                    }}
                  />
                  <table className="Booking-table table table-striped">
                    <thead>
                      <tr>
                        <th className="text-center text-nowrap">OTA</th>
                        <th className="text-center text-nowrap">Tour Name</th>
                        <th className="text-center text-nowrap">Type</th>
                        <th className="text-center text-nowrap">Booked Date</th>
                        <th className="text-center text-nowrap">PAX</th>
                        <th className="text-center text-nowrap">Cost</th>
                        <th className="text-center text-nowrap">Status</th>
                        <th className="text-center text-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={7}>
                            <PageLoader />
                          </td>
                        </tr>
                      ) : bookings.length === 0 ? (
                        <p>No Data</p>
                      ) : (
                        bookings.map((booking) => renderBookingRow(booking))
                      )}
                    </tbody>
                  </table>
                  <PurePagination
                    {...{
                      pages,
                      handlePages,
                      loading,
                    }}
                  />
                  <Modal
                    isOpen={deletefModal}
                    toggle={toggleDeleteModal}
                    centered
                    size="lg"
                  >
                    <ModalHeader toggle={toggleDeleteModal}>Delete</ModalHeader>
                    <ModalFooter>
                      <Button color="secondary" onClick={toggleDeleteModal}>
                        Cancel
                      </Button>
                      <Button color="primary" onClick={openDeleteModal}>
                        Confirm
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleProvider>
  );
};

export default MyBooking;
