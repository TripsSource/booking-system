import EmailChange from "@/components/setting/EmailChange";
import PersonalInformation from "@/components/setting/PersonalInformation";

const Setting = () => {
  return (
    <div className="container-fluid">
      <PersonalInformation />
      <EmailChange />
    </div>
  );
};

export default Setting;
