"use client";
import React from "react";
import ReadDestinations from "@/components/Destination/ReadDestinations";
import PageLoader from "@/layouts/PageLoader";
import { useGetAllDestinations } from "@/hooks/UseDestination";
import RoleProvider from "@/providers/RoleProvider";

const ReadAllDestinations = () => {
  const [destinations, loading] = useGetAllDestinations();

  return (
    <RoleProvider target="Destination">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h3>View Destinations</h3>
              </div>
              <div className="card-body">
                {loading ? (
                  <PageLoader />
                ) : (
                  <div className="table-responsive table-desi">
                    <ReadDestinations {...{ destinations }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleProvider>
  );
};

export default ReadAllDestinations;
