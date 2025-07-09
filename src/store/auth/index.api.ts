import { Response } from "@/types/api";
import { api } from "@/utils/api";
import Cookies from "js-cookie";

type UserTypes = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role?: string;
  travelAgentProfile?: {
    agencyName: string;
    incorpYear: string;
    addr?: {
      street?: string;
      city?: string;
      postal?: string;
      state?: string;
      country?: string;
    };
    phone: string;
    tourType: string;
    cities: string[];
  };
};

export interface LoginType {
  token: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  };
}

export interface ForgotPasswordType {
  message?: string;
  error?: string;
}

export const Login = async (user: UserTypes): Promise<Response<LoginType>> => {
  return await api
    .post("/api/users/login", { email: user.email, password: user.password })
    .then((res) => {
      localStorage.setItem("token", "Bearer " + res.data.token);
      Cookies.set("token", "Bearer " + res.data.token);
      return res.data;
    });
};

export const CheckAuthenticated = async (
  token: string
): Promise<Response<LoginType>> => {
  return await api
    .post("/api/users/checkauthenticated", { token })
    .then((res) => res.data);
};

export const Register = async (user: UserTypes) => {
  const payload: UserTypes = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
    role: user.role,
  };

  if (user.role === "Travel Agent") {
    payload.travelAgentProfile = user.travelAgentProfile;
  }
  return await api.post("/api/users/register", payload).then((res) => res.data);
};

export const ForgotPassword = async (
  email: string
): Promise<Response<ForgotPasswordType>> => {
  return await api
    .post("/api/users/forgot-password", { email })
    .then((res) => res.data);
};

export const ResetPassword = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}): Promise<Response<ForgotPasswordType>> => {
  return await api
    .post(`/api/users/reset-password/${id}`, { newPassword: password })
    .then((res) => res.data);
};

export const TokenValid = async () => {
  return await api.get("/api/users/me").then((res) => res.data);
};

export const botCheck = async (recaptchaToken: string) => {
  return await api
    .post("/api/users/botcheck", { recaptchaToken })
    .then((res) => res.data);
};

export const suppilerInvoice = async (id: string) => {
  return await api.get(`/api/users/supplier/${id}`).then((res) => res.data);
};
