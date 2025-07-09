import { ImagePath } from "@/utils/Constant";
import Image from "next/image";

const Amenities = () => {
  const amenitiesList = [
    { title: "king/twin", list: "bed" },
    { title: "Shower", list: "shower" },
    { title: "LCD TV", list: "television" },
    { title: "couch", list: "couch" },
  ];
  return (
    <ul>
      {amenitiesList.map((data, index) => (
        <li key={index}>
          <Image
            height={20}
            width={20}
            src={`${ImagePath}/icon/${index === 0 ?"tour":"hotel"}/${data.list}.png`}
            className="img-fluid blur-up lazyload"
            alt=""
          />
          {data.title}
        </li>
      ))}
    </ul>
  );
};

export default Amenities;
