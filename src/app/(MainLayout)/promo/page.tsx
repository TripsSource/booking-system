"use client";
import React, { useEffect, useState } from "react";
import CreatePromo from "@/components/promo/create";
import RoleProvider from "@/providers/RoleProvider";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  createPromoAction,
  deletePromoAction,
  getAllPromoAction,
} from "@/store/promo";
import { PromoCodeState, ViewPromoState } from "@/types/app/promo";
import ViewPromo from "@/components/promo/view";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function page() {
  const dispatch = useDispatch<AppDispatch>();
  const initialPromo = {
    code: "",
    percent: 1,
    maxUses: "",
    expiresAt: "",
    noExpiry: false,
  };
  const [viewData, setViewData] = useState<ViewPromoState>({
    data: [],
    page: 1,
    perPage: 10,
    totalPages: 0,
    totalCount: 0,
    search: "",
    sort: "",
    order: "",
  });
  const [promo, setPromo] = useState<PromoCodeState>(initialPromo);

  const { page, perPage, search, sort, order } = viewData;
  const { noExpiry } = promo;

  const [deletefModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deletefModal);
  const [deleteId, setDeleteId] = useState<string>("");

  const fetchData = async () => {
    const { payload } = await dispatch(
      getAllPromoAction({ page, perPage, search, sort, order })
    );
    if (payload?.["data"]) {
      setViewData((pre) => ({ ...pre, ...payload }));
    } else {
      setViewData((pre) => ({ ...pre, data: [] }));
      console.log("Unexpected payload:", payload);
    }
  };

  const handlePromo = (type: string, item: string | boolean) => {
    let newValue = item;

    if (type === "percent") {
      // try to parse an integer; if invalid, leave it empty so user can still type
      const parsed = parseInt(item as string, 10);
      if (!Number.isNaN(parsed)) {
        // clamp between 1 and 100
        const clamped = Math.max(1, Math.min(100, parsed));
        newValue = clamped.toString();
      }
    }

    setPromo((prev) => ({ ...prev, [type]: newValue }));
  };

  const savePromoCode = async () => {
    const { payload } = await dispatch(createPromoAction(promo));
    if (payload?.["message"]) {
      setPromo(initialPromo);
      toast.success(`${payload.message}`);
      await fetchData();
    } else toast.error(`${payload.error}`);
  };

  const handlePages = (type: string, value: number | string) => {
    if (type === "perPage")
      setViewData((pre) => ({ ...pre, page: 1, perPage: Number(value) }));
    else setViewData((pre) => ({ ...pre, [type]: value }));
  };

  const handleSortOrder = (item: string) => {
    if (!sort && !order) {
      setViewData({ ...viewData, sort: item, order: "asc" });
    } else if (sort === item) {
      const nextOrder =
        order === "asc" ? "desc" : order === "desc" ? "" : "asc";

      setViewData({
        ...viewData,
        sort: nextOrder ? sort : "",
        order: nextOrder,
      });
    } else {
      setViewData({ ...viewData, sort: item, order: "asc" });
    }
  };

  const openDeleteModal = async () => {
    setDeleteModal(false);
    const { payload } = await dispatch(deletePromoAction(deleteId));
    if (payload?.["message"]) {
      setDeleteId("");
      fetchData();
      toast.success(`${payload.message}`);
    } else if (payload?.["error"]) {
      toast.error(`${payload.error}`);
    }
  };

  const handleDeleteId = (id: string) => {
    setDeleteId(id);
  };

  useEffect(() => {
    if (noExpiry) setPromo((pre) => ({ ...pre, expiresAt: "" }));
  }, [noExpiry]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [page, perPage, sort, order]);

  return (
    <RoleProvider target="Promo">
      <h4>
        <strong>Promo Code</strong>
      </h4>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-7">
              <ViewPromo
                {...{
                  viewData,
                  handlePages,
                  handleSortOrder,
                  toggleDeleteModal,
                  handleDeleteId,
                }}
              />
            </div>
            <div className="col-sm-5">
              <CreatePromo {...{ promo, handlePromo, savePromoCode }} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={deletefModal}
        toggle={toggleDeleteModal}
        centered
        size="md"
      >
        <ModalHeader toggle={toggleDeleteModal}>Delete</ModalHeader>
        <ModalBody>
          <span>Are you sure you want to delete this?</span>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={openDeleteModal}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </RoleProvider>
  );
}

export default page;
