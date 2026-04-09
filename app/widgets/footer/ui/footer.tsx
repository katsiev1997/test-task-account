import { Link } from "react-router";
import telegram from "~/shared/assets/icons/svg/telegram.svg";
import { Logo } from "~/shared/components/logo";
import { cn } from "~/shared/lib/utils";
import { download } from "../model/consts/download";
import { links } from "../model/consts/links";
import { payments } from "../model/consts/payments";

const linkClassName =
  "font-second text-xl leading-[100%] text-contrast hover:text-accent-primary transition-colors";

const titleClassName =
  "font-family text-2xl uppercase leading-[100%] text-additional-grey-1 text-center";
export const Footer = () => {
  return (
    <footer className="border border-b-0 border-additional-grey-2 rounded-t-xl pt-10 px-0 pb-6 flex flex-col gap-6">
      <div className="px-4 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="flex flex-col gap-4 md:w-[154px] lg:w-[184px] xl:w-[246px]">
              <Logo className="w-auto h-6" />
              <ul>
                {links.map((link) => (
                  <li key={link.to} className="h-12 flex items-center">
                    <Link to={link.to} className={linkClassName}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 lg:w-[184px] xl:w-[246px]">
              <h4 className={titleClassName}>Скачать</h4>
              <ul>
                {download.map((item) => (
                  <li key={item.to} className="h-12 flex items-center">
                    <Link
                      to={item.to}
                      className={cn("flex gap-2", linkClassName)}
                    >
                      <img src={item.icon} alt={item.title} /> {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 md:w-[154px] lg:w-[184px] xl:w-[246px]">
              <h4 className={cn(titleClassName, "text-start")}>
                Способы оплаты
              </h4>
              <ul>
                {payments.map((item) => (
                  <li key={item.title} className="h-12 flex items-center">
                    <span className={cn("flex gap-2", linkClassName)}>
                      <img src={item.icon} alt={item.title} /> {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 md:w-[154px] lg:w-[184px] xl:w-[246px]">
              <h4 className={cn(titleClassName, "text-start")}>
                поддержка 24/7
              </h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <button className="flex justify-center items-center gap-4 bg-contrast w-[152px] h-12 rounded-full">
                    <span className="text-xl font-second leading-[100%] text-[#1e2025]">
                      Telegram
                    </span>
                    <img src={telegram} alt="Telegram" />
                  </button>
                </li>
                <li className="flex flex-col">
                  <Link
                    to="/"
                    className="text-contrast leading-[100%] text-xl font-family h-10 flex items-center"
                  >
                    Публичная оферта
                  </Link>
                  <Link
                    to="/"
                    className="text-contrast leading-[100%] text-xl font-family h-10 flex items-center"
                  >
                    Пользовательское соглашение
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-contrast leading-[100%] text-xl font-family text-center">
        © 2025 Wolle Development Limited. <br />
        Все права защищены.
      </div>
    </footer>
  );
};
