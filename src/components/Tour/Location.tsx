import { mapId } from "@/data/Tour";

const Location = () => {
  return (
    <div className="desc-box" id="location">
      <h4 className="content-title mx-1">location</h4>
      <div className="menu-part page-section map">
        <iframe src={mapId} style={{ border: "0" }}></iframe>
      </div>
    </div>
  );
};

export default Location;
