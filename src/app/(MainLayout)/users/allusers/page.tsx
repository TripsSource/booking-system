"use client";
import AllUsersTable from "@/components/Users/AllUsers";
import React from "react";
import CommonCardHeader from "@/Common/CommonCardHeader";

const AllUsers = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <CommonCardHeader navigate="/users/adduser" tittle="All Users" />
            <div className="card-body">
              <div>
                <div className="table-responsive table-desi">
                  <AllUsersTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
