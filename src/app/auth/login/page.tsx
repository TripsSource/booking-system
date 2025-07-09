"use client";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

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
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
