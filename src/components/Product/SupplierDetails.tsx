import { suppliersState } from "@/store/contacts";
import { destinationTitlesState } from "@/store/destination";
import { ProductDetailState } from "@/types/app/product";
import React from "react";
import { Trash2 } from "react-feather";
import { useSelector } from "react-redux";

function SupplierDetails({
  product,
  handleProduct,
}: {
  product: ProductDetailState;
  handleProduct: (
    param: string,
    value: {
      startingLocationId: string;
      contacts: { supplierId: string; timeSlot: string }[];
    }[]
  ) => void;
}) {
  const { suppliers, startingLocations } = product;
  const destinations = useSelector(destinationTitlesState);
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = startingLocations.map(
    (item) =>
      destinations.find((item2) => item2._id === item._id)?.destinationTitle
  );
  const supplierOptions = useSelector(suppliersState);
  const handleProductSuppliers = (i: number, type: string, value: string) => {
    const newSuppliers = suppliers.map((supplierData, index) => {
      if (index === activeTab) {
        return {
          ...supplierData,
          contacts: supplierData.contacts.map((supplier, contactIndex) => {
            if (contactIndex === i) return { ...supplier, [type]: value };
            return supplier;
          }),
        };
      }
      return supplierData;
    });
    handleProduct("suppliers", newSuppliers);
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
            suppliers[activeTab].contacts.map((supplierData, index) => (
              <div className="d-flex justify-content-between mb-3" key={index}>
                <select
                  className="col-sm-2"
                  onChange={(e) => {
                    handleProductSuppliers(index, "timeSlot", e.target.value);
                  }}
                  value={supplierData.timeSlot}
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
                  value={supplierData.supplierId}
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
                  onClick={() => {
                    const trustSuppliers = suppliers.map((supplierData, i) => {
                      if (activeTab === i)
                        return {
                          ...supplierData,
                          contacts: supplierData.contacts.filter(
                            (_, ind: number) => index !== ind
                          ),
                        };
                      else return supplierData;
                    });
                    handleProduct("suppliers", trustSuppliers);
                  }}
                >
                  <Trash2 color={"#dc3545"} size={20} />
                </button>
              </div>
            ))}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              const trustSuppliers = suppliers.map((supplierData, index) => {
                if (activeTab === index)
                  return {
                    ...supplierData,
                    contacts: supplierData.contacts.concat([
                      { supplierId: "", timeSlot: "" },
                    ]),
                  };
                else return supplierData;
              });
              handleProduct("suppliers", trustSuppliers);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

export default SupplierDetails;
