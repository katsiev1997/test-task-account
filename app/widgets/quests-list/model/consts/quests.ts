import share from "~/shared/assets/icons/svg/share.svg";
import play from "~/shared/assets/icons/svg/play.svg";
import telegram from "~/shared/assets/icons/svg/telegram.svg";

export type Quest = {
  id: number;
  done: boolean;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon?: string;
};

export const quests: Quest[] = [
  {
    id: 1,
    done: false,
    title: "оставь отзыв",
    description:
      "Поделитесь своим мнением о HiroVPN и получите 3 дня VPN бесплатно!",
    buttonText: "Оставить отзыв",
  },
  {
    id: 2,
    done: false,
    title: "Поделиться с Друзьями",
    description: "Пригласите друга в HiroVPN и получите 1 день VPN бесплатно!",
    buttonText: "поделиться",
    buttonIcon: share,
  },
  {
    id: 3,
    done: false,
    title: "Поддержите нас лайками",
    description:
      "Поставьте лайки 5 комментариям, с которыми вы согласны, и мы подарим вам 2 дня VPN бесплатно!",
    buttonText: "поддержать",
    buttonIcon: play,
  },
  {
    id: 4,
    done: false,
    title: "Оцени нас в Google Картах",
    description: "Поделись впечатлением и получи 1 день VPN в подарок!",
    buttonText: "оценить",
  },
  {
    id: 5,
    done: false,
    title: "Оцени нас в ЯНДЕКС Картах",
    description: "Поделись впечатлением и получи 1 день VPN в подарок!",
    buttonText: "оценить",
  },
  {
    id: 6,
    done: false,
    title: "Подписаться на TG-канал ",
    description:
      "Подпишитесь на канал HIroVPN - получайте новости и апдейты самыми первыми, а так же 1 день VPN бесплатно!",
    buttonText: "подписаться",
    buttonIcon: telegram,
  },
];
