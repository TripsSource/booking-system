"use client";
import Link from "next/link";
import { api } from "@/utils/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { accountResetPasswordAction, loadingState } from "@/store/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import LoadingAuthButton from "@/Common/LoadingAuthButton";
import ReCAPTCHA from "react-google-recaptcha";
import UseBotCheck from "@/hooks/UseBotCheck";

const ResetPassForm = () => {
  const { id } = useParams();
  const [showPassWord, setShowPassWord] = useState(false);
  const [formValues, setFormValues] = useState({
    password: "",
    prePass: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const [botCaptcha, setRecaptchaToken, setBotCaptcha] = UseBotCheck();
  const { password, prePass } = formValues;
  const router = useRouter();
  const handleUserValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  const loading = useSelector(loadingState);

  const formSubmitHandle = async (event: FormEvent) => {
    event.preventDefault();
    if (formValues.password !== formValues.prePass) {
      toast.error("Password does not match");
      return;
    } else {
      const { payload } = await dispatch(
        accountResetPasswordAction({ id: `${id}`, password })
      );
      if (payload?.message) {
        router.push("/auth/login");
        toast.success(`${payload?.message}`);
      } else {
        if (payload && "error" in payload) {
          toast.error(`${payload.error}`);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    }
  };

  const buttonDisabled = () => {
    if (password === "") return true;
    else return false;
  };

  return (
    <form className="theme-form" onSubmit={formSubmitHandle}>
      <h4>Reset your new password</h4>
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
      <div className="form-group">
        <label className="col-form-label form-label-title">Pre-Password</label>
        <div className="form-input position-relative">
          <input
            type={showPassWord ? "text" : "password"}
            placeholder="*********"
            onChange={handleUserValue}
            name="prePass"
            value={prePass}
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
      <ReCAPTCHA
        sitekey="6Lf-6WkrAAAAAMr1-cDSrTWvIuPFmwYhFdeykZmq"
        onChange={(e) => setRecaptchaToken(e)}
        onExpired={() => {
          setBotCaptcha(true);
        }}
      />
      <div className="form-group mb-0 mt-4">
        <LoadingAuthButton
          {...{
            classes: "btn btn-primary btn-block w-100",
            types: "submit",
            loading,
            disabled: loading || buttonDisabled() || botCaptcha,
            title: "Reset Password",
          }}
        />
      </div>
      <p className="mt-4 mb-0">
        Already have a new password?
        <Link className="ms-2" href="/login">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default ResetPassForm;
