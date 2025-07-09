"use client";
import React, { useEffect, useState } from "react";
import RoleProvider from "@/providers/RoleProvider";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getIdEmployeeAction } from "@/store/employee";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { EmployeeState } from "@/types/app/employee";
import { userState } from "@/store/auth";
import { initialEmployee } from "@/app/(MainLayout)/employee/information/InitialEmployeeState";

function page() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(userState);

  const [employee, setEmployee] = useState<EmployeeState>(initialEmployee);

  const getIdEmployee = async () => {
    const { payload } = await dispatch(getIdEmployeeAction(`${user._id}`));

    if (!payload || !payload.employeeProfile) {
      console.error(payload);
      return;
    }

    const { employeeProfile } = payload;

    const namePart = employeeProfile.sourceTax?.spouse?.name?.split(" ") || [
      "",
      "",
    ];

    const emp = {
      ...employeeProfile,
      sourceTax: {
        ...employeeProfile.sourceTax,
        spouse: {
          ...employeeProfile.sourceTax?.spouse,
          firstname: namePart[0],
          lastname: namePart[1],
        },
      },
    };
    setEmployee(emp);
  };

  useEffect(() => {
    getIdEmployee();
  }, [user._id]);

  const { absence } = employee;
  const generateAbsenceEvents = () => {
    const events = absence.map((event) => {
      const currentYear = moment().year();
      const defaultEndDate = moment(`${currentYear}-12-31`).format(
        "YYYY-MM-DD"
      );
      const start = moment(event.startDate);
      if (!start.isValid()) {
        console.error("Invalid start date:", event.startDate);
        return [];
      }
      const end = event.endDate
        ? moment(event.endDate)
        : moment(defaultEndDate);
      if (!end.isValid()) {
        console.error("Invalid end date:", event.endDate);
        return [];
      }
      const formattedStart = start.format("YYYY-MM-DD");
      const totalDays = end.diff(start, "days") + 1;

      const eventDates = Array.from({ length: totalDays }).map((_, index) => {
        const date = moment(formattedStart)
          .clone()
          .add(index, "days")
          .format("YYYY-MM-DD");

        return {
          title: event.reason,
          start: date,
          end: date,
          className: "absence-event",
        };
      });
      return eventDates;
    });

    return events.flat();
  };

  return (
    <RoleProvider target="Employee">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        initialDate={moment(Date.now()).format("YYYY-MM-DD")}
        fixedWeekCount={false}
        events={generateAbsenceEvents()}
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        height="450px"
        eventColor="#28a745"
        eventTextColor="#fff"
        eventBorderColor="#1e7e34"
      />
    </RoleProvider>
  );
}

export default page;
