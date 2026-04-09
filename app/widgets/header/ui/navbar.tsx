import { Link } from "react-router";
import { Button } from "~/shared/components/ui/button";
import { links } from "../model/consts/links";
import { LinkItem } from "./link-item";

export const Navbar = () => {
  const { faq, tariffs, blog, download, account } = links;

  return (
    <nav className="hidden xl:block">
      <ul className="flex items-center gap-4">
        <LinkItem to={faq.href}>{faq.title}</LinkItem>
        <LinkItem to={tariffs.href}>{tariffs.title}</LinkItem>
        <Button variant="primary" asChild className="w-[176px] h-[48px]">
          <Link
            to={download.href}
            className="text-xl text-contrast font-second"
          >
            {download.title}
          </Link>
        </Button>
        <LinkItem to={blog.href}>{blog.title}</LinkItem>
        <Button
          variant="primary_outline"
          asChild
          className="w-[176px] h-[48px]"
        >
          <Link to={account.href} className="text-contrast font-second text-xl">
            {account.title}
          </Link>
        </Button>
      </ul>
    </nav>
  );
};
