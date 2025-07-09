import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import { usePaymentInputs } from "react-payment-inputs";
import creditCardType from "credit-card-type";
import { PaymentIcon, PaymentType } from "react-svg-credit-card-payment-icons";
import { BookingFormState } from "@/types/app/booking";

const WorldlineCard = ({
  booking,
  handlePaymentInfo,
  setErr,
}: {
  booking: BookingFormState;
  handlePaymentInfo: (key: string, value: string | number | boolean) => void;
  setErr: Dispatch<SetStateAction<string>>;
}) => {
  const { cardNumber, expirationDate, securityCode, country, zipCode } =
    booking.paymentInfo;
  const countryOptions = countryList()
    .getData()
    .map((country) => ({
      label: country.label,
      value: country.value,
    }));

  const formatCardCVC = (
    event: React.ChangeEvent<HTMLInputElement>,
    prefix?: number
  ) => {
    let input = event.target.value.replace(/\D/g, "");
    if (input.length > (prefix || 3)) {
      input = input.slice(0, prefix || 3);
    }
    return input;
  };
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();

  const [cardLogo, setCardLogo] = useState<string | null>(null);

  const handleCardNumberChange = (input: string) => {
    const detectedCard = creditCardType(input)[0];
    if (detectedCard) {
      setCardLogo(detectedCard.niceType);
    } else {
      setCardLogo(null);
    }
  };

  useEffect(() => {
    handleCardNumberChange(cardNumber);
  }, [cardNumber]);

  useEffect(() => {
    setErr(meta.error);
  }, [meta]);
  return (
    <div className="mx-5">
      <div className="theme-form border rounded-4">
        <div className="border-bottom px-4 py-3 fs-4">Card</div>
        <div className="p-4">
          <div id="cardnumber">
            <label>Card Number</label>
            <div className="d-flex align-items-center">
              <input
                className="form-control"
                value={cardNumber}
                {...getCardNumberProps({
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    handlePaymentInfo("cardNumber", e.target.value);
                  },
                })}
                maxLength={19}
                placeholder="1234 1234 1234 1234"
              />
              {cardNumber !== "" ? (
                <PaymentIcon
                  type={cardLogo as PaymentType}
                  format="logoBorder"
                  width={80}
                />
              ) : null}
            </div>
          </div>
          <div className="d-flex row mt-2">
            <div className="col-sm-6">
              <label>Expiration Date</label>
              <input
                value={expirationDate}
                className="form-control"
                {...getExpiryDateProps({
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    handlePaymentInfo("expirationDate", e.target.value);
                  },
                })}
                placeholder="MM/YY"
              />
            </div>
            <div className="col-sm-6">
              <label>Security Code</label>
              <input
                value={securityCode}
                {...getCVCProps({
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    handlePaymentInfo("securityCode", e.target.value);
                  },
                })}
                className="form-control"
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>
          <div className="d-flex row mt-2">
            <div className="col-sm-8">
              <label>Country</label>
              <Select
                placeholder="' Select Country..."
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    padding: "0.3rem 1rem",
                  }),
                }}
                options={countryOptions as any}
                value={countryOptions.filter(
                  (countryList) => countryList.value === country
                )}
                onChange={(e) => handlePaymentInfo("country", e.value)}
                formatOptionLabel={(e: any) => (
                  <div className="d-flex fs-6">
                    <img
                      src={`https://flagcdn.com/w20/${e.value.toLowerCase()}.png`}
                      alt={e.label}
                      style={{
                        width: "23px",
                        height: "18px",
                        marginRight: "10px",
                      }}
                    />
                    {e.label}
                  </div>
                )}
              />
            </div>
            <div className="col-sm-4">
              <label>Zip code</label>
              <input
                type="text"
                value={zipCode}
                maxLength={5}
                onChange={(e) =>
                  handlePaymentInfo("zipCode", formatCardCVC(e, 5))
                }
                className="form-control"
                placeholder="12345"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldlineCard;
