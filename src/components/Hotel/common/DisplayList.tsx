import React from "react";

const DisplayList = ({ nameList }: { nameList: string[] }) => {
  return (
    <ul>
      {nameList.map((data, index) => (
        <li key={index}>
          <i className="fa fa-check" /> {data}
        </li>
      ))}
    </ul>
  );
};

export default DisplayList;
