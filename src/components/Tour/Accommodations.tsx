import Image from "next/image";
import { Href, ImagePath } from "../../utils/Constant";
import Link from "next/link";
const data = [1, 2, 3];
const Accommodations = () =>
  data.map((item, index) => (
    <div className="list-view" key={index}>
      <div className="list-box">
        <div className="list-img">
          <Link href={"/packagedetail"}>
            <Image height={329.72} width={465.5} src={`${ImagePath}/hotel/gallery/${item}.jpg`} className="img-fluid blur-up lazyload" alt=""/>
          </Link>
        </div>
        <div className="list-content">
          <div>
            <Link href={"/tour/packagedetail"}>
              <h5>sea view hotel</h5>
            </Link>
            <p>dubai, 2km from center</p>
            <div className="rating">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-o" />
              <span>26412 review</span>
            </div>
            <p className="hotel-info"> relax and unwind with a special stay offer at a superlative value. conveniently located, offers spacious rooms. great dinning options. gym &amp; pool. innovative dinning and bar options. relaxing spa open till 2 A.M.</p>
            <div className="facility-icon">
              <div className="facility-box">
                <Image height={21.7} width={21.7} src={`${ImagePath}/icon/hotel/beer.png`} className="img-fluid blur-up lazyload" alt=""/>
                <span>bar</span>
              </div>
              <div className="facility-box">
                <Image height={21.7} width={21.7} src={`${ImagePath}/icon/hotel/wifi.png`} className="img-fluid blur-up lazyload" alt=""/>
                <span>wifi</span>
              </div>
              <div className="facility-box">
                <Image height={21.7} width={21.7} src={`${ImagePath}/icon/hotel/sunset.png`} className="img-fluid blur-up lazyload" alt=""/>
                <span>beach</span>
              </div>
              <div className="facility-box">
                <Image height={21.7} width={21.7} src={`${ImagePath}/icon/hotel/pool.png`} className="img-fluid blur-up lazyload" alt=""/>
                <span>swimming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

export default Accommodations;
