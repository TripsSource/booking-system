import { insurancesState } from "@/types/app/financial";
import React, { useState } from "react";
import { Trash2 } from "react-feather";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

function CompanyInsuraces({
  insuranceData,
}: {
  insuranceData: insurancesState;
}) {
  const [open, setOpen] = useState("1");

  const toggle = (id: string) => {
    open === id ? setOpen("") : setOpen(id);
  };

  const initialFCF = {
    name: "Compensation Office",
    useCompanyAddress: true,
  };

  const initialPPSolution = { pp: "", code: "" };
  const initialAISolution = { pp: "", code: "" };
  const initialPP = { name: "PP", solutions: [initialPPSolution] };
  const initialAI = { name: "AI", solutions: [initialAISolution] };

  const [selected, setSelected] = useState({ fcf: 0, pp: 0, ai: 0 });

  const [insurances, setInsurances] = useState({
    FCF: [initialFCF],
    PP: [initialPP],
    AI: [initialAI],
  });

  return (
    <form className="theme-form mega-form">
      <div className="menu-part accordion tab-pane " id="itinerary">
        <div id="accordion" className="accordion-plan">
          <Accordion open={open} toggle={toggle} className="dark-accordion">
            <AccordionItem>
              <AccordionHeader targetId="1">
                OASI, EO, DI, ALV - Social Insurances
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <div className="row">
                  <div className="col-sm-3">
                    <label className="form-label-title">OASI, DI, EO</label>
                  </div>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Employer 5.300%
                        </label>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Employee 5.300%
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Member number / insured number
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">Subnumber</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row mt-5">
                      <label className="form-label-title">
                        <input type="radio" className="form-check-input" />{" "}
                        Holiday compensation refers to the sum of hourly wage
                        and vacation bonus
                      </label>
                      <div className="d-flex justify-content-between">
                        <input
                          type="text"
                          placeholder="Name of the compensation fund"
                          className="form-control"
                        />
                      </div>
                      <label className="form-label-title mt-3">
                        <input type="radio" className="form-check-input" />{" "}
                        Insurance with electronic wage reporting (EWR)
                      </label>
                      <div className="d-flex justify-content-between">
                        <select className="form-control">
                          <option>Name of the compensation fund</option>
                          <option>English</option>
                          <option>French</option>
                          <option>Italian</option>
                        </select>
                        <input
                          type="text"
                          placeholder="ID of the compensation fund"
                          className="form-control"
                        />
                      </div>
                      <label className="form-label-title">
                        The social insurances require the details of your PP and
                        AI if you use EWR. If you are not insured, state the
                        reason why.
                      </label>
                      <div className="ms-3">
                        Do you have a PP?
                        <div className="row mt-2">
                          <div className="col-sm-4">
                            <label className="form-label-title">
                              <input
                                type="radio"
                                className="form-check-input"
                              />{" "}
                              Yes
                            </label>
                          </div>
                          <div className="col-sm-8">
                            <label className="form-label-title">
                              Main insurance *
                            </label>
                            <select className="form-control">
                              <option>please select</option>
                              <option>PP insurance</option>
                            </select>
                            <label className="form-label-title">
                              Valid from *
                            </label>
                            <input type="date" className="form-control" />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-sm-4">
                            <label className="form-label-title">
                              <input
                                type="radio"
                                className="form-check-input"
                              />{" "}
                              No
                            </label>
                          </div>
                          <div className="col-sm-8">
                            <label className="form-label-title">Reason</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        Do you have a AI?
                        <div className="row mt-2">
                          <div className="col-sm-4">
                            <label className="form-label-title">
                              <input
                                type="radio"
                                className="form-check-input"
                              />{" "}
                              Yes
                            </label>
                          </div>
                          <div className="col-sm-8">
                            <label className="form-label-title">
                              Main insurance *
                            </label>
                            <select className="form-control">
                              <option>please select</option>
                              <option>UVG insurance</option>
                            </select>
                            <label className="form-label-title">
                              Valid from *
                            </label>
                            <input type="date" className="form-control" />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-sm-4">
                            <label className="form-label-title">
                              <input
                                type="radio"
                                className="form-check-input"
                              />{" "}
                              No
                            </label>
                          </div>
                          <div className="col-sm-8">
                            <label className="form-label-title">Reason</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <label className="form-label-title">
                        Administrative costs OASI
                      </label>
                      <div className="d-flex justify-content-start align-items-center">
                        <input
                          className="form-control me-1"
                          type="number"
                          placeholder="e.g. 1.2"
                          min={0}
                          max={100}
                        />
                        <span className="fs-5">%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-3">
                    <label className="form-label-title">
                      Unemployment insurance
                    </label>
                  </div>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-sm-4">Employer 1.10%</div>
                      <div className="col-sm-4">Employee 1.10%</div>
                      <div className="col-sm-4">Limit 148'200.00 CHF</div>
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="2">
                FCF - Copensation Fund
              </AccordionHeader>
              <AccordionBody accordionId="2">
                <label className="form-label-title">FCF Contribution (%)</label>
                <div className="row">
                  <div className="col-sm-3">
                    <ul className="nav mb-3 flex-column">
                      {insurances.FCF.map((fcf, index: number) => (
                        <li className="nav-item" key={index}>
                          <a
                            className={`nav-link ${
                              selected.fcf === index
                                ? "active bg-danger text-white border-1"
                                : ""
                            }`}
                            href="#"
                            aria-current="page"
                            onClick={() =>
                              setSelected((pre) => ({
                                ...pre,
                                fcf: index,
                              }))
                            }
                          >
                            {fcf.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-outline-past"
                        onClick={() => {
                          setInsurances((pre) => ({
                            ...pre,
                            FCF: [...pre.FCF, initialFCF],
                          }));
                        }}
                      >
                        + Add insurance
                      </button>
                      <button
                        className="bg-transparent border-0"
                        type="button"
                        onClick={() => {
                          setInsurances((pre) => ({
                            ...pre,
                            FCF: pre.FCF.filter(
                              (_, index) => index !== selected.fcf
                            ),
                          }));
                        }}
                      >
                        <Trash2 color={"#dc3545"} size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Member number / insured number
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">Subnumber</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-6">
                        <label className="form-label-title">Employer</label>
                        <div className="d-flex justify-content-start align-items-center">
                          <input
                            className="form-control me-1"
                            type="number"
                            min={0}
                            max={70}
                          />
                          <span className="fs-5">%</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">Employee</label>
                        <div className="d-flex justify-content-start align-items-center">
                          <input
                            className="form-control me-1"
                            type="number"
                            min={0}
                            max={70}
                          />
                          <span className="fs-5">%</span>
                        </div>
                      </div>
                    </div>
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                      />
                      Include this FCF insurance in employee’s wage statement
                      (Digit 9)
                    </label>
                    <label className="form-label-title">
                      <input type="radio" className="form-check-input" />{" "}
                      Insurance without electronic wage reporting
                    </label>
                    <input type="text" className="form-control" />
                    <label className="form-label-title">
                      <input type="radio" className="form-check-input" />{" "}
                      Insurance with electronic wage reporting (EWR)
                    </label>
                    <div className="d-flex justify-content-between">
                      <select className="form-control">
                        <option>Name of the compensation fund</option>
                        <option>English</option>
                        <option>French</option>
                        <option>Italian</option>
                      </select>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Insurance company number"
                      />
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="3">
                PP - Occupational Benefit Plan
              </AccordionHeader>
              <AccordionBody accordionId="3">
                <label className="form-label-title">Benefit Rate (%)</label>
                <div className="row">
                  <div className="col-sm-3">
                    <ul className="nav mb-3 flex-column">
                      {insurances.PP.map((pp, index: number) => (
                        <li className="nav-item" key={index}>
                          <a
                            className={`nav-link ${
                              selected.pp === index
                                ? "active bg-danger text-white border-1"
                                : ""
                            }`}
                            href="#"
                            aria-current="page"
                            onClick={() =>
                              setSelected((pre) => ({
                                ...pre,
                                pp: index,
                              }))
                            }
                          >
                            {pp.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-outline-past"
                        onClick={() => {
                          setInsurances((pre) => ({
                            ...pre,
                            PP: [...pre.PP, initialPP],
                          }));
                        }}
                      >
                        + Add insurance
                      </button>
                      <button
                        className="bg-transparent border-0"
                        type="button"
                        onClick={() => {
                          setInsurances((pre) => ({
                            ...pre,
                            PP: pre.PP.filter(
                              (_, index) => index !== selected.pp
                            ),
                          }));
                        }}
                      >
                        <Trash2 color={"#dc3545"} size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <label className="form-label-title">
                      <input type="radio" className="form-check-input" />{" "}
                      Insurance without electronic wage reporting
                    </label>
                    <input type="text" className="form-control" />
                    <label className="form-label-title">
                      <input type="radio" className="form-check-input" />{" "}
                      Insurance with electronic wage reporting (EWR)
                    </label>
                    <div className="d-flex justify-content-between">
                      <select className="form-control">
                        <option>Name of the compensation fund</option>
                        <option>English</option>
                        <option>French</option>
                        <option>Italian</option>
                      </select>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Insurance company number"
                      />
                    </div>
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Customer number
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Contract number
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="form-check form-switch d-flex mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="deputy"
                      />
                      <label className="form-check-label mx-1" htmlFor="deputy">
                        Deviating coordination deduction
                      </label>
                    </div>
                    <h5 className="mt-3">
                      <strong>PP solutions</strong>
                    </h5>
                    {insurances.PP[selected.pp].solutions.map(
                      (solution, index) => (
                        <div
                          className="d-flex justify-content-between mt-3"
                          key={index}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="PP solution"
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Code"
                          />
                          <button
                            className="bg-transparent border-0"
                            type="button"
                            onClick={() => {
                              setInsurances((pre) => ({
                                ...pre,
                                PP: pre.PP.map((pp, ind) => {
                                  if (ind === selected.pp) {
                                    return {
                                      ...pp,
                                      solutions: pp.solutions.filter(
                                        (_, i) => i !== index
                                      ),
                                    };
                                  } else return pp;
                                }),
                              }));
                            }}
                          >
                            <Trash2 color={"#dc3545"} size={20} />
                          </button>
                        </div>
                      )
                    )}
                    <button
                      type="button"
                      className="btn btn-outline-past mt-3"
                      onClick={() => {
                        setInsurances((pre) => ({
                          ...pre,
                          PP: pre.PP.map((pp, ind) => {
                            if (ind === selected.pp) {
                              return {
                                ...pp,
                                solutions: [...pp.solutions, initialPPSolution],
                              };
                            } else return pp;
                          }),
                        }));
                      }}
                    >
                      + Add solution
                    </button>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="4">
                AI - Accident Insurance
              </AccordionHeader>
              <AccordionBody accordionId="4">
                <label className="form-label-title">Insurance Rate (%)</label>
                <div className="row">
                  <div className="col-sm-3">
                    <ul className="nav mb-3 flex-column">
                      {insurances.AI.map((ai, index: number) => (
                        <li className="nav-item" key={index}>
                          <a
                            className={`nav-link ${
                              selected.ai === index
                                ? "active bg-danger text-white border-1"
                                : ""
                            }`}
                            href="#"
                            aria-current="page"
                            onClick={() =>
                              setSelected((pre) => ({
                                ...pre,
                                ai: index,
                              }))
                            }
                          >
                            {ai.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-outline-past"
                        onClick={() => {
                          setInsurances((pre) => ({
                            ...pre,
                            AI: [...pre.AI, initialAI],
                          }));
                        }}
                      >
                        + Add insurance
                      </button>
                      <button
                        className="bg-transparent border-0"
                        type="button"
                        onClick={() => {
                          setInsurances((pre) => ({
                            ...pre,
                            AI: pre.AI.filter(
                              (_, index) => index !== selected.ai
                            ),
                          }));
                        }}
                      >
                        <Trash2 color={"#dc3545"} size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Customer number
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Contract number
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <label className="form-label-title">
                      <input type="radio" className="form-check-input" />{" "}
                      Insurance without electronic wage reporting
                    </label>
                    <input type="text" className="form-control" />
                    <label className="form-label-title">
                      <input type="radio" className="form-check-input" />{" "}
                      Insurance with electronic wage reporting (EWR)
                    </label>
                    <div className="d-flex justify-content-between">
                      <select className="form-control">
                        <option>Name of the compensation fund</option>
                        <option>English</option>
                        <option>French</option>
                        <option>Italian</option>
                      </select>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Insurance company number"
                      />
                    </div>
                    <h5 className="mt-3">
                      <strong>AI solutions</strong>
                    </h5>
                    {insurances.AI[selected.ai].solutions.map(
                      (solution, index) => (
                        <div className="row mt-3" key={index}>
                          <div className="d-flex justify-content-between">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="UVG solution"
                            />
                            <select className="form-control">
                              <option>A</option>
                              <option>B</option>
                              <option>C</option>
                              <option>D</option>
                            </select>
                            <button
                              className="bg-transparent border-0"
                              type="button"
                              onClick={() => {
                                setInsurances((pre) => ({
                                  ...pre,
                                  AI: pre.AI.map((ai, ind) => {
                                    if (ind === selected.ai) {
                                      return {
                                        ...ai,
                                        solutions: ai.solutions.filter(
                                          (_, i) => i !== index
                                        ),
                                      };
                                    } else return ai;
                                  }),
                                }));
                              }}
                            >
                              <Trash2 color={"#dc3545"} size={20} />
                            </button>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="col-sm-4">
                              <label className="form-label-title">
                                Occupational accident
                              </label>
                              <div className="d-flex justify-content-start align-items-center">
                                <input
                                  className="form-control me-1"
                                  type="number"
                                  min={0}
                                  max={70}
                                />
                                <span className="fs-5">%</span>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <label className="form-label-title">
                                Non-occupational accident
                              </label>
                              <div className="d-flex justify-content-start align-items-center">
                                <input
                                  className="form-control me-1"
                                  type="number"
                                  min={0}
                                  max={70}
                                />
                                <span className="fs-5">%</span>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <label className="form-label-title">
                                Employer’s contribution
                              </label>
                              <div className="d-flex justify-content-between">
                                <label className="form-label-title">
                                  <input
                                    type="radio"
                                    className="form-check-input me-2"
                                  />{" "}
                                  0%
                                </label>
                                <label className="form-label-title">
                                  <input
                                    type="radio"
                                    className="form-check-input me-2"
                                  />{" "}
                                  50%
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <button
                      type="button"
                      className="btn btn-outline-past mt-3"
                      onClick={() => {
                        setInsurances((pre) => ({
                          ...pre,
                          AI: pre.AI.map((ai, ind) => {
                            if (ind === selected.ai) {
                              return {
                                ...ai,
                                solutions: [...ai.solutions, initialAISolution],
                              };
                            } else return ai;
                          }),
                        }));
                      }}
                    >
                      + Add solution
                    </button>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="5">
                AAI - Additional Accident Insurance
              </AccordionHeader>
              <AccordionBody accordionId="5">
                <div>
                  <label className="form-label-title">
                    Additional Accident Rate (%)
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="6">
                DSP - Daily Sick Pay
              </AccordionHeader>
              <AccordionBody accordionId="6">
                <div>
                  <label className="form-label-title">
                    Daily Sick Pay Rate (%)
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </form>
  );
}

export default CompanyInsuraces;
