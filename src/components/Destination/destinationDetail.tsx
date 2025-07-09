import React from "react";
import { TOUR_CITIES } from "@/constants/data";
import DropZoneCommon from "@/Common/DropZoneCommon";
import { DestinationDetailProps } from "@/types/components/destination";

const DestinationDetail = ({
  destination,
  handleDistination,
}: DestinationDetailProps) => {
  const {
    destinationTitle,
    generalDescription,
    currentImages,
    deletedImages = [],
    images,
  } = destination;

  const handleFilesSelected = (files: File[]) => {
    handleDistination("images", files);
  };

  const deleteImage = (i: number) => {
    const deleted = currentImages?.find(
      (image: string, index: number) => index === i
    );
    const current = currentImages?.filter(
      (_: string, index: number) => i !== index
    );
    handleDistination("currentImages", current || []);
    handleDistination(
      "deletedImages",
      deletedImages.concat([`${deleted}`]) || []
    );
  };

  return (
    <form className="theme-form mega-form">
      <div className="card-body b-light rounded mb-3">
        <div className="mb-3">
          <label className="form-label-title">Title</label>
          <select
            className="form-control js-example-basic-single col-sm-12"
            value={destinationTitle}
            onChange={(e) =>
              handleDistination("destinationTitle", e.target.value)
            }
          >
            {TOUR_CITIES.map((value: { id: string; city: string }) => (
              <option key={value.id} value={value.city}>
                {value.city}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label-title">Description</label>
          <textarea
            className="form-control"
            placeholder="Provide the rundown description..."
            id="floatingTextarea"
            value={generalDescription}
            onChange={(e) =>
              handleDistination("generalDescription", e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label-title">Image</label>
          <div className="uploaded-files">
            {currentImages &&
              currentImages.map((file, index) => (
                <div key={index} className="file-card">
                  <img
                    src={`${file}`}
                    alt={`${file}`}
                    className="file-thumbnail img-fluid"
                  />
                  <button
                    className="remove-button"
                    onClick={() => deleteImage(index)}
                    title="Remove file"
                    type="button"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
          <DropZoneCommon
            value={images}
            onFilesSelected={handleFilesSelected}
            multiple={true}
          />
        </div>
      </div>
    </form>
  );
};

export default DestinationDetail;
