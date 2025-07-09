import { carData } from "@/data/cab";
import { ImagePath } from "@/utils/Constant";
import { Href } from "../../utils/Constant";
import Link from "next/link";

const AllCarsTableBody = () => {
  return (
    <tbody>
      {carData.map((data, index) => (
        <tr key={index}>
          <td>
            <span>
              <img src={`${ImagePath}/cars/${index + 1}.png`} alt="users"/>
            </span>
          </td>
          <td>
            <a href={Href}><span className="  d-block fw-bold ">{data.carName}</span></a>
          </td>
          <td>
            <span className={`badge badge-${data.differentBadge? "secondary":"primary"}`}>{data.type}</span>
          </td>
          <td>{data.farePerKm}</td>
          <td>
            <Link href="/cab/carsdetail"><i className="fa fa-eye" /></Link>
          </td>
          <td>
            <a href={Href}><i className="fa fa-pencil-square-o" /></a>
          </td>
          <td>
            <a href={Href}><i className="fa fa-trash-o" /></a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AllCarsTableBody;
