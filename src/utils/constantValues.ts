import countryList from "react-select-country-list";
export const countryOptions = countryList()
  .getData()
  .map((country) => ({
    label: country.label,
    value: country.value,
  }));
