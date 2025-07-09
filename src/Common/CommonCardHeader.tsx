import Link from "next/link";
import DynamicFeatherIcon from "./DynamicFeatherIcon";
interface CommonCardHeader{
    tittle:string, navigate:string
}
const CommonCardHeader = ({ tittle, navigate }:CommonCardHeader) => {
  return (
    <div className="card-header  card-header--2">
      <div>
        <h5>{tittle}</h5>
      </div>
      <form className="d-inline-flex">
        <Link
          href={navigate}
          className="align-items-center btn btn-theme"
        >
          <DynamicFeatherIcon iconName="PlusSquare" />
          Add New
        </Link>
      </form>
    </div>
  );
};

export default CommonCardHeader;
