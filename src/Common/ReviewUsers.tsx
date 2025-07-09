import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import React from "react";
import DynamicFeatherIcon from "./DynamicFeatherIcon";

const ReviewUsers = ({ image }: { image: number }) => {
  return (
    <div className="review-users">
      <div className="review-users__img">
        <Image src={`${ImagePath}/users/${image}.png`} alt="review 1" height={46} width={46} />
      </div>
      <div className="review-users__detail ">
        <div className="review-users__box">
          <h5>jonash </h5>
          <span>4 review</span>
        </div>
        <div className="star-box mt-3 ">
          <span>
            <DynamicFeatherIcon iconName="Star" />
          </span>
          <span>
            <DynamicFeatherIcon iconName="Star" />
          </span>
          <span>
            <DynamicFeatherIcon iconName="Star" />
          </span>
          <span>
            <DynamicFeatherIcon iconName="Star" />
          </span>
          <span>
            <DynamicFeatherIcon iconName="Star" />
          </span>
          <p className="ms-3">7 months ago</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          commodi harum perspiciatis earum possimus, laudantium architecto ad
          dolorem iusto repudiandae similique quam assumenda repellendus
          accusantium ducimus rerum consequatur fugit autem?
        </p>
      </div>
    </div>
  );
};

export default ReviewUsers;
