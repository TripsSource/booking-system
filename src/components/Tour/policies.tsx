import { policyData } from "@/data/Tour";

const TourPolicies = () => {
  return (
    <div className="about menu-part tab-pane" id="policies">
      {policyData.map((data, index) => (
        <div className="about-sec" key={index}>
          <h6>{data.title}</h6>
          <ul>
            {data.list.map((item, i) => (
              <li key={i}>{item.desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TourPolicies;
