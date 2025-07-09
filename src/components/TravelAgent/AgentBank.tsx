import { TravelAgentState } from "@/types/app/travelAgent";
import React from "react";

function AgentBank({
  agent,
  handleTravelAgentProfileInfo,
}: {
  agent: TravelAgentState;
  handleTravelAgentProfileInfo: (
    key: "addr" | "bank",
    type: string,
    value: string
  ) => void;
}) {
  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-sm-6">
          <label className="form-label-title">Beneficiary Name</label>
          <input
            className="form-control"
            type="text"
            value={agent.travelAgentProfile.bank?.name}
            onChange={(e) =>
              handleTravelAgentProfileInfo("bank", "name", e.target.value)
            }
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label-title">IBAN Or Account Number</label>
          <input
            className="form-control"
            type="text"
            value={agent.travelAgentProfile.bank?.iban}
            onChange={(e) =>
              handleTravelAgentProfileInfo("bank", "iban", e.target.value)
            }
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-8">
          <label className="form-label-title">Address</label>
          <input
            className="form-control"
            type="text"
            value={agent.travelAgentProfile.bank?.addr}
            onChange={(e) =>
              handleTravelAgentProfileInfo("bank", "addr", e.target.value)
            }
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">SWIFT Code</label>
          <input
            className="form-control"
            type="text"
            value={agent.travelAgentProfile.bank?.swift}
            onChange={(e) =>
              handleTravelAgentProfileInfo("bank", "swift", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AgentBank;
