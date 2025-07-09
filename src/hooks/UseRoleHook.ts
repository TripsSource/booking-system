"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { permissionsState } from "@/store/auth";

export const useRoleHook = () => {
  const rolePermissions = useSelector(permissionsState);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const handleRole = (selectedPart: string) => {
    if (!rolePermissions) {
      setIsLoading(false);
      return;
    }
    const part = rolePermissions.some((part) =>
      part.target.includes(selectedPart)
    );
    if (!part) {
      setIsLoading(false);
      return;
    } else {
      setIsLoading(true);
      return;
    }
  };

  return [handleRole, isLoading] as const;
};
