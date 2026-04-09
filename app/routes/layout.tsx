import React from "react";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="px-4 md:px-6 lg:px-12 xl:px-13 max-w-[1280px] mx-auto">
      <Outlet />
    </div>
  );
}
