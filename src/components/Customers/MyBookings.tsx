import { Href } from "../../utils/Constant";
import { myBookingsData } from "@/data/MyBookings";

const MyBookings = () => {
  return (
    <table className="user-table table table-striped">
      <thead>
        <tr>
          <th>Tour Name</th>
          <th>Tour Date & Time</th>
          <th>Additional Travelers</th>
          <th>Special Requirements</th>
          <th colSpan={3}>Action</th>
        </tr>
      </thead>
      <tbody>
        {myBookingsData.map((data, index) => (
          <tr key={index}>
            <td>{data.tour_name}</td>
            <td>{data.tour_date}</td>
            <td>{data.additional_travelers}</td>
            <td>{data.special_requirements}</td>
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

export default MyBookings;
