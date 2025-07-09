"use client"
import { ImagePath } from '@/utils/Constant'
import Image from 'next/image'
import React from 'react'
import Link from "next/link";
import DatePicker from '../Hotel/common/DatePicker';

const PersonalInformation = () => {
  return (
    <div className="card">
    <div className="card-header">
      <h5>Personal Information</h5>
    </div>
    <div className="card-body">
      <form className="theme-form mega-form" onSubmit={(event: React.FormEvent<HTMLFormElement>)=>event.preventDefault()}>
        <div className="personal-info">
          <div className="personal-info__img">
            <Image height={150} width={150}  src={`${ImagePath}/users/4.jpg`} alt="user4" />
          </div>
          <div className="  personal-info__uplode">
            <p>Max file size is 5MB,Minimum dimension 150x150 And Suitable files are .jpg &amp; .png </p>
            <div className="uplode-img">
              <input type="file" id="img" name="img" accept="image/*" />
              <label htmlFor="img"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1={12} y1={3} x2={12} y2={15} /></svg> Uploade Image here</label>
            </div>
            <Link href={"/setting"}>
              <button className=" btn btn-primary btn--hover" type="submit"> Remove image</button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label className="form-label-title mt-3">First Name</label>
            <input className="form-control" type="text" placeholder="First Name" />
          </div>
          <div className="col-sm-6">
            <label className="form-label-title mt-3">Last Name</label>
            <input className="form-control" type="text" placeholder="Last Name" />
          </div>
          <div className="col-sm-6">
            <label className="form-label-title mt-3">Email Address</label>
            <input className="form-control" type="Email" placeholder="Email Address" />
          </div>
          <div className="col-sm-6">
            <label className="form-label-title mt-3">Contact Numer</label>
            <input className="form-control" type="number" placeholder="Contact Number" />
          </div>
          <div className="col-sm-6">
            <label className="form-label-title mt-3">Date of Birthdate </label>
            <div className="input-group date" id="dt-date" data-target-input="nearest">
              <div className="input-group">
                 <DatePicker/>
                <div className="input-group-text" ><i className="fa fa-calendar" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <label className="form-label-title mt-3">Address</label>
            <input className="form-control" type="text" placeholder="Address" />
          </div>
        </div>
        <Link href={"/setting"}>
          <button className="btn btn-primary mt-3">Save Change </button>
        </Link>
      </form>
    </div>
  </div>
  )
}

export default PersonalInformation