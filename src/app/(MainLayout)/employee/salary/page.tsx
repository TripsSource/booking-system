"use client";
import { MONTHSTEPS } from "@/constants/data";
import React, { useState } from "react";

function page() {
  const [stepTab, setStepTab] = useState(0);
  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-start">
          <ul className="nav nav-tabs mb-3 ">
            {MONTHSTEPS.map((StepTab: string, index: number) => (
              <li className="nav-item" key={index}>
                <a
                  className={`nav-link ${
                    stepTab === index ? "active bg-past text-white" : ""
                  }`}
                  href="#"
                  aria-current="page"
                  onClick={() => setStepTab(index)}
                >
                  {StepTab}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card-body"></div>
    </div>
  );
}

export default page;
