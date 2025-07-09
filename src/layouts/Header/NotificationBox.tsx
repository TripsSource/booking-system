import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { notificationBoxData } from "@/data/layout";
import { Href, Notifications } from "@/utils/Constant";
import Link from "next/link";

const NotificationBox = () => {
  return (
    <li className="onhover-dropdown">
      <div className="notification-box">
        <i className="fa fa-bell-o"> </i>
        <span className="badge rounded-pill badge-theme">4 </span>
      </div>
      <ul className="notification-dropdown onhover-show-div">
        <li>
          <DynamicFeatherIcon iconName="Bell" />
          <h6 className="f-18 mb-0">{Notifications}</h6>
        </li>
        {notificationBoxData.map((data, index) => (
          <li key={index}>
            <Link href={"/booking"}>
              <p><i className={`fa fa-circle-o me-3 font-${data.className}`}> </i>{data.title}<span className="pull-right">{data.time}</span></p>
            </Link>
          </li>
        ))}
        <li>
          <Link className="btn btn-primary" href={"/setting"}>Check all notification</Link>
        </li>
      </ul>
    </li>
  );
};

export default NotificationBox;
