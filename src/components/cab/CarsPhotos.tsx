import { carSlider } from "@/data/SliderData";
import { ImagePath } from "@/utils/Constant";
import CustomImage from "@/utils/CustomImage";
import React from "react";
import Slider from "react-slick";
import { Href } from "../../utils/Constant";

const CarsPhotos = () => {
  const images = [22, 24, 25, 22, 24, 25, 22];
  return (
    <Slider
      {...carSlider}
      className="responsive arrow-dark zoom-gallery ratio2_3  slick-dotted"
    >
      {images.map((data, index) => (
        <div key={index}>
          <a className="bg-size blur-up lazyload" href={Href}>
            <CustomImage
              src={`${ImagePath}/cab/car/${data}.jpg`}
              className="img-fluid blur-up lazyload bg-img w-100"
              alt=""
            />
          </a>
        </div>
      ))}
    </Slider>
  );
};

export default CarsPhotos;
