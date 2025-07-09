import { Cancel, Submit } from "@/utils/Constant";

const CommonCardFooter = () => {
  return (
    <div className="card-footer text-end">
      <button className="btn btn-primary me-3">{Submit}</button>
      <button className="btn btn-outline-primary">{Cancel}</button>
    </div>
  );
};

export default CommonCardFooter;
