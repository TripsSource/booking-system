import { menuItems } from "@/data/Restaurant";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import { Href } from "../../utils/Constant";

const AllRestaurantTableBody = () => {
  return (
    <tbody>
      {menuItems.map((data, index) => (
        <tr key={index}>
          <td>
            <span>
              <Image src={`${ImagePath}/menu-food/${index + 1}.jpg`} height={45} width={70} alt="users"/>
            </span>
          </td>
          <td>
            <a href={Href}>
              <span className="d-block fw-bold ">{data.itemName}</span>
            </a>
          </td>
          <td>
            <span className={`badge badge-${data.itemType === "Indian"?"secondary":"primary"}`}>{data.itemType}</span>
          </td>
          <td>{data.itemPrice}</td>
          <td><a href={Href}><i className="fa fa-eye" /></a></td>
          <td><a href={Href}><i className="fa fa-pencil-square-o" /></a></td>
          <td><a href={Href}><i className="fa fa-trash-o" /></a></td>
        </tr>
      ))}
    </tbody>
  );
};

export default AllRestaurantTableBody;
