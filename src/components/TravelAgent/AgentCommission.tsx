import {
  budgetPerClient,
  commissionPaymentMethod,
  currency,
  tourofClients,
} from "@/constants/data";
import { userState } from "@/store/auth";
import { TravelAgentState } from "@/types/app/travelAgent";
import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useSelector } from "react-redux";

function AgentCommission({
  agent,
  handleTravelAgentProfile,
}: {
  agent: TravelAgentState;
  handleTravelAgentProfile: (
    type: string,
    value: string | string[] | number
  ) => void;
}) {
  const user = useSelector(userState);
  return (
    <>
      <div className="row mt-3">
        <div className="col-sm-4">
          <label className="form-label-title">Commission Payment Method</label>
          <select
            value={agent.travelAgentProfile.commissionPay}
            required
            className="form-control"
            onChange={(e) =>
              handleTravelAgentProfile("commissionPay", e.target.value)
            }
          >
            <option value="">--Select Commission Payment Method--</option>
            {commissionPaymentMethod.map((tourType, index) => (
              <option value={tourType} key={index}>
                {tourType}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">
            Preferred Currency for Payment
          </label>
          <select
            value={agent.travelAgentProfile?.preferredCurrency}
            required
            className="form-control"
            onChange={(e) =>
              handleTravelAgentProfile("preferredCurrency", e.target.value)
            }
          >
            <option value="">--Select Preferred Currency for Payment--</option>
            {currency.map((tourType, index) => (
              <option value={tourType} key={index}>
                {tourType}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Budget Per Client</label>
          <select
            value={agent.travelAgentProfile.budget}
            required
            className="form-control"
            onChange={(e) => handleTravelAgentProfile("budget", e.target.value)}
            disabled={user.role !== "Admin"}
          >
            <option value="">--Select Budget Per Client--</option>
            {budgetPerClient.map((tourType, index) => (
              <option value={tourType} key={index}>
                {agent.travelAgentProfile?.preferredCurrency + " " + tourType}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-8">
          <label className="form-label-title">Type of Clients</label>
          <Typeahead
            id="multiple-typeahead"
            multiple
            selected={agent.travelAgentProfile.clientType}
            options={tourofClients}
            onChange={(e) =>
              handleTravelAgentProfile(
                "clientType",
                e.map((option) =>
                  typeof option === "string" ? option : option.label
                )
              )
            }
            placeholder="Select client types...."
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Percent</label>
          {/* <div className="form-input position-relative"> */}
          <input
            value={agent.travelAgentProfile.percent}
            required
            type="number"
            className="form-control"
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              handleTravelAgentProfile(
                "percent",
                isNaN(val) ? 0 : Math.max(0, Math.min(100, val))
              );
            }}
            disabled={user.role !== "Admin"}
          />
          <div className="show-hide mt-1">%</div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default AgentCommission;
