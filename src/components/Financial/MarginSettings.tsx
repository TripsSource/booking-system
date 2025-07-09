import React, { Dispatch, useState, SetStateAction, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useSelector } from "react-redux";
import { loadingState, marginState, OTAState } from "@/store/financial";
import { otaState, marginsState } from "@/types/app/financial";
import { MarginSettingsType, TRTagType } from "@/types/components/financial";
import { toast } from "react-toastify";

const TRTag = ({
  type,
  module,
  string1,
  string2,
  value1,
  state,
}: TRTagType) => {
  return (
    <tr>
      <td>{string1}</td>
      <td>{string2}</td>
      <td>
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={value1}
            min={0}
            max={99}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (value > 100) {
                value = 99.99;
              }
              state({ ...module, [type]: value });
            }}
            className="form-control"
          />
          <strong>%</strong>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={((value1 / (100 - value1)) * 100).toFixed(2)}
            className="form-control"
            readOnly
          />
          <strong>%</strong>
        </div>
      </td>
    </tr>
  );
};

const MarginSettings = ({
  saveMargins,
  createOTA,
  saveOTA,
  deleteOTA,
}: MarginSettingsType) => {
  const margin = useSelector(marginState);
  const OTA = useSelector(OTAState);
  const loading = useSelector(loadingState);
  const [margins, setMargins] = useState<marginsState>({
    s: margin.shortTourMargin || 0,
    m: margin.mediumTourMargin || 0,
    l: margin.longTourMargin || 0,
  });
  const [ota, setOTA] = useState<otaState[]>(OTA || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [createOta, setCreateOta] = useState({} as otaState);
  const [otaId, setOtaId] = useState<number | null>(null);
  useEffect(() => {
    setMargins({
      s: margin.shortTourMargin,
      m: margin.mediumTourMargin,
      l: margin.longTourMargin,
    });
  }, [margin]);
  useEffect(() => {
    setOTA(OTA);
  }, [OTA]);
  const toggleModal = () => setModalOpen(!modalOpen);
  const CreateOTA = () => {
    if (
      createOta.otaName === "" ||
      createOta.otaName === undefined ||
      createOta.shortTourMargin === 0 ||
      createOta.shortTourMargin === undefined ||
      createOta.dayTourMargin === undefined
    ) {
      toast.error("No create OTA");
    } else {
      createOTA(createOta);
      toggleModal();
      setCreateOta({} as otaState);
    }
  };
  return (
    <div>
      <form className="theme-form mega-form">
        <div className="mb-5">
          <div className="d-flex align-items-center justify-content-between">
            <label className="form-label-title">
              <strong>Margins Module</strong>
            </label>
            <button
              type="button"
              disabled={loading}
              onClick={() => saveMargins(margins)}
              className="btn btn-outline-primary"
            >
              Save
            </button>
          </div>
          <hr className="hr" />
          <table className="user-table table table-striped">
            <thead>
              <tr>
                <th>Tour Type</th>
                <th>Hour Range</th>
                <th>Target Margin (%)</th>
                <th>Target Mark-Up (%)</th>
              </tr>
            </thead>
            <tbody>
              <TRTag
                {...{
                  type: "s",
                  module: margins,
                  string1: "Short Tours",
                  string2: "1 - 4 hours",
                  value1: margins.s,
                  state: setMargins,
                }}
              />
              <TRTag
                {...{
                  type: "m",
                  module: margins,
                  string1: "Medium Day Tours",
                  string2: "5 - 9 hours",
                  value1: margins.m,
                  state: setMargins,
                }}
              />
              <TRTag
                {...{
                  type: "l",
                  module: margins,
                  string1: "Long Day Tours",
                  string2: "10 - 13 hours",
                  value1: margins.l,
                  state: setMargins,
                }}
              />
            </tbody>
          </table>
        </div>
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <label className="form-label-title ">
              <strong>OTA Margins Module</strong>
            </label>
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                onClick={toggleModal}
                className="btn btn-outline-info mx-1"
              >
                Add
              </button>
            </div>
          </div>
          <hr className="hr" />
          <table className="user-table table table-striped">
            <thead>
              <tr>
                <th>OTA Name</th>
                <th>Tour Type</th>
                <th>Hour Range</th>
                <th>Target Margin (%)</th>
                <th>Target Mark-Up (%)</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {ota.map((element, index: number) => (
                <>
                  <tr>
                    <td rowSpan={2}>
                      <input
                        type="text"
                        value={element.otaName}
                        onChange={(e) => {
                          const val = ota.map((ot, i) => {
                            if (i === index)
                              return { ...ot, otaName: e.target.value };
                            else return ot;
                          });
                          setOTA(val);
                        }}
                        className={`form-control ${
                          otaId === index ? "text-dark fs-6" : ""
                        }`}
                        readOnly={otaId === index ? false : true}
                      />
                    </td>
                    <td>Short Tours</td>
                    <td>1 - 5 hours</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <input
                          type="number"
                          value={element.shortTourMargin}
                          min={0}
                          max={99}
                          onChange={(e) => {
                            setOTA((pre) =>
                              pre.map((val, i) => {
                                if (i === index)
                                  return {
                                    ...val,
                                    shortTourMargin: Number(
                                      parseFloat(e.target.value).toFixed(2)
                                    ),
                                  };
                                else return val;
                              })
                            );
                          }}
                          className={`form-control ${
                            otaId === index ? "text-dark fs-6" : ""
                          }`}
                          readOnly={otaId === index ? false : true}
                        />
                        <strong>%</strong>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <input
                          type="number"
                          value={(
                            (element.shortTourMargin /
                              (100 - element.shortTourMargin)) *
                            100
                          ).toFixed(2)}
                          className="form-control"
                          readOnly
                        />
                        <strong>%</strong>
                      </div>
                    </td>
                    <td rowSpan={2}>
                      <div className="d-flex justify-content-between align-items-center">
                        <i
                          onClick={() => {
                            if (element.id) deleteOTA(element.id);
                            setOTA((pre) => pre.filter((_, i) => i !== index));
                          }}
                          className="fa fa-trash-o text-danger fs-6"
                        />
                      </div>
                    </td>
                    <td rowSpan={2}>
                      <div className="d-flex justify-content-between align-items-center">
                        <i
                          onClick={() => {
                            if (otaId === null) {
                              setOtaId(index);
                            } else {
                              saveOTA(ota[otaId]);
                              setOtaId(null);
                            }
                          }}
                          className={`fa ${
                            otaId !== index
                              ? "fa-pencil-square-o text-info "
                              : "fa-save text-success"
                          } fs-6`}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Day Tours</td>
                    <td>6 - 13 hours</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <input
                          type="number"
                          value={element.dayTourMargin}
                          min={0}
                          max={99}
                          onChange={(e) => {
                            setOTA((pre) =>
                              pre.map((val, i) => {
                                if (i === index)
                                  return {
                                    ...val,
                                    dayTourMargin: Number(
                                      parseFloat(e.target.value).toFixed(2)
                                    ),
                                  };
                                else return val;
                              })
                            );
                          }}
                          className={`form-control ${
                            otaId === index ? "text-dark fs-6" : ""
                          }`}
                          readOnly={otaId === index ? false : true}
                        />
                        <strong>%</strong>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <input
                          type="number"
                          value={(
                            (element.dayTourMargin /
                              (100 - element.dayTourMargin)) *
                            100
                          ).toFixed(2)}
                          className="form-control"
                          readOnly
                        />
                        <strong>%</strong>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </form>
      <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
        <ModalHeader toggle={toggleModal}>Create OTA</ModalHeader>
        <ModalBody className="p-4">
          <div className="row g-2">
            <form className="theme-form mega-form">
              <div className="col-sm-12">
                <label className="form-label-title">OTA Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={createOta.otaName}
                  onChange={(e) => {
                    setCreateOta({ ...createOta, otaName: e.target.value });
                  }}
                />
              </div>
              <div className="row g-2">
                <div className="col-sm-6">
                  <label className="form-label-title">Short Tours(%)</label>
                  <input
                    type="number"
                    min={0}
                    max={99}
                    className="form-control"
                    value={createOta.shortTourMargin}
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value > 100) {
                        value = 99.99;
                      }
                      setCreateOta({
                        ...createOta,
                        shortTourMargin: value,
                      });
                    }}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label-title">Target Mark-Up(%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={(
                      (createOta.shortTourMargin /
                        (100 - createOta.shortTourMargin)) *
                      100
                    ).toFixed(2)}
                    readOnly
                  />
                </div>
              </div>
              <div className="row g-2">
                <div className="col-sm-6">
                  <label className="form-label-title">Day Tours(%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={createOta.dayTourMargin}
                    min={0}
                    max={99}
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value > 100) {
                        value = 99.99;
                      }
                      setCreateOta({
                        ...createOta,
                        dayTourMargin: value,
                      });
                    }}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label-title">Target Mark-Up(%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={(
                      (createOta.dayTourMargin /
                        (100 - createOta.dayTourMargin)) *
                      100
                    ).toFixed(2)}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" type="button" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="primary" type="button" onClick={CreateOTA}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MarginSettings;
