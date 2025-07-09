import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap";

import { readDestinationType } from "@/types/store/destination";
import { useDeleteIdDestination } from "@/hooks/UseDestination";
interface ReadDestinationsProps {
  destinations: readDestinationType[];
}

const ReadDestinations = ({ destinations }: ReadDestinationsProps) => {
  const [deletefModal, setDeleteModal] = useState(false);
  const [loading, setId] = useDeleteIdDestination();
  const [deleteId, setDeleteId] = useState("");
  const toggleDeleteModal = () => setDeleteModal(!deletefModal);

  const openDeleteModal = () => {
    setId(deleteId);
    setDeleteModal(false);
  };

  return destinations.length > 0 ? (
    <>
      <table className="user-table table table-striped">
        <thead>
          <tr>
            <th className="text-center">Avatar</th>
            <th className="text-center">Destination</th>
            <th className="text-center">Description</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map(
            (destination: readDestinationType, index: number) => (
              <tr key={index}>
                <td className="text-center" style={{ cursor: "pointer" }}>
                  <div className="d-flex justify-content-center align-items-center">
                    {destination.images && destination.images.length > 0 && (
                      <>
                        <Image
                          src={`${destination.images[0]}`}
                          width={100}
                          height={70}
                          alt={`${destination.images[0]}`}
                        />
                        {/* <p className="text-nowrap px-2">
                          image count:{destination.images.length - 1}
                        </p> */}
                      </>
                    )}
                  </div>
                </td>
                <td className="text-center" style={{ cursor: "pointer" }}>
                  {destination.destinationTitle}
                </td>
                <td className="text-center" style={{ cursor: "pointer" }}>
                  <span>{destination.shortDescription}</span>
                </td>
                <td className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="mt-1 me-3">
                      <Link href={`/destination/${destination._id}`}>
                        <i className="fa fa-pencil-square-o fs-5" />
                      </Link>
                    </div>
                    <div className="ms-3">
                      <Link
                        href={""}
                        onClick={() => {
                          setDeleteId(destination._id);
                          toggleDeleteModal();
                        }}
                      >
                        <i className="fa fa-trash-o fs-5" />
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
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
  ) : (
    <label className="form-label-title">No saved Destintaions</label>
  );
};

export default ReadDestinations;
