import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { setToggleSideBar } from "@/store/ThemeCustomize";
import { AppDispatch } from "@/store";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

const HeaderLogo = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="header-logo-wrapper col-auto p-0">
      <div className="logo-wrapper d-flex justify-content-end">
        <Link href="/dashboard">
          <Image
            height={31.78}
            width={39.78}
            className="img-fluid main-logo"
            src={`${ImagePath}/logo/logo.png`}
            alt="logo"
          />
          <Image
            height={31.78}
            width={39.78}
            className="img-fluid white-logo"
            src={`${ImagePath}/logo/logo.png`}
            alt="logo"
          />
        </Link>
      </div>
      <div className="toggle-sidebar" defaultChecked>
        <DynamicFeatherIcon
          iconName="AlignCenter"
          className="status_toggle middle sidebar-toggle"
          onClick={() => dispatch(setToggleSideBar())}
        />
      </div>
    </div>
  );
};

export default HeaderLogo;
