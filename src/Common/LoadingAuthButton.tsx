import React from "react";

function LoadingAuthButton({
  classes = "",
  types = "button",
  disabled = false,
  loading = false,
  title,
  style,
  bookingId,
  onFunc,
}: {
  classes?: string;
  types?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  title: string;
  style?: React.CSSProperties;
  bookingId?: string;
  onFunc?: (bookingId?: string) => void;
}) {
  return (
    <button
      style={style}
      className={classes}
      type={types}
      disabled={disabled}
      onClick={() => onFunc?.(bookingId)}
    >
      <div className="d-flex align-items-start justify-content-center">
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
}

export default LoadingAuthButton;
