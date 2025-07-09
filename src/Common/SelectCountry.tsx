import { countryOptions } from "@/utils/constantValues";
import React from "react";
import Select from "react-select";

export const SelectCountry = ({
  param,
  disabled,
  handleParam,
}: {
  param: string;
  disabled?: boolean;
  handleParam: (param: string) => void;
}) => {
  return (
    <Select
      placeholder=" Select Country..."
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          padding: "0.3rem 0.5rem",
        }),
      }}
      options={countryOptions as { label: string; value: string }[]}
      value={countryOptions.filter(
        (countryList) => countryList.value === param
      )}
      onChange={(e) => handleParam(e.value)}
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
      isDisabled={disabled}
    />
  );
};
