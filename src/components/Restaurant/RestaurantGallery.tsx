import { Gallery, Item } from "react-photoswipe-gallery";
import CustomImage from '@/utils/CustomImage';
import { bannerImageData } from "@/data/Restaurant";


const RestaurantGallery = () => {
  return (
    <div className="menu-part tab-pane" id="gallery">
      <div className="container-fluid p-0 ratio3_2">
        <div className="row g-4  zoom-gallery">
          <Gallery>
            {bannerImageData.map((data,index) => {
              return (
                <Item original={data.img} width="1024" height="768" key={index}>
                  {({ ref, open }) => (
                    <div className="col-lg-4 col-sm-6" onClick={open}>
                      <div className="overlay" ref={ref}>
                        <div className="overlay-background">
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </div>
                        <CustomImage src={data.img} alt="" className="img-fluid bg-img"/>
                      </div>
                    </div>
                  )}
                </Item>
              );
            })}
          </Gallery>
        </div>
      </div>
    </div>
  )
}

export default RestaurantGallery