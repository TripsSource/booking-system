import { ImagePath } from "@/utils/Constant";
import { useState } from "react";
import { useEffect } from "react";

const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
  return (
    show && (
      <div className="loader-wrapper">
        <img src={`${ImagePath}/loader/loader.gif`} alt="loader gif" />
      </div>
    )
  );
};

export default Loader;
