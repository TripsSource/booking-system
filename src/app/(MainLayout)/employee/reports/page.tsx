"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { getAllPastBookingsAction } from "@/store/booking";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import PageLoader from "@/layouts/PageLoader";
import RoleProvider from "@/providers/RoleProvider";
import moment from "moment";
import {
  createReportAction,
  readAllReportsAction,
  readReportAction,
  reportLoadingState,
} from "@/store/report";
import { readReportState, reportState } from "@/types/app/report";
import DropZoneCommon from "@/Common/DropZoneCommon";
import { userState } from "@/store/auth";
import { BookingDetails } from "@/types/store/booking";
import Link from "next/link";
import Select from "react-select";

const page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [reports, setReports] = useState<readReportState[]>([]);
  const user = useSelector(userState);
  const initialReport: reportState = {
    productId: "",
    bookingId: [],
    earn: 0,
    break: 0,
    feedback: "",
    files: [],
    startTime: "",
    endTime: "",
  };
  const [report, setReport] = useState<{
    id: string;
    data: reportState;
    check: boolean;
  }>({
    id: "",
    data: initialReport,
    check: false,
  });
  const [bookings, setBookings] = useState<BookingDetails[]>([]);

  const getAllReports = async () => {
    const { payload } = await dispatch(readAllReportsAction({}));
    if (payload?.["data"]) {
      setReports(payload.data);
      console.log("Reports:", payload.data);
    } else {
      console.error("Unexpected payload:", payload);
    }
  };

  const todayBookings = async () => {
    const { payload } = await dispatch(getAllPastBookingsAction({}));
    if (payload?.["data"]) {
      setBookings(payload.data);
    } else {
      console.error("Unexpected payload:", payload);
    }
  };

  const optionReport = async (id: string) => {
    const { payload } = await dispatch(readReportAction(id));
    if (payload?.["data"]) {
      setReport({ id, data: payload.data, check: false });
    } else {
      console.error("Unexpected payload:", payload);
    }
  };

  useEffect(() => {
    getAllReports();
    todayBookings();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen((prev) => !prev);

  const renderReportRow = (report: readReportState) => {
    return (
      <tr key={report._id} onClick={() => optionReport(report._id)}>
        {user.role === "Admin" && (
          <td className="text-center text-nowrap">
            {report.createdBy?.firstname + " " + report.createdBy?.lastname}
          </td>
        )}
        <td className="text-center">
          {report.bookingId[0]?.bokun?.productName}
        </td>
        <td className="text-center text-nowrap">
          {moment(report.bookingId[0]?.bookingDate).format("DD-MM-YYYY")}
        </td>
        <td className="text-center text-nowrap">{report.bookingId?.length}</td>
      </tr>
    );
  };

  const handleReport = (type: string, value: string | number | File[]) => {
    setReport({ ...report, data: { ...report.data, [type]: value } });
  };

  const handleFilesSelected = (files: File[]) => {
    handleReport("files", files);
  };

  const handleProductNameForReport = (bookingId: string[]) => {
    setReport({
      ...report,
      data: {
        ...report.data,
        bookingId: bookingId,
        productId:
          bookings.find((booking) => booking._id === bookingId[0])?.productId ??
          "",
      },
    });
  };

  const formatReport = () =>
    setReport({ id: "", data: initialReport, check: false });

  const loading = useSelector(reportLoadingState);

  const saveReport = async () => {
    const { payload } = await dispatch(createReportAction(report.data));
    if (payload?.["message"]) {
      toast.success(payload.message);
      await getAllReports();
      formatReport();
    } else if (payload?.["error"]) {
      toast.error(payload.error);
    } else {
      console.error("Unexpected payload:", payload);
    }
  };

  const timeOptions = Array.from({ length: 96 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const min = (i % 4) * 15;
    const val = `${hour.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}`;
    return (
      <option key={i} value={val}>
        {val}
      </option>
    );
  });

  return (
    <RoleProvider target="Booking">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <h3>My Reports</h3>
            <button
              className="align-items-center btn btn-theme"
              type="button"
              onClick={formatReport}
            >
              New Report
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-8">
              {loading ? (
                <PageLoader />
              ) : reports.length === 0 ? (
                <p>No Data</p>
              ) : (
                <div className="table-table-responsive table-desi">
                  <table className="Booking-table table table-striped">
                    <thead>
                      <tr>
                        {user.role === "Admin" && (
                          <th className="text-center text-nowrap">
                            Guide name
                          </th>
                        )}
                        <th className="text-center text-nowrap">TourName</th>
                        <th className="text-center text-nowrap">TourDate</th>
                        <th className="text-center text-nowrap">
                          Total Bookings
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => renderReportRow(report))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="col-sm-4">
              <form className="theme-form mega-form">
                <Select
                  placeholder="Select Bookings"
                  value={report.data.bookingId.map((booking) => ({
                    label:
                      typeof booking === "object" &&
                      booking.bokun.productName +
                        " (" +
                        moment(booking.bookingDate).format("DD/MM/YYYY") +
                        " - " +
                        booking.mainTraveller.firstname +
                        " " +
                        booking.mainTraveller.lastname +
                        ")",
                    value: typeof booking === "object" ? booking._id : "",
                  }))}
                  onChange={(e) =>
                    handleProductNameForReport(
                      e.map((item) => item.value ?? "")
                    )
                  }
                  isMulti
                  options={bookings.map((booking) => ({
                    label:
                      booking.productName +
                      " (" +
                      moment(booking.bookingDate).format("DD/MM/YYYY") +
                      " - " +
                      booking.mainTraveller.firstname +
                      " " +
                      booking.mainTraveller.lastname +
                      ")",
                    value: booking._id ?? "",
                  }))}
                  isDisabled={!!report.id} // Disable if report is already created
                />
                <div className="mb-3">
                  <label className="form-label-title">
                    1. Leave a feedback on this tour
                  </label>
                  <textarea
                    className="form-control"
                    value={report.data.feedback}
                    onChange={(e) => handleReport("feedback", e.target.value)}
                    disabled={report.id !== ""}
                  />
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      2. When did the tour start?
                    </label>
                    <div className="d-flex align-items-center g-3">
                      <select
                        className="form-control"
                        value={report.data.startTime}
                        onChange={(e) =>
                          handleReport("startTime", e.target.value)
                        }
                        disabled={report.id !== ""}
                      >
                        {timeOptions}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      3. When did the tour end?
                    </label>
                    <div className="d-flex align-items-center g-3">
                      <select
                        className="form-control"
                        value={report.data.endTime}
                        onChange={(e) =>
                          handleReport("endTime", e.target.value)
                        }
                        disabled={report.id !== ""}
                      >
                        {timeOptions}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-6">
                    <label className="form-label-title" htmlFor="breakTime">
                      4. How long was your break?
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={24}
                      className="form-control"
                      value={report.data.break}
                      onChange={(e) =>
                        handleReport(
                          "break",
                          Math.max(0, Math.min(24, parseFloat(e.target.value)))
                        )
                      }
                      disabled={report.id !== ""}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      5. How much did you earn as tips?
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="form-control"
                      value={report.data.earn}
                      onChange={(e) =>
                        handleReport(
                          "earn",
                          Math.max(0, parseFloat(e.target.value))
                        )
                      }
                      disabled={report.id !== ""}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label-title" htmlFor="files">
                    6. Did you have any expenses? If so, upload the PDF here
                  </label>
                  {report.id === "" ? (
                    <DropZoneCommon
                      value={report.data.files}
                      accept={{ "application/pdf": [] }}
                      onFilesSelected={handleFilesSelected}
                      multiple={false}
                    />
                  ) : (
                    report.data.files[0] && (
                      <div className="w-100">
                        <Link
                          className={`align-items-center justify-content-center btn btn-theme`}
                          type="button"
                          href={`${report.data.files[0]}`}
                        >
                          View PDF
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </form>
              {report.id === "" && (
                <>
                  <label className="form-label-title">
                    <input
                      className="checkbox_animated"
                      type="checkbox"
                      checked={report.check}
                      onChange={(e) =>
                        setReport({
                          ...report,
                          check: e.target.checked,
                        })
                      }
                    />
                    Send and can't update Report
                  </label>
                  <button
                    type="button"
                    className="btn btn-theme"
                    onClick={saveReport}
                    disabled={!report.check}
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
        <ModalHeader toggle={toggleModal}></ModalHeader>
        <ModalBody className="p-4"></ModalBody>
        <ModalFooter>
          <Button color="secondary" type="button" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="primary" type="button" onClick={toggleModal}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </RoleProvider>
  );
};

export default page;
