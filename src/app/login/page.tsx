"use client";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Href } from "@/utils/Constant";
import SocialIcons from "@/Common/SocialIcons";

const Login = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-12 p-0">
          <div className="login-card">
            <div>
              <div>
                <Link className="logo" href="/">
                  <Image
                    height={34}
                    width={120}
                    className="img-fluid for-light"
                    src={`${ImagePath}/logo/logo-icon.png`}
                    alt="looginpage"
                  />
                  <Image
                    height={34}
                    width={120}
                    className="img-fluid for-dark"
                    src={`${ImagePath}/logo/logo-white.png`}
                    alt="looginpage"
                  />
                </Link>
              </div>
              <div className="login-main">
                <form
                  className="theme-form"
                  onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                    event.preventDefault()
                  }
                >
                  <h4>Sign in to account</h4>
                  <p>Enter your email &amp; password to login</p>
                  <div className="form-group">
                    <label className="col-form-label form-label-title ">
                      Email Address
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      required
                      placeholder="Test@gmail.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label form-label-title ">
                      Password
                    </label>
                    <div className="form-input position-relative">
                      <input
                        className="form-control"
                        type="password"
                        autoComplete=""
                        name="login[password]"
                        required
                        placeholder="*********"
                      />
                      <div className="show-hide">
                        <span className="show"> </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-0">
                    <div className="checkbox p-0">
                      <label className="d-block" htmlFor="checkbox-1">
                        <input
                          className="checkbox_animated"
                          id="checkbox-1"
                          type="checkbox"
                        />
                        Remember password
                      </label>
                    </div>
                    <a className="link" href={Href}>
                      Forgot password?
                    </a>
                    <div className="text-end mt-3">
                      <button
                        className="btn btn-primary btn-block w-100"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                  <h6 className="text-muted mt-4 or">Or Sign in with</h6>
                  <SocialIcons />
                  <p className="mt-4 mb-0 text-center">
                    Don't have account?
                    <Link className="ms-2" href="/register">
                      Create Account
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
