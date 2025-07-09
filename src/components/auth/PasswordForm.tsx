"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { accountForgotPasswordAction, loadingState } from "@/store/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import LoadingAuthButton from "@/Common/LoadingAuthButton";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({ email: "" });
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(loadingState);
  const { email } = formValues;
  const router = useRouter();
  const handleUserValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  const formSubmitHandle = async (event: FormEvent) => {
    event.preventDefault();
    if (email === "") {
      toast.error("Please enter your email");
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    } else {
      const result = await dispatch(accountForgotPasswordAction(email));
      const payload = result.payload;
      if (payload?.message) {
        toast.success(`${payload?.message}`);
        router.push("/auth/login");
      } else {
        if (payload && "error" in payload) {
          toast.error(`${payload.error}`);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    }
  };

  return (
    <form className="theme-form" onSubmit={formSubmitHandle}>
      <h4>Forgot password</h4>
      <p>Enter your email</p>
      <div className="form-group">
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
      <div className="form-group mb-0">
        <div className="text-end mt-3">
          <LoadingAuthButton
            {...{
              classes: "btn btn-primary btn-block w-100",
              types: "submit",
              loading,
              disabled: loading || email === "",
              title: "Send Reset Password",
            }}
          />
        </div>
      </div>
      <p className="mt-4 mb-0 text-center">
        Do have a new password?
        <Link className="ms-2" href="/auth/login">
          Return Login
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
