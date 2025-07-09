"use client"
import React from 'react'
import Link from "next/link";

const EmailChange = () => {
  return (
    <div className="card">
    <div className="row">
      <div className="col-sm-6">
        <div className="card-header">
          <h5>Chnage Email</h5>
        </div>
        <div className="card-body">
          <form className="theme-form mega-form" onSubmit={(event: React.FormEvent<HTMLFormElement>)=>event.preventDefault()}>
            <div className="mb-3">
              <label className="form-label-title "> Current Email</label>
              <input className="form-control" type="email" placeholder=" Current Email Address" />
            </div>
            <div className="mb-3">
              <label className="form-label-title "> New Email</label>
              <input className="form-control" type="email" placeholder="New Email address" />
            </div>
            <div className="mb-3">
              <label className="form-label-title "> New Email Again</label>
              <input className="form-control" type="email" placeholder="New Again Email address" />
            </div>
            <Link href={"/setting"}>
              <button className="btn btn-primary"> Change Email</button>
            </Link>
          </form>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card-header">
          <h5>Change Password</h5>
        </div>
        <div className="card-body">
          <form className="theme-form mega-form" onSubmit={(event: React.FormEvent<HTMLFormElement>)=>event.preventDefault()}>
            <div className="mb-3">
              <label className="form-label-title "> Current Password</label>
              <input className="form-control" type="password" autoComplete='' placeholder=" Current Password" />
            </div>
            <div className="mb-3">
              <label className="form-label-title "> New Password</label>
              <input className="form-control" type="password" autoComplete='' placeholder="New Password" />
            </div>
            <div className="mb-3">
              <label className="form-label-title "> New Password Again</label>
              <input className="form-control" type="password" autoComplete='' placeholder="New Again Password" />
            </div>
            <Link href={"/setting"}>
              <button className="btn btn-primary"> Change Password</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EmailChange