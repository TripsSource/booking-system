"use client";
import { First, Href, Last, Next, Previous } from "@/utils/Constant";
import React, { useEffect } from "react";

const PurePagination = ({
  pages,
  handlePages,
  loading,
}: {
  pages: { page: number; perPage: number; totalPages: number };
  handlePages: (field: string, value: number) => void;
  loading?: boolean;
}) => {
  const { page, perPage, totalPages } = pages;
  useEffect(() => {
    handlePages("page", 1);
  }, [perPage]);

  const pageses = [];

  pageses.push(1);

  const addEllipsis = (arr: any) => {
    console.error("addEllipsis expects array but got:", arr);
    if (arr[arr.length - 1] !== "...") arr.push("...");
  };

  if (totalPages <= 7) {
    for (let i = 2; i <= totalPages; i++) pageses.push(i);
  } else {
    if (page <= 3) {
      for (let i = 2; i <= 4; i++) pageses.push(i);
      addEllipsis(pageses);
      pageses.push(totalPages);
    } else if (page >= totalPages - 2) {
      addEllipsis(pageses);
      for (let i = totalPages - 3; i <= totalPages; i++) pageses.push(i);
    } else {
      addEllipsis(pageses);
      pageses.push(page - 1);
      pageses.push(page);
      pageses.push(page + 1);
      addEllipsis(pageses);
      pageses.push(totalPages);
    }
  }

  const handleFirstClick = () => {
    if (page > 1) {
      handlePages("page", 0);
    }
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      handlePages("page", page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      handlePages("page", page + 1);
    }
  };

  const handleLastClick = () => {
    if (page < totalPages) {
      handlePages("page", totalPages);
    }
  };

  const pageItems = pageses.map((number: any, index) =>
    number === "..." ? (
      <li
        key={`ellipsis-${index}`}
        className="d-flex align-items-end mx-2 disabled"
      >
        ...
      </li>
    ) : (
      <li
        key={number}
        className={`page-item ${number === page ? "active" : ""}`}
      >
        {loading ? (
          <a href="#" className="page-link">
            {number}
          </a>
        ) : (
          <a
            href="#"
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              handlePages("page", number);
            }}
          >
            {number}
          </a>
        )}
      </li>
    )
  );

  return (
    <div className="pagination-box">
      {totalPages !== 0 && (
        <div className="d-flex justify-content-around">
          <nav className="ms-auto me-auto">
            <ul className="pagination pagination-primary">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <a className="page-link" href={Href} onClick={handleFirstClick}>
                  {First}
                </a>
              </li>
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <a
                  className="page-link"
                  href={Href}
                  onClick={handlePreviousClick}
                >
                  {Previous}
                </a>
              </li>
              {pageItems}
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <a className="page-link" href={Href} onClick={handleNextClick}>
                  {Next}
                </a>
              </li>
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <a className="page-link" href={Href} onClick={handleLastClick}>
                  {Last}
                </a>
              </li>
            </ul>
          </nav>
          <div className="d-flex justify-content-start">
            <label className="form-label-title text-nowrap mt-2">
              Per Page
            </label>
            <select
              className="form-control ms-3 w-auto"
              value={perPage}
              onChange={(e) => handlePages("perPage", Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurePagination;
