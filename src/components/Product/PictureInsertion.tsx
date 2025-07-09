import React from "react";
import DropZoneCommon from "@/Common/DropZoneCommon";
import { PictureInsertionProps } from "@/types/components/product";

const PictureInsertion = ({
  product,
  handleProduct,
}: PictureInsertionProps) => {
  const { currentImages, deletedImages = [] } = product;
  const handleFilesSelected = (files: File[]) => {
    handleProduct("images", files);
  };
  const deleteImage = (i: number) => {
    const deleted = currentImages?.find(
      (image: string, index: number) => index === i
    );
    handleProduct("deletedImages", deletedImages.concat([`${deleted}`]) || []);
  };

  return (
    <div>
      <form className="theme-form mega-form">
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
                    type="button"
                    onClick={() => {
                      deleteImage(index);
                    }}
                    title="Remove file"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
          <DropZoneCommon
            value={product.images}
            onFilesSelected={handleFilesSelected}
            multiple={true}
          />
        </div>
      </form>
    </div>
  );
};

export default PictureInsertion;
