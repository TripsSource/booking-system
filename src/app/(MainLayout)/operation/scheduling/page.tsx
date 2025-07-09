"use client";

import React, { useEffect, useState } from "react";
import {
  DayPilot,
  DayPilotMonth,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import "./Calendar.css";
import {
  getOperationScheduleAction,
  getOperationScheduleByDayAction,
} from "@/store/operations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import { Modal, ModalBody } from "reactstrap";
import { Details } from "@/types/app/operation";

const Calendar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [startDate, setStartDate] = useState<DayPilot.Date>(
    DayPilot.Date.today()
  );
  const [events, setEvents] = useState<any[]>([]);
  const [details, setDetails] = useState<Details>({ assign: [], unassign: {} });
  const [assign, setAssign] = useState<number>(1);

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  const getSchedule = async () => {
    const { payload } = await dispatch(
      getOperationScheduleAction({
        year: new Date(startDate.toString()).getFullYear(),
        month: new Date(startDate.toString()).getMonth() + 1,
      })
    );
    const eventTemp: any[] = [];
    if (payload?.["data"]) {
      for (let i = 0; i < payload.data.length; i++) {
        if (payload.data[i][1][0]) {
          eventTemp.push({
            total: true,
            text: `Total Bookings: ${payload.data[i][1][0]}`,
            start: payload.data[i][0],
            end: payload.data[i][0],
          });
        }
        if (payload.data[i][1][1]) {
          eventTemp.push({
            assign: 1,
            text: `Assigned: ${payload.data[i][1][1]}`,
            start: payload.data[i][0],
            end: payload.data[i][0],
          });
        }
        if (payload.data[i][1][2]) {
          eventTemp.push({
            assign: 0,
            text: `Pending: ${payload.data[i][1][2]}`,
            start: payload.data[i][0],
            end: payload.data[i][0],
          });
        }
      }
    } else {
      if (payload && "error" in payload) {
        toast.error(String(payload.error));
      }
    }
    setEvents(eventTemp);
  };

  const getEvent = async (data: any) => {
    if (data.total) {
      return;
    }
    setAssign(data.assign);
    const [year, month, day] = data.start.split("-").map(Number);
    const { payload } = await dispatch(
      getOperationScheduleByDayAction({
        year,
        month,
        day,
        assign: data.assign,
      })
    );
    if (payload && "data" in payload) {
      if (data.assign === 1) {
        setDetails((prev: Details) => ({
          ...prev,
          assign: payload.data as [],
        }));
      } else {
        setDetails((prev: Details) => ({
          ...prev,
          unassign: payload.data as {}, // Cast payload.data to the expected type
        }));
      }
    } else {
      if (payload && "error" in payload) {
        toast.error(String(payload.error));
      }
    }
    toggleModal();
  };

  useEffect(() => {
    getSchedule();
  }, [startDate]);
  return (
    <div className={"container"}>
      <div className={"navigator"}>
        <DayPilotNavigator
          selectMode={"Month"}
          onTimeRangeSelected={(args) => setStartDate(args.day)}
          events={events}
        />
      </div>
      <div className={"content"}>
        <DayPilotMonth
          eventMoveHandling={"Disabled"}
          timeRangeSelectedHandling={"Disabled"}
          startDate={startDate}
          events={events}
          eventHeight={20}
          eventBarVisible={false}
          onEventClick={async (args) => getEvent(args.e.data)}
          // onBeforeEventRender={onBeforeEventRenderMonth}
        />
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
        {/* <ModalHeader toggle={toggleModal}>{212121}</ModalHeader> */}
        <ModalBody className="p-4">
          {assign ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Tour Name</th>
                  <th>Lead Traveler</th>
                  <th>Guide</th>
                  <th>Driver</th>
                </tr>
              </thead>
              <tbody>
                {details.assign.map(
                  (detail: {
                    tourName: string;
                    leadTraveller: string;
                    guide: string;
                    driver: string;
                  }) => (
                    <tr>
                      <td>{detail.tourName}</td>
                      <td>{detail.leadTraveller}</td>
                      <td>{detail.guide}</td>
                      <td>{detail.driver}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Tour Name</th>
                    <th>Lead Traveler</th>
                  </tr>
                </thead>
                <tbody>
                  {details.unassign?.unAssignBookings?.map(
                    (detail: { tourName: string; leadTraveller: string }) => (
                      <tr>
                        <td>{detail.tourName}</td>
                        <td>{detail.leadTraveller}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <table className="table">
                <thead>
                  <tr>
                    <th>Available Guide</th>
                  </tr>
                </thead>
                <tbody>
                  {details.unassign?.available?.guide?.map(
                    (guide: { name: string; _id: string }) => (
                      <tr>
                        <td>{guide.name}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <table className="table">
                <thead>
                  <tr>
                    <th>Available Driver</th>
                  </tr>
                </thead>
                <tbody>
                  {details.unassign?.available?.driver?.map(
                    (driver: { name: string; _id: string }) => (
                      <tr>
                        <td>{driver.name}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Calendar;
