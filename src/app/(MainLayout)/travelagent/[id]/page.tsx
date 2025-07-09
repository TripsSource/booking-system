"use client";
import React, { useEffect, useState } from "react";
import { TRAVELAGENTSTEPS } from "@/constants/data";
import { TravelAgentState } from "@/types/app/travelAgent";
import {
  initialTravelAgent,
  validateTravelAgent,
} from "@/app/(MainLayout)/travelagent/initialtravelAgentState";
import Link from "next/link";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  getTravelAgentAction,
  travelAgentLoading,
  updateTravelAgentAction,
} from "@/store/travelAgent";
import { AppDispatch } from "@/store";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import PageLoader from "@/layouts/PageLoader";
import { userState } from "@/store/auth";
import AgentInformation from "@/components/TravelAgent/AgentInformation";
import AgentCommission from "@/components/TravelAgent/AgentCommission";
import AgentBank from "@/components/TravelAgent/AgentBank";

const page = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState<TravelAgentState>(initialTravelAgent);
  const loading = useSelector(travelAgentLoading);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(userState);

  const [stepTab, setStepTab] = useState(0);

  const getId = id === "profile" ? user._id : id;
  useEffect(() => {
    fetchTravelAgent();
  }, [getId]);

  const fetchTravelAgent = async () => {
    const { payload } = await dispatch(getTravelAgentAction(getId as string));
    if (payload?.["data"]) {
      setAgent((pre) => ({ ...pre, ...payload.data }));
    } else {
      toast.error(payload.error);
    }
    return null;
  };

  const handleAgent = (type: string, value: string | string[]) => {
    setAgent({ ...agent, [type]: value });
  };

  const handleTravelAgentProfile = (
    type: string,
    value: string | string[] | number
  ) => {
    setAgent({
      ...agent,
      travelAgentProfile: { ...agent.travelAgentProfile, [type]: value },
    });
  };

  const handleTravelAgentProfileInfo = (
    key: "addr" | "bank",
    type: string,
    value: string
  ) => {
    setAgent({
      ...agent,
      travelAgentProfile: {
        ...agent.travelAgentProfile,
        [key]: {
          ...agent.travelAgentProfile[key],
          [type]: value,
        },
      },
    });
  };

  const saveTravelAgent = async () => {
    if (!validateTravelAgent(agent)) {
      const { payload } = await dispatch(
        updateTravelAgentAction({ id: getId as string, data: agent })
      );
      if (payload?.["message"]) toast.success(payload.message);
      else if (payload?.["error"]) toast.error(payload.error);
    }
  };

  return (
    <div className="card">
      <div className="card-header card-header--2 mb-3">
        <h3>Agent Details</h3>
        {validateTravelAgent(agent) ? (
          <button type="button" className="btn btn-primary" disabled>
            Save
          </button>
        ) : (
          <Link
            href="#"
            className={`align-items-center btn btn-theme`}
            type="button"
            onClick={saveTravelAgent}
            aria-disabled={validateTravelAgent(agent)}
          >
            <div className="d-flex align-items-start">
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm text-white me-2"
                  role="status"
                ></div>
              ) : (
                <DynamicFeatherIcon iconName="Save" />
              )}
              Save
            </div>
          </Link>
        )}
      </div>
      <div className="px-5">
        <ul className="nav nav-tabs px-5">
          {TRAVELAGENTSTEPS.map((step: { count: number; label: string }) => (
            <li className="nav-item" key={step.count}>
              <a
                className={`nav-link ${
                  stepTab === step.count ? "active" : null
                }`}
                aria-current="page"
                href="#"
                onClick={(e) => setStepTab(Number(step.count))}
              >
                {step.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <form className="theme-form mega-form">
        {loading ? (
          <PageLoader />
        ) : (
          <div className="card-body mx-5">
            <div className="mx-5">
              {stepTab === 0 && (
                <AgentInformation
                  {...{
                    agent,
                    handleAgent,
                    handleTravelAgentProfile,
                    handleTravelAgentProfileInfo,
                  }}
                />
              )}
              {stepTab === 1 && (
                <AgentCommission
                  {...{
                    agent,
                    handleTravelAgentProfile,
                  }}
                />
              )}
              {stepTab === 2 && (
                <AgentBank
                  {...{
                    agent,
                    handleTravelAgentProfileInfo,
                  }}
                />
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default page;
