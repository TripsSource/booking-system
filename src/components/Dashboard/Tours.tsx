import { dashboardSlider } from "@/data/SliderData";
import { ImagePath } from "@/utils/Constant";
import CustomImage from "@/utils/CustomImage";
import React from "react";
import Slider from "react-slick";
import Link from "next/link";

// Import css files
const Tours = () => {
  const sliderImage = [1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6];
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header-title card-header">
          <h5>Tours</h5>
        </div>
        <div className="card-body">
          <div className="dashboard-tours ratio3_2">
            <Slider {...dashboardSlider} className="w-100 dashboard-slider ">
              {sliderImage.map((data,index)=><div key={index} className="category-box" style={{ width: "100%", display: "inline-block" }}>
                <div className="img-category">
                  <div className="img-category-box bg-size">
                    <CustomImage
                      src={`${ImagePath}/tours/${data}.jpg`}
                      alt=""
                      className="img-fluid bg-img "
                    />
                  </div>
                  <div className="top-bar">
                    <span className="offer">offer</span>
                    <h5>
                      <del>$320</del> $210
                    </h5>
                  </div>
                  <div className="like-cls">
                    <i className="fa fa-heart">
                      <span className="effect" />
                    </i>
                  </div>
                </div>
                <div className="content-category">
                  <div className="top">
                    <Link href={"/booking"}>
                      <h3>hot air balloon</h3>
                    </Link>
                    <div className="rating">
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-o" />
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur est.</p>
                  <h6>
                    5 days | 6 nights <span> 2 person</span>
                  </h6>
                </div>
              </div>)}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tours;
