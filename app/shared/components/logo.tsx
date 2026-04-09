import { Link } from "react-router";
import logo from "~/shared/assets/images/logo.svg";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/">
      <img src={logo} alt="Logo" className={className} />
    </Link>
  );
};
