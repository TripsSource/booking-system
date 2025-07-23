import { suppliersState } from "@/store/contacts";
import { destinationTitlesState } from "@/store/destination";
import { SupplierDetailProps } from "@/types/components/product";
import React from "react";
import { Trash2 } from "react-feather";
import { useSelector } from "react-redux";

function SupplierDetails({ product, handleTours }: SupplierDetailProps) {
  const { tours } = product;
  const destinations = useSelector(destinationTitlesState);
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = tours.map(
    (tour) =>
      destinations.find((destination) => destination._id === tour.destinationId)
        ?.destinationTitle
  );
  const { suppliers } = tours[activeTab];
  const supplierOptions = useSelector(suppliersState);
  const handleProductSuppliers = (i: number, type: string, value: string) => {
    const newSuppliers = suppliers.map((supplier, index) => {
      if (index === i)
        return {
          ...supplier,
          [type]: value,
        };
      return supplier;
    });
    handleTours(activeTab, "suppliers", newSuppliers);
  };

  return (
    <form className="theme-form mega-form">
      <div className="mb-3 mx-5 px-5">
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
        <div className="mb-3 mx-5">
          {suppliers.length > 0 &&
            suppliers.map((supplierData, index) => (
              <div className="d-flex justify-content-between mb-3" key={index}>
                <select
                  className="col-sm-2"
                  onChange={(e) => {
                    handleProductSuppliers(index, "time", e.target.value);
                  }}
                  value={supplierData.time}
                >
                  {Array.from({ length: (24 * 60) / 15 }, (_, index) => {
                    const totalMinutes = index * 15;
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    return (
                      <option
                        key={index}
                        value={`${String(hours).padStart(2, "0")}:${String(
                          minutes
                        ).padStart(2, "0")}`}
                      >
                        {String(hours).padStart(2, "0")}:
                        {String(minutes).padStart(2, "0")}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="form-control"
                  value={supplierData.supplierId ?? ""}
                  onChange={(e) =>
                    handleProductSuppliers(index, "supplierId", e.target.value)
                  }
                >
                  <option value=""></option>
                  {supplierOptions.map((supplier, index) => (
                    <option value={supplier._id} key={index}>
                      {supplier.companyName}
                    </option>
                  ))}
                </select>
                <button
                  className="bg-transparent border-0"
                  type="button"
                  onClick={() =>
                    handleTours(
                      activeTab,
                      "suppliers",
                      suppliers.filter((_, i: number) => index !== i)
                    )
                  }
                >
                  <Trash2 color={"#dc3545"} size={20} />
                </button>
              </div>
            ))}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() =>
              handleTours(activeTab, "suppliers", [
                ...suppliers,
                { supplierId: "", time: "" },
              ])
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

export default SupplierDetails;
