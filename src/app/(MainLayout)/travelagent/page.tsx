"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Href } from "@/utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  allAgents,
  getAllTravelAgentsAction,
  travelAgentLoading,
  updateTravelAgentAction,
} from "@/store/travelAgent";
import { toast } from "react-toastify";
import moment from "moment";
import PageLoader from "@/layouts/PageLoader";
import RoleProvider from "@/providers/RoleProvider";
import { AdminPage } from "@/app/(MainLayout)/travelagent/admin";
import PurePagination from "@/Common/PurePagination";
import { AgentState } from "@/types/app/travelAgent";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

const page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [agent, setAgent] = useState({
    data: [],
    page: 1,
    perPage: 10,
    totalPages: 0,
    totalCount: 0,
    search: "",
    sort: "",
    order: "",
  });
  const { page, perPage, totalPages, sort, order, search } = agent;

  const fetchAllAgents = async () => {
    const { payload } = await dispatch(
      getAllTravelAgentsAction({ page, perPage, sort, order })
    );
    if (payload?.["data"]) {
      setAgent((pre) => ({ ...pre, ...payload }));
    } else {
      setAgent((pre) => ({ ...pre, data: [] }));
      console.log("Unexpected payload:", payload);
    }
  };

  const handleChangeAgent = async (id: string, value: boolean) => {
    const { payload } = await dispatch(
      updateTravelAgentAction({ id, data: { isActive: !value } })
    );
    if (payload?.["message"]) {
      toast.success(payload.message);
      await fetchAllAgents();
    } else if (payload?.["error"]) toast.success(payload.error);
  };

  const loading = useSelector(travelAgentLoading);
  useEffect(() => {
    fetchAllAgents();
  }, [page, perPage, sort, order]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchAllAgents();
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handlePages = (type: string, value: number | string) => {
    if (type === "perPage")
      setAgent((pre) => ({ ...pre, page: 1, perPage: Number(value) }));
    else setAgent((pre) => ({ ...pre, [type]: value }));
  };

  const handleSortOrder = (item: string) => {
    if (!sort && !order) {
      setAgent({ ...agent, sort: item, order: "asc" });
    } else if (sort === item) {
      const nextOrder =
        order === "asc" ? "desc" : order === "desc" ? "" : "asc";

      setAgent({
        ...agent,
        sort: nextOrder ? sort : "",
        order: nextOrder,
      });
    } else {
      setAgent({ ...agent, sort: item, order: "asc" });
    }
  };

  const agentTitles = [
    { label: "Name", value: "firstname" },
    { label: "Email", value: "email" },
    { label: "Phone", value: "travelAgentProfile.phone" },
    { label: "Travel Agency Name", value: "travelAgentProfile.agencyName" },
    { label: "Year of Incorporation", value: "travelAgentProfile.incorpYear" },
  ];
  return (
    <RoleProvider target="Travel Agent">
      <AdminPage>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header card-header--2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>View Travel Agents</h5>
                    <div className="mb-3 d-flex align-items-center">
                      <label className="form-label-title mt-1">Search: </label>
                      <input
                        className="form-control"
                        value={search}
                        onChange={(e) => handlePages("search", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive table-desi">
                    {agent.data && agent.data.length > 0 && (
                      <PurePagination
                        {...{
                          pages: { page, perPage, totalPages },
                          handlePages,
                          loading,
                        }}
                      />
                    )}
                    <table className="user-table table table-striped">
                      <thead>
                        <tr>
                          {agentTitles.map((title, index) => (
                            <th
                              className="text-center"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleSortOrder(title.value)}
                            >
                              <div className="d-flex justify-content-center align-items-center">
                                {title.label}
                                {title.value === sort && order === "asc" && (
                                  <FaSortUp className="mt-2" />
                                )}
                                {title.value === sort && order === "desc" && (
                                  <FaSortDown className="mb-2" />
                                )}
                              </div>
                            </th>
                          ))}
                          <th className="text-center">Active</th>
                          <th colSpan={2}>Control</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan={8}>
                              <PageLoader />
                            </td>
                          </tr>
                        ) : agent.data.length > 0 ? (
                          agent.data.map((agent: AgentState, index) => (
                            <tr key={index}>
                              <td className="text-center">
                                {agent.firstname + " " + agent.lastname}
                              </td>
                              <td className="text-center">{agent.email}</td>
                              <td className="text-center">+{agent.phone}</td>
                              <td className="text-center">
                                {agent.agencyName}
                              </td>
                              <td className="text-center">
                                {moment(agent.incorpYear).year()}
                              </td>
                              <td>
                                <div className="form-check form-switch  d-flex justify-content-center">
                                  <input
                                    className="form-check-input px-3"
                                    type="checkbox"
                                    role="switch"
                                    id="live_status"
                                    style={{ cursor: "pointer" }}
                                    disabled={loading}
                                    checked={agent.isActive}
                                    onChange={(e) =>
                                      handleChangeAgent(
                                        agent._id,
                                        agent.isActive
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label px-3"
                                    htmlFor="live_status"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {agent.isActive ? "Allow" : "Not"}
                                  </label>
                                </div>
                              </td>
                              <td>
                                <a href={`/travelagent/${agent._id}`}>
                                  <i className="fa fa-pencil-square-o" />
                                </a>
                              </td>
                              <td>
                                <a href={Href}>
                                  <i className="fa fa-trash-o" />
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8}>No Data</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    {agent.data && agent.data.length > 0 && (
                      <PurePagination
                        {...{
                          pages: { page, perPage, totalPages },
                          handlePages,
                          loading,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminPage>
    </RoleProvider>
  );
};

export default page;
