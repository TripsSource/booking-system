import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import React from "react";

const VerifiedWithTittle = ({
  heading,
  differentImage,
}: {
  heading: string;
  differentImage?: string;
}) => {
  return (
    <h6>
      <Image
        height={20}
        width={20}
        src={`${ImagePath}/icon/hotel/${
          differentImage ? differentImage : "verified"
        }.png`}
        className="img-fluid blur-up lazyload"
        alt=""
      />

      {heading}
    </h6>
  );
};

export default VerifiedWithTittle;
