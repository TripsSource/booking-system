import { AppDispatch } from "@/store";
import {
  createInvoiceAction,
  getForInvoiceAction,
  getForInvoicesAction,
} from "@/store/financial";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function OutstandingInvoices() {
  const dispatch = useDispatch<AppDispatch>();
  const [bookings, setBookings] = React.useState([]);
  const [selectedBooking, setSelectedBooking] = React.useState<any>({});
  const [selectedID, setSelectedID] = React.useState<string>("");
  const getFetchDatas = async () => {
    const { payload } = await dispatch(getForInvoicesAction({}));
    if (payload?.["data"]) setBookings(payload.data);
  };
  const getFetchData = async (id: string) => {
    const { payload } = await dispatch(getForInvoiceAction(id));
    if (payload?.["data"])
      setSelectedBooking({
        ...payload.data,
        deposit: payload.data?.bookingDate
          ? moment(payload.data?.bookingDate)
              .clone()
              .subtract(1, "days")
              .format()
          : "",
        pay: payload.data?.bookingDate
          ? moment(payload.data?.bookingDate).clone().add(1, "weeks").format()
          : "",
      });
  };

  const createInvoice = async () => {
    const { payload } = await dispatch(createInvoiceAction(selectedBooking));
    if (payload?.["message"]) {
      setSelectedBooking({});
      setSelectedID("");
      await getFetchDatas();
    }
  };
  useEffect(() => {
    getFetchDatas();
    if (selectedID) getFetchData(selectedID);
  }, [selectedID]);
  return (
    <form className="theme-form mega-form">
      <label className="form-label-title">Select Booking</label>
      <select
        value={selectedID}
        onChange={(e) => setSelectedID(e.target.value)}
        className="form-control"
      >
        <option>-----</option>
        {bookings.map((booking: any, index: number) => (
          <option value={booking._id} key={index}>
            {moment(booking.bookingDate).toDate().toString().split("(")[0] +
              " - " +
              booking.productName +
              " - " +
              `${booking.mainTraveller.firstname} ${booking.mainTraveller.lastname}`}
          </option>
        ))}
      </select>
      <label className="form-label-title mt-2">Product Name</label>
      <input
        className="form-control"
        value={selectedBooking?.productName ?? ""}
        disabled
      />
      <div className="row mt-3 g-3">
        <div className="col-sm-4">
          <label className="form-label-title">Main Traveler Full Name</label>
          <input
            className="form-control"
            value={`${selectedBooking?.mainTraveller?.firstname ?? ""} ${
              selectedBooking?.mainTraveller?.lastname ?? ""
            }`}
            disabled
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Main Traveler Email</label>
          <input
            className="form-control"
            value={selectedBooking?.mainTraveller?.email ?? ""}
            disabled
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Participants</label>
          <input
            className="form-control"
            value={selectedBooking?.pax ?? ""}
            disabled
          />
        </div>
      </div>
      <div className="row mt-3 g-3">
        <div className="col-sm-4">
          <label className="form-label-title">Total Price(with VAT)</label>
          <input
            className="form-control"
            value={selectedBooking?.amount ?? ""}
            disabled
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Deposit Date</label>
          <input
            className="form-control"
            value={selectedBooking?.deposit ?? ""}
            disabled
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Pay Date</label>
          <input
            className="form-control"
            value={selectedBooking?.pay ?? ""}
            disabled
          />
        </div>
      </div>
      <button
        className="btn btn-outline-primary mt-3"
        type="button"
        onClick={createInvoice}
      >
        Report Save
      </button>
    </form>
  );
}

export default OutstandingInvoices;
