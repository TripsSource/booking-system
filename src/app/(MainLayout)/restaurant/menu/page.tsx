import CommonCardHeader from "@/Common/CommonCardHeader";
import AllRestaurantTableBody from "../../../../components/Restaurant/AllRestaurantTableBody";

const AllRestaurant = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonCardHeader navigate="/restaurant/additem" tittle="Menu" />
            <div className="card-body">
              <div>
                <div className="all-hotel-table table-responsive table-desi">
                  <table className="menu-table table table-striped">
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Item Name</th>
                        <th>Item Type</th>
                        <th>Item Price</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <AllRestaurantTableBody />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurant;
