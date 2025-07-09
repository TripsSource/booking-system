"use client";
import { trafficOptions } from "@/data/Dashboard/ChartData";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TrafficChart = () => {
  const [time, setTime] = useState("Month");
  let datas = ["Day", "Week", "Month"];

  return (
    <div className="col-lg-6">
      <div className="card ">
        <div className="d-flex align-items-center justify-content-between  card-header">
          <div className="card-header-title">
            <h5>Traffic</h5>
          </div>
          <div className="btn-group">
            {datas.map((data, index) => (
              <button
                key={index}
                onClick={() => setTime(data)}
                className={`btn btn-outline-light btn-js1 ${time === data ? "active" : ""}`}
              >
                {data}
              </button>
            ))}
          </div>
        </div>
        <div className="card-body traffic-chart" style={{ position: "relative" }}>
          <ReactApexChart
            options={trafficOptions}
            series={trafficOptions.series}
            type="area"
            height={370}
          />
        </div>
      </div>
    </div>
  );
};

export default TrafficChart;
