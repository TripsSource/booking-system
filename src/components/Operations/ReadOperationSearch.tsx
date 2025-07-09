import { RoleMembersState } from "@/types/app/employee";
import { OperationSearchState } from "@/types/app/operation";
import React, { ReactNode } from "react";

function ReadOperationSearch({
  search,
  inMonth,
  handleSearchTypeChange,
  handleSearchFieldChange,
  generateOptions,
  roleMembers,
}: {
  search: OperationSearchState;
  inMonth: { weeks: number; days: number };
  handleSearchTypeChange: (value: string) => void;
  handleSearchFieldChange: (field: string, value: string) => void;
  generateOptions: (length: number) => ReactNode;
  roleMembers: RoleMembersState[];
}) {
  const currentYear = new Date().getFullYear();
  const yearOffsets = [2, 1, 0, -1, -2];

  const renderSelect = (
    label: string,
    field: string,
    value: string,
    options: ReactNode
  ) => (
    <label className="form-label-title px-1">
      {label}
      <select
        className="form-control"
        name={field}
        value={value}
        onChange={(e) => {
          if (field === "type") {
            handleSearchTypeChange(e.target.value);
          } else {
            handleSearchFieldChange(field, e.target.value);
          }
        }}
      >
        {options}
      </select>
    </label>
  );

  return (
    <div className="g-3 header">
      {renderSelect(
        "Criteria",
        "type",
        search.type,
        <>
          <option value="quarter">Quarter</option>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </>
      )}

      {renderSelect(
        "Year",
        "year",
        search.year,
        yearOffsets.map((offset) => {
          const year = currentYear + offset;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })
      )}

      {search.type === "quarter" &&
        renderSelect("Quarter", "quarter", search.quarter, generateOptions(4))}

      {search.type !== "quarter" &&
        renderSelect("Month", "month", search.month, generateOptions(12))}

      {search.type === "week" &&
        renderSelect(
          "Week",
          "week",
          search.week,
          generateOptions(inMonth.weeks)
        )}

      {search.type === "day" &&
        renderSelect("Day", "day", search.day, generateOptions(inMonth.days))}

      <span className="spacer"></span>

      <label className="form-label-title px-1">
        Guider
        <select
          className="form-control"
          name="guider"
          value={search.guider}
          onChange={(e) => handleSearchFieldChange("guider", e.target.value)}
        >
          <option value="">All</option>
          {roleMembers.map((member) => (
            <option key={member._id} value={member._id}>
              {member.firstname} {member.lastname}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ReadOperationSearch;
