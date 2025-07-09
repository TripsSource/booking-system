"use client";
import { ImagePath } from "@/utils/Constant";
import Image from "next/image";
import Link from "next/link";
import InvoiceForm from "@/components/Financial/InvoiceForm";

const page = () => {
  return (
    <div className="container-fluid px-5">
      <div className="row mx-5">
        <div className="col-12 p-5">
          <div className="d-flex justify-content-center">
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
          <InvoiceForm />
        </div>
      </div>
    </div>
  );
};

export default page;
