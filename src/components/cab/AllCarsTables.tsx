import { allCarsData } from "@/data/cab";
import { Href, ImagePath } from "@/utils/Constant";
import Image from "next/image";

const AllCarsTables = () => {
  return (
    <tbody>
      {allCarsData.map((data, index) => (
        <tr key={index}>
          <td>
            <span>
              <Image height={45} width={45} src={`${ImagePath}/users/${index+1}.jpg`} alt="users" />
            </span>
          </td>
          <td>
            <a href={Href}>
              <span className="  d-block fw-bold ">{data.name}</span>
            </a>
          </td>
          <td>{data.gender}</td>
          <td>
            <span><i className="fa fa-car" />Amroha</span>
            <span className="line" />
            <span><i className="fa fa-map-marker" />Bahraich</span>
          </td>
          <td>{data.phone}</td>
          <td>
            <a href={Href}><i className="fa fa-eye" /></a>
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

export default AllCarsTables;
