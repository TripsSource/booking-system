import React, { Dispatch, useState, SetStateAction } from "react";

function Statistics() {
  return (
    <div>
      <form className="theme-form mega-form">
        <div className="mb-5">
          <label className="form-label-title">
            <strong>Payroll Statistics</strong>
          </label>
          <hr className="hr" />
          <table className="user-table table table-striped">
            <thead>
              <tr>
                <th>Description</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Employees Currently Working</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Average Salary (Guides)</td>
                <td>CHF 0</td>
              </tr>
              <tr>
                <td>Average Salary (Drivers)</td>
                <td>CHF 0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default Statistics;
