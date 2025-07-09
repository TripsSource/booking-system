"use client";
import SocialIcons from "@/Common/SocialIcons";
import { Href } from "@/utils/Constant";
import Link from "next/link";
import { ChangeEvent, FormEvent, forwardRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { accountRegisterAction, loadingState } from "@/store/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import LoadingAuthButton from "@/Common/LoadingAuthButton";
import { Typeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import moment from "moment";
import { countryOptions } from "@/utils/constantValues";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import { interesteCities, tourofTypes } from "@/constants/data";
import UseBotCheck from "@/hooks/UseBotCheck";
import ReCAPTCHA from "react-google-recaptcha";

interface LoginState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  prePass: string;
  role: string;
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

  checked: boolean;
}

const RegisterForm = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [formValues, setFormValues] = useState<LoginState>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    prePass: "",
    role: "Direct Client",
    checked: false,
    travelAgentProfile: {
      agencyName: "",
      incorpYear: `${moment().toDate()}`,
      addr: {
        street: "",
        city: "",
        postal: "",
        state: "",
        country: "",
      },
      phone: "",
      tourType: "",
      cities: [],
    },
  });
  const [botCaptcha, setRecaptchaToken, setBotCaptcha] = UseBotCheck();
  const [step, setStep] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { firstname, lastname, email, password, prePass, checked, role } =
    formValues;
  const router = useRouter();
  const handleUserValue = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const loading = useSelector(loadingState);

  const handleTravelInfo = (type: string, value: string | string[]) => {
    setFormValues({
      ...formValues,
      travelAgentProfile: {
        ...formValues.travelAgentProfile!,
        [type]: value,
      },
    });
  };

  const formSubmitHandle = async (event: FormEvent) => {
    event.preventDefault();
    if (formValues.password !== formValues.prePass) {
      toast.error("Password does not match");
      return;
    } else {
      const { payload } = await dispatch(accountRegisterAction(formValues));
      if (payload?.["error"]) {
        toast.error(`${payload.error}`);
      } else {
        if (payload?.["message"]) {
          toast.success(payload.message);
          router.push("/auth/login");
        }
      }
    }
  };

  const handleTravelAddressInfoValue = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({
      ...formValues,
      travelAgentProfile: {
        ...formValues.travelAgentProfile!,
        addr: {
          ...formValues.travelAgentProfile!.addr,
          [event.target.name]: event.target.value,
        },
      },
    });
  };

  const buttonDisabled = () => {
    if (firstname === "" || lastname === "" || email === "" || password === "")
      return true;
    else return false;
  };

  const isTravelAgentProfileValid = (): boolean => {
    const { agencyName, incorpYear, addr, phone, tourType, cities } =
      formValues.travelAgentProfile!;

    if (
      !agencyName ||
      !phone ||
      !tourType ||
      !incorpYear ||
      !Array.isArray(cities) ||
      cities.length === 0
    ) {
      return true;
    }

    if (!addr) return true;

    const { street, city, postal, state, country } = addr;

    if (!street || !city || !postal || !state || !country) {
      return true;
    }

    return false;
  };

  return (
    <form className="theme-form" onSubmit={formSubmitHandle}>
      <h4>Create your account</h4>
      <p>Enter your personal details to create account</p>
      {!step && (
        <>
          <div className="form-group">
            <label className="col-form-label form-label-title pt-0">
              Your Name
            </label>
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="text"
                  required
                  placeholder="First name"
                  value={firstname}
                  name="firstname"
                  className="form-control"
                  onChange={handleUserValue}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  required
                  placeholder="Last name"
                  value={lastname}
                  name="lastname"
                  className="form-control"
                  onChange={handleUserValue}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-form-label form-label-title">
              Email Address
            </label>
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
          <div className="form-group">
            <label className="col-form-label form-label-title">
              Pre-Password
            </label>
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
        </>
      )}
      {role === "Travel Agent" && step && (
        <>
          <div className="form-group">
            <label className="col-form-label form-label-title">
              Travel Agency Name
            </label>
            <div className="form-input position-relative">
              <input
                type="text"
                placeholder="Travel Old Group"
                onChange={(e) => handleTravelInfo("agencyName", e.target.value)}
                value={formValues.travelAgentProfile?.agencyName}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group d-flex justify-content-between">
            <label className="col-form-label form-label-title mt-1">
              Year of Incorporation
            </label>
            <DatePicker
              selected={moment(
                formValues.travelAgentProfile?.incorpYear
              ).toDate()}
              onChange={(date: any) =>
                handleTravelInfo(
                  "incorpYear",
                  moment(date).format("YYYY-MM-DD")
                )
              }
              maxDate={moment().toDate()}
              showYearPicker
              dateFormat="yyyy"
              placeholderText="YYYY"
              className="form-control text-right"
              yearItemNumber={10}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label form-label-title pt-0">
              Travel Agency Address
            </label>
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="text"
                  required
                  placeholder="Street"
                  value={formValues.travelAgentProfile?.addr?.street}
                  name="street"
                  className="form-control"
                  onChange={handleTravelAddressInfoValue}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={formValues.travelAgentProfile?.addr?.city}
                  name="city"
                  className="form-control"
                  onChange={handleTravelAddressInfoValue}
                />
              </div>
            </div>
            <div className="row g-2 mt-1">
              <div className="col-6">
                <input
                  type="text"
                  required
                  placeholder="Postal Code"
                  value={formValues.travelAgentProfile?.addr?.postal}
                  name="postal"
                  className="form-control"
                  onChange={handleTravelAddressInfoValue}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  required
                  placeholder="State"
                  value={formValues.travelAgentProfile?.addr?.state}
                  name="state"
                  className="form-control"
                  onChange={handleTravelAddressInfoValue}
                />
              </div>
            </div>
            <div className="form-input position-relative mt-2">
              <Select
                placeholder="  Select Country..."
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    padding: "0.3rem 0.5rem",
                  }),
                }}
                options={countryOptions as { label: string; value: string }[]}
                value={countryOptions.filter(
                  (countryList) =>
                    countryList.value ===
                    formValues.travelAgentProfile?.addr?.country
                )}
                onChange={(e) =>
                  setFormValues((pre) => ({
                    ...pre,
                    travelAgentProfile: {
                      ...pre.travelAgentProfile!,
                      addr: {
                        ...pre.travelAgentProfile!.addr!,
                        country: e.value,
                      },
                    },
                  }))
                }
                formatOptionLabel={(e: any) => (
                  <div className="d-flex fs-6">
                    <img
                      src={`https://flagcdn.com/w20/${e.value.toLowerCase()}.png`}
                      alt={e.label}
                      style={{
                        width: "27px",
                        height: "20px",
                        marginRight: "10px",
                        marginTop: "2px",
                      }}
                    />
                    {e.label}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-form-label form-label-title">
              Phone Number
            </label>
            <div className="form-input position-relative">
              <PhoneInput
                country={"ch"}
                placeholder="Enter phone number"
                inputClass="form-control"
                value={formValues.travelAgentProfile?.phone}
                inputStyle={{
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  padding: "1.4rem 0 1.4rem 3rem",
                }}
                onChange={(e) => handleTravelInfo("phone", e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-form-label form-label-title">
              Type of Tours
            </label>
            <div className="form-input position-relative">
              <select
                value={formValues.travelAgentProfile?.tourType}
                required
                className="form-control"
                onChange={(e) => handleTravelInfo("tourType", e.target.value)}
              >
                <option value="">--Select Type of Tours--</option>
                {tourofTypes.map((tourType, index) => (
                  <option value={tourType} key={index}>
                    {tourType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-form-label form-label-title">
              Interested Cities
            </label>
            <div className="form-input position-relative">
              <Typeahead
                id="multiple-typeahead"
                defaultSelected={formValues.travelAgentProfile?.cities}
                multiple
                options={interesteCities}
                onChange={(e) =>
                  handleTravelInfo(
                    "cities",
                    e.map((option) =>
                      typeof option === "string" ? option : option.label
                    )
                  )
                }
                placeholder="Select Cities...."
              />
            </div>
          </div>
        </>
      )}
      {!step && (
        <div className="form-group mb-4">
          <label className="col-form-label form-label-title">
            Account Type
          </label>
          <div className="d-flex ">
            {[
              { value: "Direct Client", title: "Customer" },
              { value: "Employee", title: "Employee" },
              { value: "Travel Agent", title: "Travel Agent" },
            ].map((role, index) => (
              <div className="col-sm-4" key={index}>
                <label className="block">
                  <input
                    type="checkbox"
                    className="checkbox_animated mx-2"
                    checked={formValues.role === role.value}
                    onChange={() =>
                      setFormValues({ ...formValues, role: role.value })
                    }
                  />
                  {role.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="form-group mb-0">
        <div className="checkbox p-0">
          <label className="d-block" htmlFor="checkbox2">
            <input
              className="checkbox_animated"
              id="checkbox2"
              type="checkbox"
              name="checked"
              checked={checked}
              onChange={(e) =>
                setFormValues({ ...formValues, checked: e.target.checked })
              }
            />
            Agree with
            <a className="ms-2" href={Href}>
              Privacy Policy
            </a>
          </label>
        </div>
        {role === "Travel Agent" && !step ? (
          <button
            className="btn btn-primary btn-block w-100"
            type="button"
            onClick={() => {
              if (formValues.password !== formValues.prePass) {
                toast.error("Password does not match");
                return;
              }
              setStep(true);
            }}
            disabled={buttonDisabled() || !checked}
          >
            Next
          </button>
        ) : (
          <>
            <ReCAPTCHA
              sitekey="6Lf-6WkrAAAAAMr1-cDSrTWvIuPFmwYhFdeykZmq"
              onChange={(e) => setRecaptchaToken(e)}
              onExpired={() => {
                setBotCaptcha(true);
              }}
            />
            <div className="d-flex justify-content-between">
              {step && (
                <button
                  className="btn btn-secondary btn-block w-48 px-5"
                  type="button"
                  onClick={() => setStep(false)}
                >
                  Cancel
                </button>
              )}
              <LoadingAuthButton
                {...{
                  classes: `btn btn-primary btn-block ${
                    role === "Travel Agent" && step ? "w-48 px-5" : "w-100"
                  }`,
                  types: "submit",
                  loading,
                  disabled:
                    loading || step
                      ? isTravelAgentProfileValid() || botCaptcha
                      : buttonDisabled() || !checked || botCaptcha,
                  title: step ? "Create" : "Create Account",
                }}
              />
            </div>
          </>
        )}
      </div>
      <h6 className="text-muted mt-4 or">Or signup with</h6>
      <SocialIcons />
      <p className="mt-4 mb-0">
        Already have an account?
        <Link className="ms-2" href="/login">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
