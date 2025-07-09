import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { userProfileData } from "@/data/layout";
import { Admin, ImagePath, LogOut } from "@/utils/Constant";
import Image from "next/image";
import React, { useState } from "react";
import { Href } from "../../utils/Constant";
import LogOutModal from "./LogOutModal";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const UserProfile = () => {
  const { user, loading } = useSelector(
    (state: RootState) => state.AuthReducers
  );
  const [modalOpen, setModalOpen] = useState(false);
  const toggle = () => setModalOpen(!modalOpen);
  return (
    <li className="profile-nav onhover-dropdown pe-0 me-0">
      <div className="media profile-media">
        <Image
          height={40}
          width={40}
          className="user-profile rounded-circle"
          src={`${ImagePath}/users/4.jpg`}
          alt="profile-picture"
        />
        <div className="user-name-hide media-body">
          <span>
            {user.firstname} {user.lastname}
          </span>
          <p className="mb-0 font-roboto">
            {user.role} <i className="middle fa fa-angle-down" />
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        {userProfileData.map((data, index) => (
          <li key={index}>
            <Link href={data.link}>
              <DynamicFeatherIcon iconName={data.icon} />
              <span>{data.title}</span>
            </Link>
          </li>
        ))}
        <li>
          <a href={Href} onClick={toggle}>
            <DynamicFeatherIcon iconName="LogOut" />
            <span>{LogOut}</span>
          </a>
          <LogOutModal modal={modalOpen} toggle={toggle} />
        </li>
      </ul>
    </li>
  );
};

export default UserProfile;
