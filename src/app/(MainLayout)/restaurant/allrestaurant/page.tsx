import { restaurantData } from "@/data/Restaurant";
import { Href, ImagePath } from "../../../../utils/Constant";
import CommonCardHeader from "@/Common/CommonCardHeader";
import Image from "next/image";
import Link from "next/link";

const AllRestaurant = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonCardHeader
              tittle="All Restaurant"
              navigate="/restaurant/addrestaurant"
            />
            <div className="card-body">
              <div>
                <div className="table-responsive table-desi">
                  <table className="all-restaurant-table table table-striped">
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurantData.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <span>
                              <Image
                                height={45}
                                width={70}
                                src={`${ImagePath}/restaurant/${index + 1}.jpg`}
                                alt="users"
                              />
                            </span>
                          </td>
                          <td>
                            <a href={Href}>
                              <span className="  d-block fw-bold ">
                                {data.name}
                              </span>
                              <span>{data.location}</span>
                            </a>
                          </td>
                          <td>
                            <span
                              className={`badge badge-${
                                data.type === "indian" ? "secondary" : "primary"
                              }`}
                            >
                              {data.type}
                            </span>
                          </td>
                          <td>{data.phone}</td>
                          <td>{data.email}</td>
                          <td>
                            <Link href="/restaurant/restaurantdetail">
                              <i className="fa fa-eye" />
                            </Link>
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
