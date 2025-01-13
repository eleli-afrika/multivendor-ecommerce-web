import { IconType } from "react-icons";

interface IconProps {
  icon: IconType;
  size?: string;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = "8xl",
  color = "primary-orange",
}) => {
  return (
    <div className={`text-${color} text-${size}`}>
      <IconComponent />
    </div>
  );
};

export default Icon;
