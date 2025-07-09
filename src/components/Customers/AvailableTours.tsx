import { userData } from "@/data/Users";
import { availableToursData } from "@/data/Tours";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import { Href } from "../../utils/Constant";

const AvailableTours = () => {
  return (
    <table className="user-table table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Short Description</th>
          <th>Duration</th>
          <th>Location</th>
          <th>What to Bring</th>
          <th>Know Before You Go</th>
          <th>Qeustions</th>
          <th colSpan={3}>Action</th>
        </tr>
      </thead>
      <tbody>
        {availableToursData.map((data, index) => (
          <tr key={index}>
            <td>
              <span>{data.name}</span>
            </td>
            <td>{data.short_description}</td>
            <td>{data.duration}</td>
            <td>{data.location}</td>
            <td>{data.what_to_bring}</td>
            <td>{data.konw_before_you_go}</td>
            <td>{data.questions}</td>
            <td>
              <a href={Href}>
                <i className="fa fa-eye" />
              </a>
            </td>
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
    </table>
  );
};

export default AvailableTours;
