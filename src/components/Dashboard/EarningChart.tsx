"use client";
import { barChartOptions } from "@/data/Dashboard/ChartData";
import dynamic from "next/dynamic";
const EarningChart = () => {
  const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

  return (
    <div className="col-xl-8">
      <div className="card o-hidden ">
        <div className="card-header">
          <div className="card-header-title">
            <h4>Earning </h4>
          </div>
          <div className="card-body p-0" style={{position:"relative"}}>
            <div id="bar-chart-earning"  >
                <ReactApexChart options={barChartOptions} series={barChartOptions.series} type="bar"  height={300} width={"100%"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningChart;
