import { OperationTableHeaderTitles } from "@/constants/data";
import PageLoader from "@/layouts/PageLoader";
import { OperationLoading } from "@/store/operations";
import {
  GuideAndDriverState,
  OperationBookingState,
  OperationSearchState,
} from "@/types/app/operation";
import moment from "moment";
import React, { Dispatch, Fragment, SetStateAction, useMemo } from "react";
import { useSelector } from "react-redux";
import { FaSortUp, FaSortDown } from "react-icons/fa6";
import { RoleMembersState } from "@/types/app/employee";
import { guidesColors } from "@/utils/Constant";

function ReadOperations({
  trustBookings,
  search,
  setSearch,
  roleMembers,
  handleSortOrder,
  onChangeGuideAndDriver,
}: {
  trustBookings: OperationBookingState[];
  search: OperationSearchState;
  setSearch: Dispatch<SetStateAction<OperationSearchState>>;
  roleMembers: RoleMembersState[];
  handleSortOrder: (item: string) => void;
  onChangeGuideAndDriver: (data: GuideAndDriverState) => void;
}) {
  const isLoading = useSelector(OperationLoading);
  const guides = roleMembers.filter((member) => member.role === "Guide");
  const drivers = roleMembers.filter((member) => member.role === "Driver");
  const exceptGuides = trustBookings?.map((item) => item.exceptGuide).flat();

  const { sortField, sortOrder } = search;
  return (
    <div className="table-responsive">
      <table className="user-table table">
        <thead>
          <tr>
            {OperationTableHeaderTitles.map((title, index) => (
              <th
                key={index}
                className="text-center text-nowrap"
                style={{ cursor: "pointer" }}
                onClick={() => handleSortOrder(title.sortField)}
              >
                <div className="d-flex justify-content-center align-items-center">
                  {title.label}
                  {title.sortField === sortField && sortOrder === "asc" && (
                    <FaSortUp className="mt-2" />
                  )}
                  {title.sortField === sortField && sortOrder === "desc" && (
                    <FaSortDown className="mb-2" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={12}>
                <PageLoader />
              </td>
            </tr>
          ) : (
            trustBookings?.map((data, index) => (
              <Fragment key={index}>
                {data.bookings.map((child, i) => {
                  const guideIndex = guides.findIndex(
                    (item) => item._id === child.guide
                  );
                  return (
                    <tr
                      key={i}
                      style={{ backgroundColor: guidesColors[guideIndex] }}
                    >
                      {i === 0 && (
                        <td
                          rowSpan={data.bookings.length}
                          style={{ backgroundColor: "white" }}
                        >
                          {moment(data.closeDate).format("DD/MM/YYYY") +
                            `(${data.bookings.length})`}
                        </td>
                      )}
                      <td className="text-center text-nowrap">
                        {child.client}
                      </td>
                      <td className="text-center">{child.source}</td>
                      <td className="text-center text-nowrap">{child.tour}</td>
                      <td className="text-center">
                        {moment(child.timeBooked).format("HH:MM:SS DD/MM/YYYY")}
                      </td>
                      <td className="text-center text-nowrap">{child.PAX}</td>
                      <td className="text-center">{child.tourStart}</td>
                      <td className="text-center">{child.meetingLocation}</td>
                      <td className="text-center">
                        <select
                          className="form-control"
                          style={{ backgroundColor: guidesColors[guideIndex] }}
                          value={child.guide ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            onChangeGuideAndDriver({
                              _id: child._id,
                              guide: !value ? null : value,
                              driver: child.driver,
                            });
                          }}
                        >
                          <option value="">-</option>
                          {guides.map((guide) => (
                            <option key={guide._id} value={guide._id}>
                              {guide.firstname + " " + guide.lastname}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="text-center">
                        <select
                          className="form-control"
                          style={{ backgroundColor: guidesColors[guideIndex] }}
                          value={child.driver ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            onChangeGuideAndDriver({
                              _id: child._id,
                              guide: child.guide,
                              driver: !value ? null : value,
                            });
                          }}
                        >
                          <option value="">-</option>
                          {drivers.map((driver) => (
                            <option key={driver._id} value={driver._id}>
                              {driver.firstname + " " + driver.lastname}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{child.status}</td>
                    </tr>
                  );
                })}
              </Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReadOperations;
