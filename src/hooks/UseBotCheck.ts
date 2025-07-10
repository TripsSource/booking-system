import { useEffect, useState } from "react";
import { AppDispatch } from "@/store";
import { accountBotCheckAction } from "@/store/auth";
import { useDispatch } from "react-redux";

function UseBotCheck() {
  const dispatch = useDispatch<AppDispatch>();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [botCaptcha, setBotCaptcha] = useState<boolean>(false);
  const botCheck = async () => {
    if (recaptchaToken && recaptchaToken.length > 0) {
      const { payload } = await dispatch(accountBotCheckAction(recaptchaToken));
      if (payload?.["message"] === "Success") {
        setBotCaptcha(false);
        console.log(payload);
      } else {
        console.log(payload);
      }
    }
  };

  useEffect(() => {
    if (recaptchaToken && recaptchaToken.length > 0) botCheck();
  }, [recaptchaToken]);

  return [botCaptcha, setRecaptchaToken, setBotCaptcha] as const;
}

export default UseBotCheck;
