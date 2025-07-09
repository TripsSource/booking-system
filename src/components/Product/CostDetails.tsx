import { destinationTitlesState } from "@/store/destination";
import { CostDetailsProps } from "@/types/components/product";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const CostDetails = ({ product, handleProduct }: CostDetailsProps) => {
  const { startingLocations, revenues } = product;
  const destinations = useSelector(destinationTitlesState);
  const tabs = startingLocations.map(
    (item) =>
      destinations.find((item2) => item2._id === item._id)?.destinationTitle
  );
  const [activeTab, setActiveTab] = useState(0);

  const handleProductCosts = (param: string, value: string) => {
    const newRevenues = revenues.map((revenue, index) => {
      if (activeTab === index)
        return { ...revenues[activeTab], [param]: value };
      else return revenue;
    });
    handleProduct("revenues", newRevenues);
  };

  const totalIndividual =
    Number(revenues[activeTab]?.boatTicket) +
    Number(revenues[activeTab]?.clientTrainTicket) +
    Number(revenues[activeTab]?.mountainTicket1) +
    Number(revenues[activeTab]?.mountainTicket2) +
    Number(revenues[activeTab]?.swissHalfFareTravelPass) +
    Number(revenues[activeTab]?.tasting1) +
    Number(revenues[activeTab]?.tasting2) +
    Number(revenues[activeTab]?.tasting3);
  const totalBulk =
    Number(revenues[activeTab]?.guideTrainTicket) +
    Number(revenues[activeTab]?.transportation);
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
              {tab}
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
                    value={revenues[activeTab].clientTrainTicket}
                    placeholder="Enter amount"
                    className="form-control"
                    onChange={(e) =>
                      handleProductCosts("clientTrainTicket", e.target.value)
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
                    value={revenues[activeTab].swissHalfFareTravelPass}
                    placeholder="Enter amount"
                    className="form-control"
                    onChange={(e) =>
                      handleProductCosts(
                        "swissHalfFareTravelPass",
                        e.target.value
                      )
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
                  Number(revenues[activeTab].clientTrainTicket) +
                  Number(revenues[activeTab].swissHalfFareTravelPass)
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
                    value={revenues[activeTab].mountainTicket1}
                    onChange={(e) =>
                      handleProductCosts("mountainTicket1", e.target.value)
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
                    value={revenues[activeTab].mountainTicket2}
                    onChange={(e) =>
                      handleProductCosts("mountainTicket2", e.target.value)
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
                    value={revenues[activeTab].boatTicket}
                    onChange={(e) =>
                      handleProductCosts("boatTicket", e.target.value)
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
                  Number(revenues[activeTab].mountainTicket1) +
                  Number(revenues[activeTab].mountainTicket2) +
                  Number(revenues[activeTab].boatTicket)
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
                    value={revenues[activeTab].tasting1}
                    className="form-control"
                    placeholder="Enter amount"
                    onChange={(e) =>
                      handleProductCosts("tasting1", e.target.value)
                    }
                  />
                </div>
                <div className="col-sm-4">
                  <label className="form-label-title">Tasting 2 (CHF)</label>
                  <input
                    min={0}
                    type="number"
                    value={revenues[activeTab].tasting2}
                    className="form-control"
                    placeholder="Enter amount"
                    onChange={(e) =>
                      handleProductCosts("tasting2", e.target.value)
                    }
                  />
                </div>
                <div className="col-sm-4">
                  <label className="form-label-title">Tasting 3 (CHF)</label>
                  <input
                    min={0}
                    type="number"
                    value={revenues[activeTab].tasting3}
                    className="form-control"
                    placeholder="Enter amount"
                    onChange={(e) =>
                      handleProductCosts("tasting3", e.target.value)
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
                value={`${
                  Number(revenues[activeTab].tasting1) +
                  Number(revenues[activeTab].tasting2) +
                  Number(revenues[activeTab].tasting3)
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
                    value={revenues[activeTab].guideTrainTicket}
                    onChange={(e) =>
                      handleProductCosts("guideTrainTicket", e.target.value)
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
                    value={revenues[activeTab].transportation}
                    onChange={(e) =>
                      handleProductCosts("transportation", e.target.value)
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
                  Number(revenues[activeTab].guideTrainTicket) +
                  Number(revenues[activeTab].transportation)
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
                value={revenues[activeTab].childrenCost}
                onChange={(e) =>
                  handleProductCosts("childrenCost", e.target.value)
                }
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
