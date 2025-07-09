"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRoleHook } from "@/hooks/UseRoleHook";
import PageLoader from "@/layouts/PageLoader";
import { toast } from "react-toastify";

function RoleProvider({
  target,
  children,
}: {
  target: string;
  children: ReactNode;
}) {
  const [handleRole, isRoleLoading] = useRoleHook();
  const router = useRouter();
  useEffect(() => {
    if (isRoleLoading === null) handleRole(target);
    else if (isRoleLoading === false) {
      router.push("/dashboard");
      toast.warning("can't access this url");
    }
  }, [isRoleLoading, target, router]);
  if (!isRoleLoading) {
    return <PageLoader />;
  } else if (isRoleLoading) {
    return <>{children}</>;
  }
}

export default RoleProvider;
