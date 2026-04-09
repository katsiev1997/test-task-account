import { Outlet } from "react-router";
import { Footer } from "~/widgets/footer";
import { Header } from "~/widgets/header";

export default function Layout() {
  return (
    <div className="px-4 md:px-6 lg:px-12 xl:px-13 max-w-[1280px] mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
