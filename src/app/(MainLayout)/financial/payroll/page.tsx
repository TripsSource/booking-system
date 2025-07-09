"use client";
import AccountPlan from "@/components/Financial/AccountPlan";
import BankDetail from "@/components/Financial/BankDetail";
import CompanyInsuraces from "@/components/Financial/CompanyInsuraces";
import Employment from "@/components/Financial/Employment";
import Insurance from "@/components/Financial/Insurance";
import MasterData from "@/components/Financial/MasterData";
import PersonalInformation from "@/components/Financial/PersonalInformation";
import SalarySlip from "@/components/Financial/SalarySlip";
import SourceTax from "@/components/Financial/SourceTax";
import Statistics from "@/components/Financial/Statistics";
import WageTypes from "@/components/Financial/WageTypes";
import { PAYROLLSTEPS } from "@/constants/data";
import RoleProvider from "@/providers/RoleProvider";
import React, { useEffect, useState } from "react";
import { TabContent, TabPane } from "reactstrap";

const PayrollPage = () => {
  const [stepTab, setStepTab] = useState(0);
  const [subStepTab, setSubStepTab] = useState<number>(10);

  useEffect(() => {
    const currentStep = PAYROLLSTEPS[stepTab];
    if (currentStep.sub && currentStep.sub.length > 0) {
      setSubStepTab(currentStep.sub[0].count);
    }
  }, [stepTab]);

  return (
    <RoleProvider target="Financial">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <ul className="nav nav-tabs mb-3">
              {PAYROLLSTEPS.map((StepTab) => (
                <li className="nav-item" key={StepTab.count}>
                  <a
                    className={`nav-link ${
                      stepTab === StepTab.count
                        ? "active bg-warning text-white"
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
            <button type="button" className="btn btn-outline-primary">
              Save
            </button>
          </div>
          {PAYROLLSTEPS[stepTab].sub &&
            PAYROLLSTEPS[stepTab].sub.length > 0 && (
              <ul className="nav nav-tabs mb-3">
                {PAYROLLSTEPS[stepTab].sub.map((StepTab) => (
                  <li className="nav-item" key={StepTab.count}>
                    <a
                      className={`nav-link ${
                        subStepTab === StepTab.count
                          ? "active bg-primary text-white"
                          : ""
                      }`}
                      href="#"
                      aria-current="page"
                      onClick={() => setSubStepTab(StepTab.count)}
                    >
                      {StepTab.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}

          <TabContent
            activeTab={
              stepTab === 0 || stepTab === 1 ? stepTab + subStepTab : stepTab
            }
            className="description-details"
          >
            <TabPane tabId={10} className="menu-part">
              <PersonalInformation />
            </TabPane>
            <TabPane tabId={11} className="menu-part">
              <Employment />
            </TabPane>
            <TabPane tabId={12} className="menu-part">
              <BankDetail />
            </TabPane>
            <TabPane tabId={13} className="menu-part">
              <Insurance />
            </TabPane>
            <TabPane tabId={14} className="menu-part">
              <SourceTax />
            </TabPane>
            <TabPane tabId={21} className="menu-part">
              <MasterData />
            </TabPane>
            <TabPane tabId={22} className="menu-part">
              <CompanyInsuraces />
            </TabPane>
            <TabPane tabId={23} className="menu-part">
              <WageTypes />
            </TabPane>
            <TabPane tabId={24} className="menu-part">
              <AccountPlan />
            </TabPane>
            <TabPane tabId={2} className="menu-part">
              <SalarySlip />
            </TabPane>
            <TabPane tabId={3} className="menu-part">
              <Statistics />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </RoleProvider>
  );
};

export default PayrollPage;
