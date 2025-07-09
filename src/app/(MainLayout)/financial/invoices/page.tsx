"use client";
import InvoicesSettled from "@/components/Financial/InvoicesSettled";
import OutstandingInvoices from "@/components/Financial/OutstandingInvoices";
import RoleProvider from "@/providers/RoleProvider";
import React, { useState } from "react";

function InvoicesPage() {
  const [stepTab, setStepTab] = useState<number>(0);

  return (
    <RoleProvider target="Financial">
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs">
            {["Outstanding Invoices", "Invoices Settled"].map(
              (StepTab, index: number) => (
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
              )
            )}
          </ul>
        </div>
        <div className="card-body">
          {stepTab === 0 && <OutstandingInvoices />}
          {stepTab === 1 && <InvoicesSettled />}
        </div>
      </div>
    </RoleProvider>
  );
}

export default InvoicesPage;
