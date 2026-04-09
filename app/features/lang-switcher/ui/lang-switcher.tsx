import { useState } from "react";
import chevron from "~/shared/assets/icons/svg/chevron.svg";
import { Button } from "~/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";

export const LangSwitcher = () => {
  const [lang, setLang] = useState<"ру" | "en">("ру");
  const handleLang = (lang: "ру" | "en") => {
    setLang(lang);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="icon"
          className="w-16 h-12 flex items-center justify-between cursor-pointer"
        >
          <span className="text-xl font-second uppercase text-contrast">
            {lang}
          </span>
          <img src={chevron} alt="Menu" className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-additional-grey-2">
        <DropdownMenuItem onClick={() => handleLang("en")}>
          <span className="text-xl font-second uppercase text-contrast">
            en
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLang("ру")}>
          <span className="text-xl font-second uppercase text-contrast">
            ру
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
