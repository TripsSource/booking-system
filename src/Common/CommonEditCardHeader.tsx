interface EditCardHeaderInterFace {
  heading: string;
}
const CommonEditCardHeader = ({ heading }: EditCardHeaderInterFace) => {
  return (
    <div className="card-header  card-header--2 package-card">
      <div>
        <h5>{heading}</h5>
      </div>
      <form
        className="d-inline-flex"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          event.preventDefault()
        }
      >
        <button className="btn align-items-center btn-theme me-3">
          <i className="fa fa-pencil-square-o me-2" />
          Edit
        </button>
        <button className="btn align-items-center d-flex btn-outline">
          <i className="fa fa-trash-o me-2" />
          Delete
        </button>
      </form>
    </div>
  );
};

export default CommonEditCardHeader;
