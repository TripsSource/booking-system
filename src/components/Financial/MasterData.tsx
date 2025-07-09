import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

function MasterData() {
  const [open, setOpen] = useState("1");

  const toggle = (id: string) => {
    open === id ? setOpen("") : setOpen(id);
  };
  return (
    <div className="menu-part accordion tab-pane " id="itinerary">
      <div id="accordion" className="accordion-plan">
        <Accordion open={open} toggle={toggle} className="dark-accordion">
          <AccordionItem>
            <AccordionHeader targetId="1">Basic Data</AccordionHeader>
            <AccordionBody accordionId="1">
              <div>
                <label className="form-label-title">Company Name</label>
                <input type="input" className="form-control" />
              </div>
              <div className="mt-3">
                <label className="form-label-title">Registration Number</label>
                <input type="input" className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">Deputy</AccordionHeader>
            <AccordionBody accordionId="2">
              <div>
                <label className="form-label-title">Deputy Name</label>
                <input type="input" className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="3">Workplaces</AccordionHeader>
            <AccordionBody accordionId="3">
              <div>
                <label className="form-label-title">Number of Workplaces</label>
                <input type="input" className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="4">Source Tax</AccordionHeader>
            <AccordionBody accordionId="4">
              <div>
                <label className="form-label-title">Source Tax Code</label>
                <input type="input" className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="5">Payment Settings</AccordionHeader>
            <AccordionBody accordionId="5">
              <div>
                <label className="form-label-title">Payment Method</label>
                <select className="form-control">
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                </select>
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="6">Emailing Paystubs</AccordionHeader>
            <AccordionBody accordionId="6">
              <div>
                <label className="form-label-title">Email Template</label>
                <textarea rows={4} className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="7">Other</AccordionHeader>
            <AccordionBody accordionId="7">
              <div>
                <label className="form-label-title">
                  Additional Information
                </label>
                <textarea rows={4} className="form-control" />
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default MasterData;
