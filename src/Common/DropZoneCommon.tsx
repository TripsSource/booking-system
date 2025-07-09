import React, { Fragment, useEffect, useState } from "react";
import Dropzone from "react-dropzone";

interface DropZoneCommonProps {
  multiple?: boolean;
  value?: File[];
  accept?: { [key: string]: string[] };
  onFilesSelected: (files: File[]) => void;
  classes?: string;
  title?: string;
}

const DropZoneCommon: React.FC<DropZoneCommonProps> = ({
  multiple,
  value,
  accept,
  onFilesSelected,
  classes,
  title,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(value || []);
  useEffect(() => {
    if (value !== undefined) {
      setUploadedFiles(value);
    }
  }, [value]);

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    onFilesSelected(acceptedFiles); // Send selected files to parent
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <Fragment>
      {/* Dropzone visible only if no files are uploaded */}
      {uploadedFiles.length === 0 ? (
        <Dropzone onDrop={onDrop} accept={accept}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className={classes ? classes : `dropzone-container`}
            >
              <input {...getInputProps()} />

              <span>
                {title
                  ? title
                  : "Drag & drop your file here, or click to select a file"}
              </span>
            </div>
          )}
        </Dropzone>
      ) : (
        <Fragment>
          {/* Dropzone for adding more files */}
          {multiple && (
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="add-more-files-zone">
                  <input {...getInputProps()} />
                  <p>Click or drag more files to add</p>
                </div>
              )}
            </Dropzone>
          )}

          {/* Display uploaded files */}
          {!title && (
            <div className="uploaded-files">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="file-card">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="file-thumbnail img-fluid"
                    />
                  ) : (
                    <div className="file-placeholder">
                      {file.name.split(".").pop()?.toUpperCase()} File
                    </div>
                  )}
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                  <button
                    onClick={() => removeFile(index)}
                    className="remove-button"
                    title="Remove file"
                    type="button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default DropZoneCommon;
