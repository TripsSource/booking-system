import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

function CompanyInsuraces() {
  const [open, setOpen] = useState("1");

  const toggle = (id: string) => {
    open === id ? setOpen("") : setOpen(id);
  };
  return (
    <div className="menu-part accordion tab-pane " id="itinerary">
      <div id="accordion" className="accordion-plan">
        <Accordion open={open} toggle={toggle} className="dark-accordion">
          <AccordionItem>
            <AccordionHeader targetId="1">
              OASI, EO, DI, ALV - Social Insurances
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <div>
                <label className="form-label-title">Insurance Rate (%)</label>
                <input type="input" className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">
              FCF - Copensation Fund
            </AccordionHeader>
            <AccordionBody accordionId="2">
              <div>
                <label className="form-label-title">FCF Contribution (%)</label>
                <input type="input" className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="3">
              {" "}
              PP - Occupational Benefit Plan
            </AccordionHeader>
            <AccordionBody accordionId="3">
              <div>
                <label className="form-label-title">Benefit Rate (%)</label>
                <input type="input" className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="4">
              AI - Accident Insurance
            </AccordionHeader>
            <AccordionBody accordionId="4">
              <div>
                <label className="form-label-title">Insurance Rate (%)</label>
                <input type="input" className="form-control" />
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
                <input type="input" className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="6">DSP - Daily Sick Pay</AccordionHeader>
            <AccordionBody accordionId="6">
              {" "}
              <div>
                <label className="form-label-title">
                  Daily Sick Pay Rate (%)
                </label>
                <input type="input" className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default CompanyInsuraces;
