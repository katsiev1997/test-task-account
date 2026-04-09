import { Button } from "~/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/shared/components/ui/sheet";
import burger from "~/shared/assets/icons/svg/burger.svg";

export const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="icon" className="size-11 xl:hidden">
          <img src={burger} alt="Menu" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-additional-grey-2 border-none">
        <SheetHeader>
          <SheetTitle>Mobile Menu</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
