import React from "react";
import { Link } from "react-router";

export const LinkItem = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <li className="group w-[167px] text-center">
      <Link
        to={to}
        className="text-contrast font-second text-xl group-hover:text-accent-primary transition-all duration-300"
      >
        {children}
      </Link>
    </li>
  );
};
