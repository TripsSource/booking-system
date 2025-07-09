import React from "react";

function WageTypes() {
  return (
    <div>
      <form className="theme-form mega-form">
        <div className="mb-5">
          <table className="user-table table table-striped">
            <thead>
              <tr>
                <th>Number</th>
                <th>Description</th>
                <th>Account Credit</th>
                <th>Account Debit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>9061</td>
                <td>PP wages</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>9062</td>
                <td>PP premium Swiss Life employee</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>9063</td>
                <td>PP premium Swiss Life employer</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>9065</td>
                <td>PP owed</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default WageTypes;
