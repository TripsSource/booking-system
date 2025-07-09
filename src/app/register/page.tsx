"use client"
import SocialIcons from '@/Common/SocialIcons'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <div className="container-fluid p-0">
  <div className="row m-0">
    <div className="col-12 p-0">
      <div className="login-card">
        <div>
          <div><Link className="logo" href="/"><img className="img-fluid for-light" src="../assets/images/logo/logo-icon.png" alt="looginpage" /><img className="img-fluid for-dark" src="../assets/images/logo/logo-white.png" alt="looginpage" /></Link></div>
          <div className="login-main">
            <form className="theme-form" onSubmit={(event: React.FormEvent<HTMLFormElement>)=>event.preventDefault()}>
              <h4>Create your account</h4>
              <p>Enter your personal details to create account</p>
              <div className="form-group">
                <label className="col-form-label form-label-title  pt-0">Your Name</label>
                <div className="row g-2">
                  <div className="col-6">
                    <input className="form-control" type="text" required placeholder="First name" />
                  </div>
                  <div className="col-6">
                    <input className="form-control" type="text" required placeholder="Last name" />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-form-label form-label-title ">Email Address</label>
                <input className="form-control" type="email" required placeholder="Test@gmail.com" />
              </div>
              <div className="form-group">
                <label className="col-form-label form-label-title ">Password</label>
                <div className="form-input position-relative">
                  <input className="form-control" type="password" autoComplete='' name="login[password]" required placeholder="*********" />
                  <div className="show-hide"><span className="show" /></div>
                </div>
              </div>
              <div className="form-group mb-0">
                <div className="checkbox p-0">
                  <label className="d-block" htmlFor="checkbox-1">
                      <input className="checkbox_animated" id="checkbox-1" type="checkbox"/>
                      Agree with<a className="ms-2" href="#">Privacy Policy</a>
                  </label>
                </div>
                <button className="btn btn-primary btn-block w-100" type="submit">Create
                  Account</button>
              </div>
              <h6 className="text-muted mt-4 or">Or signup with</h6>
                <SocialIcons/>
              <p className="mt-4 mb-0">Already have an account?<Link className="ms-2" href="/login">Sign in</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Register