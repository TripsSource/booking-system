import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

import PageLoader from "@/layouts/PageLoader";
import { PromoLoadingState } from "@/store/promo";
import PurePagination from "@/Common/PurePagination";
import { ViewPromoDataState, ViewPromoState } from "@/types/app/promo";
import Link from "next/link";

function ViewPromo({
  viewData,
  handlePages,
  handleSortOrder,
  handleDeleteId,
  toggleDeleteModal,
}: {
  viewData: ViewPromoState;
  handlePages: (type: string, value: number | string) => void;
  handleSortOrder: (item: string) => void;
  toggleDeleteModal: () => void;
  handleDeleteId: (id: string) => void;
}) {
  const promoLoading = useSelector(PromoLoadingState);

  const { data, page, perPage, totalPages, sort, order } = viewData;

  const promoTableTitles = [
    { label: "Code", value: "code" },
    { label: "Percent (%)", value: "lastname" },
    { label: "Limit", value: "maxUses" },
    { label: "Use", value: "usedCount" },
    { label: "Expire", value: "expiresAt" },
    { label: "CreatedBy", value: "createdBy.firstname" },
    { label: "Status", value: "isActive" },
  ];
  return (
    <div className="table-responsive table-desi">
      {data && data.length > 0 && (
        <PurePagination
          {...{
            pages: { page, perPage, totalPages },
            handlePages,
            loading: promoLoading,
          }}
        />
      )}
      <table className="user-table table table-striped">
        <thead>
          <tr>
            {promoTableTitles.map((title, index) => (
              <th
                key={index}
                className="text-center text-nowrap"
                style={{ cursor: "pointer" }}
                onClick={() => handleSortOrder(title.value)}
              >
                <div className="d-flex justify-content-center align-items-center">
                  {title.label}
                  {title.value === sort && order === "asc" && (
                    <FaSortUp className="mt-2" />
                  )}
                  {title.value === sort && order === "desc" && (
                    <FaSortDown className="mb-2" />
                  )}
                </div>
              </th>
            ))}
            <th className="text-center text-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length < 0 || promoLoading ? (
            <tr>
              <td colSpan={promoTableTitles.length + 1}>
                <PageLoader />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((promo: ViewPromoDataState, index) => (
              <tr key={index}>
                <td className="text-center text-nowrap">{promo.code}</td>
                <td className="text-center text-nowrap">{promo.percent}</td>
                <td className="text-center text-nowrap">
                  {promo.maxUses === null ? "No limit" : promo.maxUses}
                </td>
                <td className="text-center text-nowrap">{promo.usedCount}</td>
                <td className="text-center text-nowrap">
                  {promo.expiresAt === null
                    ? "No Expired"
                    : moment(promo.expiresAt).toDate().toLocaleString()}
                </td>
                <td className="text-center text-nowrap">
                  {promo.createdBy.firstname} {promo.createdBy.lastname}
                </td>
                <td className="text-center text-nowrap">
                  {promo.isActive ? "Valid" : "Invalid"}
                </td>
                <td
                  className="text-center text-nowrap"
                  style={{ cursor: "pointer" }}
                >
                  {promo.isActive ? (
                    <Link
                      href={""}
                      onClick={() => {
                        toggleDeleteModal();
                        handleDeleteId(promo._id ?? "");
                      }}
                    >
                      <i className="fa fa-trash-o fs-5" />
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={promoTableTitles.length + 1}>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewPromo;
