"use client";
import SocialIcons from "@/Common/SocialIcons";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { accountLoginAction, loadingState } from "@/store/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { api } from "@/utils/api";
import ReCAPTCHA from "react-google-recaptcha";
import LoadingAuthButton from "@/Common/LoadingAuthButton";
import UseBotCheck from "@/hooks/UseBotCheck";

const LoginForm = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [botCaptcha, setRecaptchaToken, setBotCaptcha] = UseBotCheck();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(loadingState);
  const { email, password } = formValues;
  const router = useRouter();

  const handleUserValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const formSubmitHandle = async (event: FormEvent) => {
    event.preventDefault();
    // if (email === "Test@gmail.com" && password === "Test@123") {
    //   Cookies.set("token", JSON.stringify(true));
    //   router.push("/dashboard");
    //   toast.success("login successful");
    // } else {
    //   alert("wrong email");
    // }
    const { payload } = await dispatch(accountLoginAction(formValues));
    const token = localStorage.getItem("token");
    api.defaults.headers.common["Authorization"] = `${token}`;
    if (payload && "error" in payload && payload.error) {
      toast.error(`${payload.error}`);
    } else {
      toast.success("Login successful");
      router.push("/dashboard");
    }
    // if (payload.user) {
    //   toast.success("Login successful");
    // } else {
    //   toast.error(`${payload}`);
    // }
    // const token = localStorage.getItem("token");
    // if (token) {
    //   Cookies.set("token", token);
    //   router.push("/dashboard");
    //   toast.success("login successful");
    // } else {
    //   toast.error("wrong email");
    // }
  };

  const buttonDisabled = () => {
    if (email === "" || password === "") return true;
    else return false;
  };

  return (
    <form className="theme-form" onSubmit={formSubmitHandle}>
      <h4>Sign in to account</h4>
      <p>Enter your email &amp; password to login</p>
      <div className="form-group">
        <label className="col-form-label form-label-title">Email Address</label>
        <input
          type="email"
          required
          placeholder="Test@gmail.com"
          value={email}
          name="email"
          className="form-control"
          onChange={handleUserValue}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label form-label-title">Password</label>
        <div className="form-input position-relative">
          <input
            type={showPassWord ? "text" : "password"}
            placeholder="*********"
            onChange={handleUserValue}
            value={password}
            name="password"
            required
            className="form-control"
          />
          <div className="show-hide">
            <span
              onClick={() => setShowPassWord(!showPassWord)}
              className={!showPassWord ? "show" : ""}
            />
          </div>
        </div>
      </div>
      <div className="form-group mb-0">
        <div className="checkbox p-0">
          <input id="checkbox1" type="checkbox" />
          <label className="text-muted" htmlFor="checkbox1">
            Remember password
          </label>
        </div>
        <a className="link" href="/auth/password">
          Forgot password?
        </a>
        <ReCAPTCHA
          sitekey="6Lf-6WkrAAAAAMr1-cDSrTWvIuPFmwYhFdeykZmq"
          onChange={(e) => setRecaptchaToken(e)}
          onExpired={() => {
            setBotCaptcha(true);
          }}
        />
        <div className="text-end mt-3">
          <LoadingAuthButton
            {...{
              classes: "btn btn-primary btn-block w-100",
              types: "submit",
              loading,
              disabled: loading || buttonDisabled() || botCaptcha,
              title: "Sign in",
            }}
          />
        </div>
      </div>
      <h6 className="text-muted mt-4 or">Or Sign in with</h6>
      <SocialIcons />
      <p className="mt-4 mb-0 text-center">
        Don't have account?
        <Link className="ms-2" href="/auth/register">
          Create Account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
