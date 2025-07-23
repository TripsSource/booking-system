import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { readProductState } from "@/types/store/products";
import { AppDispatch } from "@/store";
import {
  deleteProductAction,
  getProductIdAction,
  handleLiveStatusAction,
  productLoadingState,
  productsState,
} from "@/store/products";
import { ProductDetailState } from "@/types/app/product";
import { ReadProductsProps } from "@/types/components/product";
import PageLoader from "@/layouts/PageLoader";
import moment from "moment";

const WorldMap = dynamic(() => import("@/components/Dashboard/WorldMap"), {
  ssr: false,
});

const ReadProducts = ({ products, deleted, setDeleted }: ReadProductsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(productLoadingState);
  const trustProducts = useMemo(() => products, [products]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletefModal, setDeleteModal] = useState(false);
  const [data, setData] = useState({} as ProductDetailState);
  const [deleteId, setDeleteId] = useState("");
  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleDeleteModal = () => setDeleteModal(!deletefModal);
  const openModal = async (id: string) => {
    const { payload } = await dispatch(getProductIdAction(id));
    if (payload?.["data"]) {
      setData(payload.data as ProductDetailState);
      setModalOpen(true);
    } else toast.error(`${payload.error}`);
  };
  const openDeleteModal = async () => {
    const { payload } = await dispatch(deleteProductAction(deleteId));
    if (payload.message) toast.success(`${payload.message}`);
    else toast.error(`${payload.error}`);
    setDeleted(!deleted);
    setDeleteModal(false);
  };
  const handleIsActiveStatus = async (id: string) => {
    const { payload } = await dispatch(handleLiveStatusAction(id));
    if (payload.message) toast.success(`${payload.message}`);
    else toast.error(`${payload.error}`);
    setDeleted(!deleted);
  };
  return (
    <>
      <table className="user-table table table-striped">
        <thead>
          <tr>
            <th className="text-center">Avatar</th>
            <th className="text-center">Name</th>
            <th className="text-center">Total Tours</th>
            <th className="text-center">Available Date</th>
            <th className="text-center">Price</th>
            <th className="text-center">Live Booking</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(trustProducts) &&
          trustProducts.length < 1 &&
          isLoading ? (
            <tr>
              <td colSpan={7}>
                <PageLoader />
              </td>
            </tr>
          ) : Array.isArray(trustProducts) ? (
            trustProducts.map((product: readProductState, index: number) => (
              <tr key={index}>
                <td
                  onClick={() => openModal(product._id)}
                  className="text-center"
                  style={{ cursor: "pointer" }}
                >
                  {product.image && product.image.length > 0 && (
                    <Image
                      src={`${product.image}`}
                      width={50}
                      height={50}
                      alt={`${product.image}`}
                    />
                  )}
                </td>
                <td
                  onClick={() => openModal(product._id)}
                  className="text-center"
                  style={{ cursor: "pointer" }}
                >
                  {product.name}
                </td>
                <td
                  onClick={() => openModal(product._id)}
                  className="text-center"
                  style={{ cursor: "pointer" }}
                >
                  {product.tours}
                </td>
                <td
                  onClick={() => openModal(product._id)}
                  className="text-center"
                  style={{ cursor: "pointer" }}
                >
                  {product.endDate
                    ? moment(new Date(product.endDate)).format("DD/MM/YYYY")
                    : "Forever"}
                </td>
                <td
                  onClick={() => openModal(product._id)}
                  className="text-center"
                  style={{ cursor: "pointer" }}
                >
                  ₣{product.minPrice?.toLocaleString()}
                  {product.minPrice !== product.maxPrice &&
                    " - ₣" + product.maxPrice?.toLocaleString()}
                </td>
                <td className="text-center" style={{ cursor: "pointer" }}>
                  <div className="form-check form-switch  d-flex justify-content-center">
                    <input
                      className="form-check-input px-3"
                      type="checkbox"
                      role="switch"
                      id="live_status"
                      style={{ cursor: "pointer" }}
                      disabled={isLoading}
                      checked={product.isActive}
                      onChange={(e) => handleIsActiveStatus(product._id)}
                    />
                    <label
                      className="form-check-label px-3"
                      htmlFor="live_status"
                      style={{ cursor: "pointer" }}
                    >
                      {product.isActive ? "Live" : "Not Live"}
                    </label>
                  </div>
                </td>
                <td className="text-center" style={{ cursor: "pointer" }}>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="mt-1 me-3">
                      <Link href={`/product/${product._id}`}>
                        <i className="fa fa-pencil-square-o fs-5" />
                      </Link>
                    </div>
                    <div className="ms-3">
                      <Link
                        href={""}
                        onClick={() => {
                          setDeleteModal(true);
                          setDeleteId(product._id);
                        }}
                      >
                        <i className="fa fa-trash-o fs-5" />
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <p>No saved Products</p>
          )}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
        <ModalHeader toggle={toggleModal}>{data.name}</ModalHeader>
        <ModalBody className="p-4">
          {data.images && data.images.length > 0 && (
            <Image
              src={`${data.images[0]}`}
              height={50}
              width={50}
              alt={`${data.images[0]}`}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              className="mb-3"
            />
          )}
          <div className="row g-2">
            <div className="col-sm-12">
              <p>Description:{data.description}</p>
              <p>Tours: {data.tours?.length}</p>
              <div className="mt-3">
                <p>Inclusions:</p>
                <ul className="mx-3">
                  {data.inclusions?.map((inclusion, index) => (
                    <li key={index} style={{ listStyleType: "square" }}>
                      {inclusion}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3">
                <p>Exclusions:</p>
                <ul className="mx-3">
                  {data.exclusions?.map((exclusion, index) => (
                    <li key={index} style={{ listStyleType: "square" }}>
                      {exclusion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div className="col-sm-6">
              <WorldMap checkPlace={false} onlineMap={data.onlineMap} />
            </div> */}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" type="button" onClick={toggleModal}>
            Cancel
          </Button>
          <Link href={`/product/${data._id}`}>
            <Button color="primary" type="button" onClick={toggleModal}>
              Update
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={deletefModal}
        toggle={toggleDeleteModal}
        centered
        size="lg"
      >
        <ModalHeader toggle={toggleDeleteModal}>Delete</ModalHeader>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={openDeleteModal}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ReadProducts;
