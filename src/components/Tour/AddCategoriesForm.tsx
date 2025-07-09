import EditorsSimple from "@/Common/EditorsSimple";
import dynamic from "next/dynamic";

const AddCategoriesForm = () => {
  const MultipleSelectBox = dynamic(
    () => import("@/Common/MultipleSelectBox"),
    { ssr: false }
  );

  return (
    <div className="card-body">
      <div className="theme-form mega-form">
        <div className="mb-3">
          <label className="form-label-title">Tour Name</label>
          <input className="form-control" type="text" placeholder="Tour name" />
        </div>
        <div className="mb-3">
          <label className="form-label-title">Tour Places</label>
          {/* <MultipleSelectBox /> */}
        </div>
        <label className="form-label-title ">Tour package Description</label>
        <EditorsSimple />
      </div>
    </div>
  );
};

export default AddCategoriesForm;
