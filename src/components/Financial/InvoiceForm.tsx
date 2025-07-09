"use client";
import SocialIcons from "@/Common/SocialIcons";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { loadingState, suppilerInvoiceAction } from "@/store/auth";
import { loadingState as loadingFinancialState } from "@/store/financial";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { api } from "@/utils/api";
import ReCAPTCHA from "react-google-recaptcha";
import LoadingAuthButton from "@/Common/LoadingAuthButton";
import UseBotCheck from "@/hooks/UseBotCheck";
import moment from "moment";
import { createMailInvoiceAction } from "@/store/financial";
import { supplierInvoice } from "@/types/app/financial";
import { set } from "react-datepicker/dist/date_utils";

const InvoiceForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [invoiceForm, setInvoiceForm] = useState<supplierInvoice>({
    id: id as string,
    name: "",
    description: "",
    vat: "2.6 %",
    amount: "",
    vatAmount: "",
  });
  const [botCaptcha, setRecaptchaToken, setBotCaptcha] = UseBotCheck();
  const botLoading = useSelector(loadingState);
  const loading = useSelector(loadingFinancialState);
  const fetchSupplier = async () => {
    const { payload } = await dispatch(suppilerInvoiceAction(id as string));
    if (payload?.["data"])
      setInvoiceForm((pre) => ({
        ...pre,
        name: payload.data.contactInfo.companyName,
      }));
    console.log(payload);
  };
  useEffect(() => {
    fetchSupplier();
  }, [id]);

  useEffect(() => {
    const vat = invoiceForm.vat.split(" ")[0];
    const vatAmount = (parseFloat(vat) / 100 + 1) * Number(invoiceForm.amount);
    setInvoiceForm((pre) => ({ ...pre, vatAmount: vatAmount.toFixed(2) }));
  }, [invoiceForm.vat, invoiceForm.amount]);

  const handleInvoiceForm = (
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ) => {
    setInvoiceForm((pre) => ({ ...pre, [target.name]: target.value }));
  };

  const formSubmitHandle = async (event: FormEvent) => {
    event.preventDefault();
    const { payload } = await dispatch(createMailInvoiceAction(invoiceForm));
    if (payload?.["error"]) {
      toast.error(`${payload.error}`);
    } else {
      toast.success("Invoice submitted successfully");
      router.push("/dashboard");
    }
  };

  const buttonDisabled = () => {
    const { name, description, vat, amount } = invoiceForm;
    const date = moment(new Date()).format("D");
    if (name === "" || description === "" || amount === "" || date === "25")
      return true;
    else return false;
  };

  return (
    <form className="theme-form" onSubmit={formSubmitHandle}>
      <h4>Invoice</h4>
      <div className="form-group">
        <label className="col-form-label form-label-title">
          Name of Company/Supplier
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          value={invoiceForm.name}
          readOnly
        />
      </div>
      <div className="form-group">
        <label className="col-form-label form-label-title">
          Description of Service
        </label>
        <textarea
          required
          name="description"
          className="form-control"
          value={invoiceForm.description}
          onChange={(e) => handleInvoiceForm(e.target)}
        />
      </div>
      <div className="form-group d-flex justify-content-between">
        <div className="w-50 me-2">
          <label className="col-form-label form-label-title">VAT</label>
          <select
            required
            name="vat"
            className="form-control"
            value={invoiceForm.vat}
            onChange={(e) => handleInvoiceForm(e.target)}
          >
            {["2.6 %", "3.8 %", "8.1 %"].map((vat, index) => (
              <option key={index} value={vat}>
                {vat}
              </option>
            ))}
          </select>
        </div>
        <div className="w-50 ms-2">
          <label className="col-form-label form-label-title">
            Cost of Service
          </label>
          <input
            required
            type="number"
            name="amount"
            className="form-control"
            value={invoiceForm.amount}
            onChange={(e) => handleInvoiceForm(e.target)}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-form-label form-label-title">VAT Amount</label>
        <input
          type="number"
          required
          name="vatAmount"
          className="form-control"
          value={invoiceForm.vatAmount}
          readOnly
        />
      </div>
      <div className="form-group my-2">
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
              loading: loading || botLoading,
              disabled: loading || botLoading || buttonDisabled() || botCaptcha,
              title: "Submit",
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
