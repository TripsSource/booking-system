export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const httpsUrlPattern =
  /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const formatInsuranceNumber = (input: string, value: string) => {
  const digits = input.replace(/\D/g, "");
  const part1 = digits.substring(0, 3);
  const part2 = digits.substring(3, 7);
  const part3 = digits.substring(7, 11);
  const part4 = digits.substring(11, 13);
  if (value === "..." || input === "") return "";
  else return `${part1}.${part2}.${part3}.${part4}`;
};

export const IntegerNumber = (val: number | string, num?: number) => {
  if (num) {
    return Math.max(0, Math.min(num, Number(val)));
  } else {
    return Math.max(0, Number(val));
  }
};
