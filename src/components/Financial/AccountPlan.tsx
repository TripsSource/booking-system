import React from "react";

function AccountPlan() {
  return (
    <div>
      <form className="theme-form mega-form">
        <div className="mb-5">
          <table className="user-table table table-striped">
            <thead>
              <tr>
                <th>Number</th>
                <th>Description</th>
                <th>Financial Accounting Accounts Plan Adjustment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1020</td>
                <td>1020</td>
                <td>PostFinance CHF Account</td>
              </tr>
              <tr>
                <td>1090</td>
                <td>Transfer account</td>
                <td>Transfer account</td>
              </tr>
              <tr>
                <td>1091</td>
                <td>Salary pass-through account</td>
                <td>Transitory account</td>
              </tr>
              <tr>
                <td>1183</td>
                <td>Accident insurance</td>
                <td>CA Accident insurance</td>
              </tr>
              <tr>
                <td>1184</td>
                <td>Per diem sickness allowance</td>
                <td>CA Sick pay insurance</td>
              </tr>
              <tr>
                <td>1188</td>
                <td>Withholding tax</td>
                <td>CA Source taxation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default AccountPlan;
