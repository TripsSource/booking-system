import { destinationTitlesState } from "@/store/destination";
import { CostDetailsProps } from "@/types/components/product";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const CostDetails = ({ product, handleTours }: CostDetailsProps) => {
  const { tours } = product;
  const destinations = useSelector(destinationTitlesState);
  const tabs = tours.map(
    (tour) =>
      destinations.find((destination) => destination._id === tour.destinationId)
        ?.destinationTitle
  );
  const [activeTab, setActiveTab] = useState(0);

  const handleRevenue = (type: string, value: string) => {
    handleTours(activeTab, "revenue", {
      ...tours[activeTab].revenue,
      [type]: value,
    });
  };

  const selectedRevenue = tours[activeTab]?.revenue;

  const totalIndividual =
    Number(selectedRevenue.boatTicket) +
    Number(selectedRevenue.clientTrainTicket) +
    Number(selectedRevenue.mountainTicket1) +
    Number(selectedRevenue.mountainTicket2) +
    Number(selectedRevenue.swissHalfFareTravelPass) +
    Number(selectedRevenue.tasting1) +
    Number(selectedRevenue.tasting2) +
    Number(selectedRevenue.tasting3);
  const totalBulk =
    Number(selectedRevenue.guideTrainTicket) +
    Number(selectedRevenue.transportation);
  return (
    <div>
      <ul className="nav nav-tabs mb-3">
        {tabs.map((tab, index) => (
          <li key={index} className="nav-item">
            <a
              className={`nav-link ${
                index === activeTab ? "active bg-primary text-white" : ""
              }`}
              aria-current="page"
              href="#"
              onClick={() => setActiveTab(index)}
            >
              Tour{index + 1} - {tab}
            </a>
          </li>
        ))}
      </ul>
      <form className="theme-form mega-form">
        <div className="mb-4">
          <label className="form-label-title mt-3">
            <strong>Rail Tickets</strong>
          </label>
          <hr className="hr" />
          <div className="row">
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-6">
                  <label className="form-label-title">
                    Client Train Ticket (CHF)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={selectedRevenue.clientTrainTicket}
                    placeholder="Enter amount"
                    className="form-control"
                    onChange={(e) =>
                      handleRevenue("clientTrainTicket", e.target.value)
                    }
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label-title">
                    Swiss Half Fare Travel Pass (CHF)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={selectedRevenue.swissHalfFareTravelPass}
                    placeholder="Enter amount"
                    className="form-control"
                    onChange={(e) =>
                      handleRevenue("swissHalfFareTravelPass", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <label className="form-label-title text-nowrap">
                Total Cost (CHF)
              </label>
              <input
                type="number"
                min={0}
                placeholder="Calculated automatically"
                className="form-control"
                value={`${
                  Number(selectedRevenue.clientTrainTicket) +
                  Number(selectedRevenue.swissHalfFareTravelPass)
                }`}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label-title mt-3">
            <strong>Mountain Tickets</strong>
          </label>
          <hr className="hr" />
          <div className="row">
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-4">
                  <label className="form-label-title">
                    Mountain Ticket 1 (CHF)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={selectedRevenue.mountainTicket1}
                    onChange={(e) =>
                      handleRevenue("mountainTicket1", e.target.value)
                    }
                    placeholder="Enter amount"
                    className="form-control"
                  />
                </div>
                <div className="col-sm-4">
                  <label className="form-label-title">
                    Mountain Ticket 2 (CHF)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={selectedRevenue.mountainTicket2}
                    onChange={(e) =>
                      handleRevenue("mountainTicket2", e.target.value)
                    }
                    placeholder="Enter amount"
                    className="form-control"
                  />
                </div>
                <div className="col-sm-4">
                  <label className="form-label-title">Boat Ticket (CHF)</label>
                  <input
                    type="number"
                    min={0}
                    value={selectedRevenue.boatTicket}
                    onChange={(e) =>
                      handleRevenue("boatTicket", e.target.value)
                    }
                    placeholder="Enter amount"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <label className="form-label-title text-nowrap">
                Total Ticket (CHF)
              </label>
              <input
                type="number"
                min={0}
                value={`${
                  Number(selectedRevenue.mountainTicket1) +
                  Number(selectedRevenue.mountainTicket2) +
                  Number(selectedRevenue.boatTicket)
                }`}
                placeholder="Calculated automatically"
                className="form-control"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label-title mt-3">
            <strong>Tasting</strong>
          </label>
          <hr className="hr" />
          <div className="row">
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-4">
                  <label className="form-label-title">Tasting 1 (CHF)</label>
                  <input
                    min={0}
                    type="number"
                    value={selectedRevenue.tasting1}
                    className="form-control"
                    placeholder="Enter amount"
                    onChange={(e) => handleRevenue("tasting1", e.target.value)}
                  />
                </div>
                <div className="col-sm-4">
                  <label className="form-label-title">Tasting 2 (CHF)</label>
                  <input
                    min={0}
                    type="number"
                    value={selectedRevenue.tasting2}
                    className="form-control"
                    placeholder="Enter amount"
                    onChange={(e) => handleRevenue("tasting2", e.target.value)}
                  />
                </div>
                <div className="col-sm-4">
                  <label className="form-label-title">Tasting 3 (CHF)</label>
                  <input
                    min={0}
                    type="number"
                    value={selectedRevenue.tasting3}
                    className="form-control"
                    placeholder="Enter amount"
                    onChange={(e) => handleRevenue("tasting3", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <label className="form-label-title text-nowrap">
                Total Cost (CHF)
              </label>
              <input
                type="number"
                min={0}
                value={`${
                  Number(selectedRevenue.tasting1) +
                  Number(selectedRevenue.tasting2) +
                  Number(selectedRevenue.tasting3)
                }`}
                placeholder="Calculated automatically"
                className="form-control"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label-title mt-3">
            <strong>Guide & Transportation</strong>
          </label>
          <hr className="hr" />
          <div className="row">
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-6">
                  <label className="form-label-title">
                    Guide Train Ticket (CHF)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={selectedRevenue.guideTrainTicket}
                    onChange={(e) =>
                      handleRevenue("guideTrainTicket", e.target.value)
                    }
                    placeholder="Enter amount"
                    className="form-control"
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label-title">
                    Transportation (CHF)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={selectedRevenue.transportation}
                    onChange={(e) =>
                      handleRevenue("transportation", e.target.value)
                    }
                    placeholder="Enter amount"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <label className="form-label-title text-nowrap">
                Total Cost (CHF)
              </label>
              <input
                type="number"
                min={0}
                value={`${
                  Number(selectedRevenue.guideTrainTicket) +
                  Number(selectedRevenue.transportation)
                }`}
                placeholder="Calculated automatically"
                className="form-control"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label-title mt-3">
            <strong>Final Totals</strong>
          </label>
          <hr className="hr" />
          <div className="row">
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-6">
                  <label className="form-label-title text-nowrap">
                    Total Individual Cost (CHF)
                  </label>
                  <input
                    min={0}
                    readOnly
                    value={totalIndividual}
                    type="number"
                    className="form-control"
                    placeholder="Calculated automatically"
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label-title text-nowrap">
                    Total Bulk Cost (CHF)
                  </label>
                  <input
                    min={0}
                    readOnly
                    type="number"
                    value={totalBulk}
                    className="form-control"
                    placeholder="Calculated automatically"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <label className="form-label-title text-nowrap">
                Children Cost (CHF)
              </label>
              <input
                type="number"
                min={0}
                value={selectedRevenue.childrenCost}
                onChange={(e) => handleRevenue("childrenCost", e.target.value)}
                placeholder="Enter amount"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CostDetails;
