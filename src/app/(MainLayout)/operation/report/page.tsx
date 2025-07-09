"use client";
import { AppDispatch } from "@/store";
import { createReportAction } from "@/store/operations";
import { ReportState } from "@/types/app/operation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import DropZoneCommon from "@/Common/DropZoneCommon";
import { useRouter } from "next/navigation";

function page() {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const [report, setReport] = useState<ReportState>({
    feedback: "",
    startTime: "",
    endTime: "",
    breakTime: 0,
    earnAmount: 0,
    files: [],
  });

  const handleReport = (param: string, value: string | number | File[]) => {
    setReport({ ...report, [param]: value });
  };

  const handleFilesSelected = (files: File[]) => {
    handleReport("files", files);
  };

  const saveReport = async () => {
    const { payload } = await dispatch(createReportAction(report));
    if (payload && "error" in payload && payload.error) {
      toast.error(`${payload.error}`);
    } else if (payload && "message" in payload && payload.message) {
      toast.success(`${payload.message}`);
      router.push("/dashboard");
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h3>Create Report</h3>
          <div className="justify-content-end d-flex">
            <button
              type="submit"
              className="btn btn-primary btn-block w-10"
              onClick={saveReport}
            >
              Save
            </button>
            {/* <LoadingButton
                              {...{
                                loading,
                                func: saveProduct,
                                title: "Add Destination",
                                classes: "btn btn-primary btn-block w-10",
                              }}
                            /> */}
          </div>
        </div>
        <div className="card-body mb-3">
          <form className="theme-form mega-form">
            <h6 className="form-label-title">
              Hi Part Of Group, here you can fill the report for the tour Basel
              Small Group Tour - Mt. Pilatus Heritage with a cruise on Lake of
              Lucerne from 2025-02-24 with Jennifer Batten. Report id:{" "}
              <span className="report-id">a2xVj000000fy8HIAQ</span>
            </h6>
            <div className="mb-3">
              <label className="form-label-title" htmlFor="feedback">
                1. Leave a feedback on this tour
              </label>
              <textarea
                className="form-control"
                id="feedback"
                name="feedback"
                value={report.feedback}
                onChange={(e) => handleReport("feedback", e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3 row">
              <div className="col-sm-6">
                <label className="form-label-title" htmlFor="startTime">
                  2. When did the tour start?
                </label>
                <div className="d-flex align-items-center g-3">
                  <select
                    className="col-sm-12"
                    id="startTime"
                    name="startTime"
                    value={report.startTime}
                    onChange={(e) => handleReport("startTime", e.target.value)}
                  >
                    {Array.from({ length: (24 * 60) / 15 }, (_, index) => {
                      const totalMinutes = index * 15;
                      const hours = Math.floor(totalMinutes / 60);
                      const minutes = totalMinutes % 60;
                      return (
                        <option
                          key={index}
                          value={`${String(hours).padStart(2, "0")}:${String(
                            minutes
                          ).padStart(2, "0")}`}
                        >
                          {String(hours).padStart(2, "0")}:
                          {String(minutes).padStart(2, "0")}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-sm-6">
                <label className="form-label-title" htmlFor="endTime">
                  3. When did the tour end?
                </label>
                <div className="d-flex align-items-center g-3">
                  <select
                    className="col-sm-12"
                    id="endTime"
                    name="endTime"
                    value={report.endTime}
                    onChange={(e) => handleReport("endTime", e.target.value)}
                  >
                    {Array.from({ length: (24 * 60) / 15 }, (_, index) => {
                      const totalMinutes = index * 15;
                      const hours = Math.floor(totalMinutes / 60);
                      const minutes = totalMinutes % 60;
                      return (
                        <option
                          key={index}
                          value={`${String(hours).padStart(2, "0")}:${String(
                            minutes
                          ).padStart(2, "0")}`}
                        >
                          {String(hours).padStart(2, "0")}:
                          {String(minutes).padStart(2, "0")}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-3 row">
              <div className="col-sm-6">
                <label className="form-label-title" htmlFor="breakTime">
                  4. How long was your break?
                </label>
                <input
                  type="number"
                  min={0}
                  defaultValue={0}
                  id="breakTime"
                  name="breakTime"
                  placeholder="Please enter the value in hours"
                  className="form-control"
                  required
                  onKeyDown={(e) => {
                    // Allow: Backspace, Tab, Delete, Arrows, etc.
                    if (
                      [
                        "Backspace",
                        "Tab",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                      ].includes(e.key)
                    ) {
                      return;
                    }
                    // Prevent if not a number key
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  value={report.breakTime}
                  onChange={(e) => handleReport("breakTime", e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label-title" htmlFor="earnAmount">
                  5. How much did you earn as tips?
                </label>
                <input
                  type="number"
                  min={0}
                  defaultValue={0}
                  id="earnAmount"
                  name="earnAmount"
                  placeholder="Please enter the value in CHF"
                  className="form-control"
                  required
                  onKeyDown={(e) => {
                    // Allow: Backspace, Tab, Delete, Arrows, etc.
                    if (
                      [
                        "Backspace",
                        "Tab",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                      ].includes(e.key)
                    ) {
                      return;
                    }
                    // Prevent if not a number key
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  value={report.earnAmount}
                  onChange={(e) => handleReport("earnAmount", e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label-title" htmlFor="files">
                6. Did you have any expenses? If so, upload the PDF here
              </label>
              <DropZoneCommon
                value={report.files}
                accept={{ "application/pdf": [] }}
                onFilesSelected={handleFilesSelected}
                multiple={false}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
