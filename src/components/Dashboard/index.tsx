"use client";
import BookingHistory from "@/components/Dashboard/BookingHistory";
import Calender from "@/components/Dashboard/Calender";
import EarningChart from "@/components/Dashboard/EarningChart";
import GrowthCard from "@/components/Dashboard/GrowthCard";
import Tours from "@/components/Dashboard/Tours";
import TrafficChart from "@/components/Dashboard/TrafficChart";
import VisitorsChart from "@/components/Dashboard/VisitorsChart";
import PageLoader from "@/layouts/PageLoader";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
// import WorldMap from "@/components/Dashboard/WorldMap";

const DashboardContainer: React.FC = () => {
  const [embedUrl, setEmbedUrl] = useState("");
  const getChat = async () => {
    await api.get("/api/dash/").then((res) => {
      setEmbedUrl(res.data);
    });
  };
  useEffect(() => {
    getChat();
  }, []);
  return (
    <div className="container-fluid">
      {embedUrl === "" ? (
        <PageLoader />
      ) : (
        <div className="row">
          {/* <GrowthCard /> */}
          <iframe
            width="100%"
            height="980"
            src={embedUrl} // URL obtained from your backend
            frameBorder="0"
            allowFullScreen
          ></iframe>
          {/* <VisitorsChart />
        <EarningChart />
        <BookingHistory />
        <Calender />
        <TrafficChart /> */}
          {/* <WorldMap checkPlace={false} /> */}
          {/* <Tours /> */}
        </div>
      )}
    </div>
  );
};

export default DashboardContainer;
