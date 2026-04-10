import { Button } from "~/shared/components/ui/button";
import { Dialog, DialogContent } from "~/shared/components/ui/dialog";
import { Drawer, DrawerContent } from "~/shared/components/ui/drawer";
import { useIsMobile } from "~/shared/hooks/use-is-mobile";
import { cn } from "~/shared/lib/utils";
import { cards } from "../model/consts/cards";

type Card = (typeof cards)[number];

const ResultContent = ({
  winningCard,
  onClose,
}: {
  winningCard: Card | null;
  onClose: () => void;
}) => {
  if (!winningCard) return null;

  const { title, description, image } = winningCard;

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="font-semibold text-[44px] font-family text-contrast leading-[100%] uppercase">
        Поздравляем! <br /> Вы выиграли
      </h2>
      <div className="flex items-center justify-center">
        <p className="text-2xl font-semibold font-family text-contrast leading-[100%] uppercase">
          {title}
        </p>
        <img src={image} alt={title} className="" />
        <p className="font-second text-[32px] text-contrast leading-[100%]">
          {description}
        </p>
      </div>
      <p className="font-semibold font-family text-contrast leading-[100%] text-2xl">
        Активируйте в течение 24 часов
      </p>
      <Button
        variant="primary"
        className="h-12 w-full text-[32px] uppercase font-family font-semibold leading-[100%] rounded-full"
        onClick={onClose}
      >
        Продолжить
      </Button>
    </div>
  );
};

export const FortuneResultModal = ({
  isOpen,
  onOpenChange,
  winningCard,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  winningCard: Card | null;
}) => {
  const isMobile = useIsMobile();

  const content = (
    <ResultContent
      winningCard={winningCard}
      onClose={() => onOpenChange(false)}
    />
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-[#1e2025] border-none py-8 px-6">
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "bg-[#1e2025] rounded-[28px] w-[476px] py-8 px-6",
          "shadow-[0_4px_4px_0_rgba(0,0,0,0.3),0_8px_12px_6px_rgba(0,0,0,0.15)]",
        )}
      >
        {content}
      </DialogContent>
    </Dialog>
  );
};
