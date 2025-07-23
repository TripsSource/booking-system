import { companyState } from "@/types/app/financial";
import React, { useState } from "react";
import { Trash2 } from "react-feather";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const MasterData = ({ companyData }: { companyData: companyState }) => {
  const [open, setOpen] = useState("1");

  const toggle = (id: string) => {
    open === id ? setOpen("") : setOpen(id);
  };
  const initialWorkplace = { name: "Head Office", useCompanyAddress: true };
  const initialSourcetax = { canton: "", customerId: "", code: "" };

  const [selected, setSelected] = useState({ workplace: 0, sourcetax: 0 });

  const [company, setCompany] = useState({
    workplaces: [initialWorkplace],
    sourcetax: [initialSourcetax],
  });

  return (
    <form className="theme-form mega-form">
      <div className="menu-part accordion tab-pane " id="itinerary">
        <div id="accordion" className="accordion-plan">
          <Accordion open={open} toggle={toggle} className="dark-accordion">
            <AccordionItem>
              <AccordionHeader targetId="1">Basic Data</AccordionHeader>
              <AccordionBody accordionId="1">
                The company master data is imported directly from your bexio
                account.
                <div>
                  <label className="form-label-title">Company Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mt-3">
                  <label className="form-label-title">
                    Mailing address Additional line
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-6">
                    <label className="form-label-title">Street</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-title">House no.</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-6">
                    <label className="form-label-title">P.O. Box</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      Region, province, state or district
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-3">
                    <label className="form-label-title">Zip code</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-3">
                    <label className="form-label-title">City</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-3">
                    <label className="form-label-title">Canton</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-3">
                    <label className="form-label-title">Country</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      Municipality number
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-title">Company ID</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="form-label-title">
                    <input type="checkbox" className="form-check-input me-1" />
                    Agriculture company
                  </label>
                </div>
                <div className="mt-3">
                  <label className="form-label-title">
                    <input type="checkbox" className="form-check-input me-1" />
                    Allow bexio access to my data
                  </label>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="2">Deputy</AccordionHeader>
              <AccordionBody accordionId="2">
                Only relevant for electronic payroll reporting (EWR) Have you
                commissioned an external company for payroll accounting? Enter
                the contact details of this company here.
                <div className="form-check form-switch d-flex mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="deputy"
                  />
                  <label className="form-check-label mx-1" htmlFor="deputy">
                    I have a deputy
                  </label>
                </div>
                <div>
                  <label className="form-label-title">Company Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mt-3">
                  <label className="form-label-title">
                    Mailing address Additional line
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-6">
                    <label className="form-label-title">Street</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-title">House no.</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-6">
                    <label className="form-label-title">P.O. Box</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      Region, province, state or district
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-3">
                    <label className="form-label-title">Zip code</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-3">
                    <label className="form-label-title">City</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-3">
                    <label className="form-label-title">Canton</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-3">
                    <label className="form-label-title">Country</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      Municipality number
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-title">Company ID</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="3">Workplaces</AccordionHeader>
              <AccordionBody accordionId="3">
                <label className="form-label-title">Number of Workplaces</label>
                <div className="row">
                  <div className="col-sm-3">
                    <ul className="nav mb-3 flex-column">
                      {company.workplaces.map((workplace, index: number) => (
                        <li className="nav-item" key={index}>
                          <a
                            className={`nav-link ${
                              selected.workplace === index
                                ? "active bg-danger text-white border-1"
                                : ""
                            }`}
                            href="#"
                            aria-current="page"
                            onClick={() =>
                              setSelected((pre) => ({
                                ...pre,
                                workplace: index,
                              }))
                            }
                          >
                            {workplace.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-outline-past"
                        onClick={() => {
                          setCompany((pre) => ({
                            ...pre,
                            workplaces: [...pre.workplaces, initialWorkplace],
                          }));
                        }}
                      >
                        Add
                      </button>
                      <button
                        className="bg-transparent border-0"
                        type="button"
                        onClick={() => {
                          setCompany((pre) => ({
                            ...pre,
                            workplaces: pre.workplaces.filter(
                              (_, index) => index !== selected.workplace
                            ),
                          }));
                        }}
                      >
                        <Trash2 color={"#dc3545"} size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="form-check form-switch d-flex mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="deputy"
                      />
                      <label className="form-check-label mx-1" htmlFor="deputy">
                        Use company address
                      </label>
                    </div>
                    <div>
                      <label className="form-label-title">Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mt-3">
                      <label className="form-label-title">
                        Additional line
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-6">
                        <label className="form-label-title">Street</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">House no.</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-6">
                        <label className="form-label-title">P.O. Box</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Region, province, state or district
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-3">
                        <label className="form-label-title">Zip code</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-3">
                        <label className="form-label-title">City</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-3">
                        <label className="form-label-title">Canton</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-3">
                        <label className="form-label-title">
                          Municipality number
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Hours per week
                        </label>
                        <div className="d-flex justify-content-start align-items-center">
                          <input
                            className="form-control me-1"
                            type="number"
                            min={0}
                            max={70}
                          />
                          <span className="fs-5">h</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Lessons per week
                        </label>
                        <div className="d-flex justify-content-start align-items-center">
                          <input
                            className="form-control me-1"
                            type="number"
                            min={0}
                            max={70}
                          />
                          <span className="fs-5">h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="4">Source Tax</AccordionHeader>
              <AccordionBody accordionId="4">
                <label className="form-label-title">Source Tax Code</label>
                <div className="row">
                  <div className="col-sm-3">
                    <ul className="nav mb-3 flex-column">
                      {company.sourcetax.map((sourcetax, index: number) => (
                        <li className="nav-item" key={index}>
                          <a
                            className={`nav-link ${
                              selected.workplace === index
                                ? "active bg-danger text-white border-1"
                                : ""
                            }`}
                            href="#"
                            aria-current="page"
                            onClick={() =>
                              setSelected((pre) => ({
                                ...pre,
                                workplace: index,
                              }))
                            }
                          >
                            {sourcetax.canton}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-outline-past"
                        onClick={() => {
                          setCompany((pre) => ({
                            ...pre,
                            sourcetax: [...pre.sourcetax, initialSourcetax],
                          }));
                        }}
                      >
                        Add
                      </button>
                      <button
                        className="bg-transparent border-0"
                        type="button"
                        onClick={() => {
                          setCompany((pre) => ({
                            ...pre,
                            sourcetax: pre.sourcetax.filter(
                              (_, index) => index !== selected.workplace
                            ),
                          }));
                        }}
                      >
                        <Trash2 color={"#dc3545"} size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="form-check form-switch d-flex mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="deputy"
                      />
                      <label className="form-check-label mx-1" htmlFor="deputy">
                        Use company address
                      </label>
                    </div>
                    <div>
                      <label className="form-label-title">Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mt-3">
                      <label className="form-label-title">
                        Additional line
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-6">
                        <label className="form-label-title">Street</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">House no.</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-6">
                        <label className="form-label-title">P.O. Box</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Region, province, state or district
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-3">
                        <label className="form-label-title">Zip code</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-3">
                        <label className="form-label-title">City</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-3">
                        <label className="form-label-title">Canton</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm-3">
                        <label className="form-label-title">
                          Municipality number
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="mt-3 row d-flex justify-content-between">
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Hours per week
                        </label>
                        <div className="d-flex justify-content-start align-items-center">
                          <input
                            className="form-control me-1"
                            type="number"
                            min={0}
                            max={70}
                          />
                          <span className="fs-5">h</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label-title">
                          Lessons per week
                        </label>
                        <div className="d-flex justify-content-start align-items-center">
                          <input
                            className="form-control me-1"
                            type="number"
                            min={0}
                            max={70}
                          />
                          <span className="fs-5">h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="5">Payment Settings</AccordionHeader>
              <AccordionBody accordionId="5">
                <label className="form-label-title">Payment Method</label>
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-9">
                    <label className="form-label-title">
                      Default bank account
                    </label>
                    <select className="form-control">
                      <option>Bank Transfer</option>
                      <option>Cash</option>
                    </select>
                  </div>
                  <div className="col-sm-3">
                    <label className="form-label-title">
                      Default value date
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="6">Emailing Paystubs</AccordionHeader>
              <AccordionBody accordionId="6">
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      PDF paystub password protection
                    </label>
                    <select className="form-control">
                      <option>Use employee's AHV number</option>
                      <option>Use employee's date of birth</option>
                      <option>Custom password</option>
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-title">Custom password</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="mt-3 row d-flex justify-content-between">
                  <div className="col-sm-6">
                    <label className="form-label-title">
                      PDF layout for emails
                    </label>
                    <select className="form-control">
                      <option>Use employee's AHV number</option>
                      <option>Use employee's date of birth</option>
                      <option>Custom password</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="form-label-title">DE</label>
                  <textarea
                    placeholder="Diese Nachricht wurde automatisch von der bexio Payroll-Software generiert. Die Lohnabrechnung für Monat/Jahr finden Sie im PDF-Formular. Falls Sie Fragen zur E-Mail oder Lohnabrechnung haben, wenden Sie sich bitte an den Payroll Officer Ihres Unternehmens, den Sie unter CC in dieser E-Mail finden."
                    className="form-control"
                  />
                </div>
                <div className="mt-3">
                  <label className="form-label-title">EN</label>
                  <textarea
                    placeholder="This message was automatically generated from bexio Payroll software. Please find the paystub for month/year attached in PDF form. If you have any questions about the e-mail or the paystub, please contact your company''s Payroll Officer who is CCed in this e-mail."
                    className="form-control"
                  />
                </div>
                <div className="mt-3">
                  <label className="form-label-title">FR</label>
                  <textarea
                    placeholder="Ce message a été généré automatiquement depuis le logiciel bexio Payroll. Veuillez trouver le bulletin de paie pour la période Mois/Année ci-joint au format PDF. Si vous avez des questions concernant cet e-mail ou le bulletin de paie, veuillez contacter le responsable de la paie de votre entreprise (en copie de cet e-mail)."
                    className="form-control"
                  />
                </div>
                <div className="mt-3">
                  <label className="form-label-title">DE</label>
                  <textarea
                    placeholder="Questo messaggio è stato generato automaticamente dal software delle buste paga di bexio. In allegato trova la busta paga per Mese/Anno in formato PDF. Per qualsiasi domanda riguardante l''e-mail o la busta paga la preghiamo di contattare il responsabile del personale della sua ditta, che ci legge in copia."
                    className="form-control"
                  />
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="7">Other</AccordionHeader>
              <AccordionBody accordionId="7">
                <div className="row mt-2 d-flex align-items-center">
                  <div className="col-sm-4">
                    <label className="form-label-title">
                      Additional Information
                    </label>
                  </div>
                  <div className="col-sm-8">
                    <select className="form-control">
                      <option>German</option>
                      <option>English</option>
                      <option>French</option>
                      <option>Italian</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-2 d-flex align-items-center">
                  <div className="col-sm-4">
                    <label className="form-label-title">Rounding</label>
                  </div>
                  <div className="col-sm-8">
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                      />
                      Round the amounts to 5 Rp. (only applies to the months
                      that have not yet been completed)
                    </label>
                  </div>
                </div>
                <div className="row mt-2 d-flex align-items-center">
                  <div className="col-sm-4">
                    <label className="form-label-title">
                      Proportional employment
                    </label>
                  </div>
                  <div className="col-sm-8">
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                      />
                      Calculate proportional employment within a month using the
                      30-days method
                    </label>
                  </div>
                </div>
                <div className="row mt-2 d-flex align-items-center">
                  <div className="col-sm-4">
                    <label className="form-label-title">Vacation bonus</label>
                  </div>
                  <div className="col-sm-8">
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                      />
                      Pay vacation bonus immediately
                    </label>
                  </div>
                </div>
                <div className="row mt-2 d-flex align-items-center">
                  <div className="col-sm-4">
                    <label className="form-label-title">Factor 13th wage</label>
                  </div>
                  <div className="col-sm-8">
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                      />
                      Calculate 13th wage using 8.33% instead of 1/12
                    </label>
                  </div>
                </div>
                <div className="row mt-2 d-flex align-items-center">
                  <div className="col-sm-4">
                    <label className="form-label-title">13th wage</label>
                  </div>
                  <div className="col-sm-8">
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                      />
                      13th wage based on vacation bonus and holiday compensation
                    </label>
                  </div>
                </div>
                <div className="row mt-2 d-flex align-items-top">
                  <div className="col-sm-4">
                    <label className="form-label-title">Statistics</label>
                  </div>
                  <div className="col-sm-8">
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                      />
                      Enter data for statistics / wage structure survey
                    </label>
                    <select className="form-control">
                      <option>General work contract for a union</option>
                      <option>
                        General work contract of a firm or public service
                      </option>
                      <option>
                        Collective wage agreement outside a general work
                        contract
                      </option>
                      <option>Individual work contract</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-2 d-flex align-items-center">
                  <div className="col-sm-4">
                    <label className="form-label-title">
                      Holiday compensation
                    </label>
                  </div>
                  <div className="col-sm-8">
                    <label className="form-label-title">
                      <input type="radio" className="form-check-input me-2" />{" "}
                      Holiday compensation and vacation bonus only refer to the
                      hourly wage
                    </label>
                    <label className="form-label-title">
                      <input type="radio" className="form-check-input me-2" />{" "}
                      Holiday compensation refers to the sum of hourly wage and
                      vacation bonus
                    </label>
                    <label className="form-label-title">
                      <input type="radio" className="form-check-input me-2" />{" "}
                      Vacation bonus refers to the sum of hourly wage and
                      holiday compensation
                    </label>
                  </div>
                </div>
                <div className="row mt-2 d-flex align-items-center">
                  <div className="col-sm-4">
                    <label className="form-label-title">
                      PDF paystub layout
                    </label>
                  </div>
                  <div className="col-sm-8">
                    <select className="form-control">
                      <option>Standard</option>
                      <option>Large font size</option>
                      <option>Without logo (for letterhead)</option>
                      <option>Address on the right</option>
                      <option>Address on the right, without logo</option>
                      <option>Standard - modern</option>
                      <option>Address on the right for post</option>
                    </select>
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                      />
                      Show vacation days on the payslip
                    </label>
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                      />
                      Show Job title on the payslip
                    </label>
                  </div>
                </div>
                <div className="row mt-2 d-flex align-items-center">
                  <div className="col-sm-4">
                    <label className="form-label-title">
                      Clockodo integration
                    </label>
                  </div>
                  <div className="col-sm-8">
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                      />
                      Clockodo integration enabled
                    </label>

                    <label className="form-label-title">
                      Clockodo user’s email
                    </label>
                    <input type="text" className="form-control" />
                    <label className="form-label-title">Clockodo API Key</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </form>
  );
};

export default MasterData;
