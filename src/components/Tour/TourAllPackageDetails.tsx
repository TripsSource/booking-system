import { tourData } from "@/data/Tour";
import { Href, ImagePath } from "@/utils/Constant";
import Image from "next/image";
import Link from "next/link";

const TourAllPackageDetails = () => {
  return (
    <tbody>
      {tourData.map((data, index) => (
        <tr key={index}>
          <td>
            <span>
              <Image src={`${ImagePath}/tours/${index + 1}.jpg`} height={45} width={70} alt="users"/>
            </span>
          </td>
          <td>
            <a href={Href}>{data.title}</a>
          </td>
          <td>{data.price}</td>
          <td>{data.duration}</td>
          <td>
            <Link href="/tour/packagedetail">
              <i className="fa fa-eye" />
            </Link>
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

export default TourAllPackageDetails;
