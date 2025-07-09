import { tableDataTourCategories } from "@/data/Tour";
import { Href } from "../../utils/Constant";

const TourCategoriesTableBody = () => {
  return (
    <tbody>
      {tableDataTourCategories.map((data, index) => (
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.categoryName}</td>
          <td>{data.numOfTours}</td>
          <td>{data.totalDays}</td>
          <td>
            <a href={Href}>
              <i className="fa fa-pencil-square-o" />
            </a>
          </td>
          <td>
            <a href={Href}>
              <i className="fa fa-trash-o" />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TourCategoriesTableBody;
