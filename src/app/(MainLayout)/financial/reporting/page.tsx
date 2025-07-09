"use client";
import RoleProvider from "@/providers/RoleProvider";
import React, { useState } from "react";

function page() {
  const [stepTab, setStepTab] = useState(0);
  const PAYROLLSTEPS = [
    { count: 0, label: "Manuel Report" },
    { count: 1, label: "VAT Reporting" },
    { count: 2, label: "Journal" },
    { count: 3, label: "Accounts Area" },
  ];
  const liTags = [
    "200 – Sum of income transactions for services outside of Switzerland",
    "220 – Sum of all income transactions",
    "289 – Sum of 205, 220, 221, 225, 230, 235, 280",
    "299 – 200 deducted by 289",
    "303 – (Amount without VAT + VAT Amount)",
    "400 – VAT sum of all cost of goods sold",
    "405 – VAT sum of all the other fixed costs",
    "479 – Sum of 400, 405, 410, 415, and 420",
    "500 – 303 deducted by 479",
  ];
  return (
    <RoleProvider target="Financial">
      <div className="card">
        <div className="card-body">
          <ul className="nav nav-tabs mb-3">
            {PAYROLLSTEPS.map((StepTab: { count: number; label: string }) => (
              <li className="nav-item" key={StepTab.count}>
                <a
                  className={`nav-link ${
                    stepTab === StepTab.count
                      ? "active bg-primary text-white"
                      : ""
                  }`}
                  href="#"
                  aria-current="page"
                  onClick={() => setStepTab(StepTab.count)}
                >
                  {StepTab.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="m-5" />
          {stepTab === 0 && (
            <div>
              <div>
                <label>Manuel Report</label>
              </div>
              <div>
                <label>
                  (Copy the phrases and headings exactly as in your German PDF.)
                </label>
              </div>
            </div>
          )}
          {stepTab === 1 && (
            <>
              <div className="row mt-3">
                <label>VAT Reporting</label>
              </div>
              <div className="row mt-3">
                <label>Calculations:</label>
              </div>
              <div className="row">
                <ol>
                  {liTags.map((tag: string, index: number) => (
                    <li key={index} style={{ listStyleType: "circle" }}>
                      {tag}
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
          {stepTab === 2 && (
            <div>
              <div>
                <label>Journal</label>
              </div>
              <div>
                <label>
                  (This section will list each transaction as they occur:
                  incoming and outgoing payments.)
                </label>
              </div>
            </div>
          )}
          {stepTab === 3 && (
            <div>
              <div>
                <label>Accounts Area</label>
              </div>
              <div>
                <label>
                  General Reporting (to be integrated with PowerBI), Income
                  Statement, and Balance Sheet.
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleProvider>
  );
}

export default page;
