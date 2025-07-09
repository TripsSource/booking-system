import * as Icon from "react-feather";

interface FeatherIconType {
  iconName: keyof typeof Icon;
  className?: string;
  onClick?: () => void;
}

const DynamicFeatherIcon: React.FC<FeatherIconType> = ({
  iconName,
  className,
  onClick,
}) => {
  const IconComp = Icon[iconName];
  return <IconComp className={className} onClick={onClick} />;
};

export default DynamicFeatherIcon;
