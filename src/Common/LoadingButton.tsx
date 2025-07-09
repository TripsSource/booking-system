import React from "react";

const LoadingButton = ({
  func,
  title,
  loading = false,
  classes,
}: {
  func: () => void;
  title: string;
  loading?: boolean;
  classes: string;
}) => {
  return (
    <button className={classes} type="button" onClick={func} disabled={loading}>
      <div className="d-flex align-items-start">
        {loading && (
          <div
            className="spinner-border spinner-border-sm text-white me-2"
            role="status"
          ></div>
        )}
        {title}
      </div>
    </button>
  );
};

export default LoadingButton;
