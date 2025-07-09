import React from "react";

import Revenue from "@/components/Financial/Revenue";
import RoleProvider from "@/providers/RoleProvider";

function RevenuePage() {
  return (
    <RoleProvider target="Financial">
      <div className="card">
        <div className="card-body">
          <Revenue />
        </div>
      </div>
    </RoleProvider>
  );
}

export default RevenuePage;
