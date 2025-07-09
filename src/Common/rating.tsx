import React, { FC } from "react";

interface IRateingProps {
  rang?: string;
}

const Rating: FC<IRateingProps> = ({ rang }) => {
  return (
    <div className="rating">
      <i className="fa fa-star" />
      <i className="fa fa-star" />
      <i className="fa fa-star" />
      <i className="fa fa-star" />
      <i className="fa fa-star" />
      {rang && <span>{rang}</span>}
    </div>
  );
};

export default Rating;
