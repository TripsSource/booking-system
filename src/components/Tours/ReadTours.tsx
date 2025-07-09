import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import dynamic from "next/dynamic";
import { readProductState } from "@/types/store/products";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  deleteProductAction,
  getProductIdAction,
  productLoadingState,
} from "@/store/products";
import { ProductDetailState } from "@/types/app/product";

const WorldMap = dynamic(() => import("@/components/Dashboard/WorldMap"), {
  ssr: false,
});

interface ReadProductsProps {
  products: readProductState[];
}

const ReadTours = ({ products }: ReadProductsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(productLoadingState);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({} as ProductDetailState);
  const toggleModal = () => setModalOpen(!modalOpen);
  const openModal = async (id: string) => {
    const { payload } = await dispatch(getProductIdAction(id));

    setData(payload as ProductDetailState);
    setModalOpen(true);
  };

  return products.length > 0 ? (
    <>
      <table className="user-table table table-striped">
        <thead>
          <tr>
            <th className="text-center">Avatar</th>
            <th className="text-center">Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: readProductState, index: number) => (
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
                <span>{product.name}</span>
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
                <div className="d-flex align-items-center justify-content-center">
                  <div className="mt-1 me-3">
                    <Link href={`/tours/${product._id}`}>
                      <i className="fa fa-pencil-square-o fs-5" />
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
        <ModalHeader toggle={toggleModal}>{data.name}</ModalHeader>
        <ModalBody className="p-4">
          {data.images && data.images.length > 0 && (
            <Image
              src={`${data.images[0]}`}
              height={100}
              width={100}
              alt={`${data.images[0]}`}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
              className="mb-3"
            />
          )}
          <div className="row g-2">
            <div className="col-sm-12">
              <p>Description:{data.description}</p>
              <p>
                Private: {data.isPrivate ? "Small Group Tour" : "Private Tour"}
              </p>
              <p>Members: {data.members}</p>
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
    </>
  ) : (
    <label className="form-label-title">No saved Products</label>
  );
};

export default ReadTours;
