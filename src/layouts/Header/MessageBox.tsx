import React from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { ImagePath, MessageBoxes, ViewAll } from "@/utils/Constant";
import { messageBoxesData } from "@/data/layout";
import Image from "next/image";
import { Href } from "../../utils/Constant";
import Link from "next/link";

const MessageBox = () => {
  return (
    <li className="onhover-dropdown">
      <DynamicFeatherIcon iconName="MessageSquare" />
      <ul className="chat-dropdown onhover-show-div">
        <li>
          <DynamicFeatherIcon iconName="MessageSquare" />
          <h6 className="f-18 mb-0">{MessageBoxes}</h6>
        </li>
        {messageBoxesData.map((data, index) => (
          <li key={index}>
            <div className="media">
              <Image height={40} width={40} className="img-fluid rounded-circle me-3" src={`${ImagePath}/user/${index + 1}.jpg`} alt="user1"/>
              <div className={`status-circle ${data.offline ? "offline" : "online"}`}/>
              <div className="media-body">
                <span>{data.name}</span>
                <p>Lorem Ipsum is simply dummy...</p>
              </div>
              <p className={`f-12 font-${data.font}`}>{data.time}</p>
            </div>
          </li>
        ))}
        <li className="text-center">
          <Link className="btn btn-primary" href={"users/allusers"}>{ViewAll}</Link>
        </li>
      </ul>
    </li>
  );
};

export default MessageBox;
