import { LangSwitcher } from "~/features/lang-switcher";
import { Logo } from "~/shared/components/logo";
import { MobileMenu } from "./mobile-menu";
import { Navbar } from "./navbar";

export const Header = () => {
  return (
    <div className="h-20 flex items-center justify-between">
      <MobileMenu />
      <Logo />
      <Navbar />
      <LangSwitcher />
    </div>
  );
};
