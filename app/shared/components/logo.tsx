import { Link } from "react-router";
import logo from "~/shared/assets/images/logo.svg";

export const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="Logo" />
    </Link>
  );
};
