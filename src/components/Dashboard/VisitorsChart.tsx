"use client";
import { visitorOptions } from "@/data/Dashboard/ChartData";
import VisitorChartHeader from "./VisitorChartHeader";
import ReactApexChart from "react-apexcharts";

const VisitorsChart = () => {

  return (
    <div className="col-xl-4">
      <div className="h-100">
        <div className="card o-hidden  ">
          <VisitorChartHeader />
          <div className="card-body ">
            <div className="pie-chart">
              <ReactApexChart
                options={visitorOptions}
                series={visitorOptions.series}
                type="donut"
                height={280}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsChart;
