import { singleCarData1, singleCarData2 } from "@/data/cab";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";

const CabSingleDetail = () => {
  return (
    <div className="cab-single-detail">
      <div className="title-car">
        <h5>Peugeot Citroen</h5>
        <h6>
          fare/km : <span>$24</span>
        </h6>
      </div>
      <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperioresdicta exercitationem laboriosam nam non, officia omnis, quae quibusdamquis repellendus repudiandae voluptate. Corporis dolore inventore non.Dolorem excepturi nostrum sint?</p>
      <div className="overview">
        <h6>car overview</h6>
        <ul>
          {singleCarData1.map((data, index) => (
            <li key={index}>
              <Image height={24} width={24} src={`${ImagePath}/cab/icon/${data.imageName}.png`} className="img-fluid blur-up lazyload" alt=""/>
              {data.detail}
            </li>
          ))}
        </ul>
        <ul>
          {singleCarData2.map((data, index) => (
            <li key={index}>
              <Image height={24} width={24} src={`${ImagePath}/cab/icon/${data.imageName}.png`} className="img-fluid blur-up lazyload" alt=""/>
              {data.detail}
            </li>
          ))}
        </ul>
      </div>
      <div className="details g-4 row">
        <div className="col-sm-6">
          <div className="overview">
            <h6>include in this price:</h6>
            <ul>
              <li>cancellation</li>
              <li>theft protection</li>
              <li>local taxes</li>
              <li>Prices are inclusive of all the taxes</li>
              <li>fuel charges</li>
              <li>driver allowance</li>
            </ul>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="overview">
            <h6>exclude in this price:</h6>
            <ul>
              <li>late return charges</li>
              <li>Night Allowance</li>
              <li>Parking</li>
              <li>toll / state tax</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabSingleDetail;
