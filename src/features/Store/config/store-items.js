import React from "react";
import PurchaseHeartsFiller from "../data/purchase-hearts-filler";
import { DollarCircle, HeartAdd } from "iconsax-react-native";
import { Colors } from "@utils/Theme";

export const STORE_ITEMS = [
  {
    title: "Vidas",
    data: [
      {
        name: "fullRestorer",
        label: "Restaurador de Vidas",
        description: "Vuelve a tener todas tus vidas para seguir aprendiendo.",
        price: 400,
        icon: <HeartAdd size={20} color={Colors.gray_400} />,
      },
      {
        name: "twoLives",
        label: "Dos vidas",
        description: "Recarga dos de tus vidas.",
        price: 200,
        icon: <HeartAdd size={20} color={Colors.gray_400} />,
      },
      {
        name: "oneLive",
        label: "Una vida",
        description: "Recarga una de tus vidas.",
        price: 100,
        icon: <HeartAdd size={20} color={Colors.gray_400} />,
      },
    ],
  },
  {
    title: "Racha",
    data: [
      {
        name: "streakShield",
        label: "Escudo de Racha",
        description: "Protege tu racha si estarás ausente un diá. Puedes llevar maximo 3 escudos de racha.",
        price: 800,
        icon: <DollarCircle size={20} color={Colors.gray_400} />,
      },
    ],
  },
  {
    title: "Cajas",
    data: [
      {
        name: "basicBox",
        label: "Caja Básica",
        description: "Esta caja puede contener hasta 600 monedas",
        price: 300,
        icon: <DollarCircle size={20} color={Colors.gray_400} />,
      },
    ],
  },
];

export const STORE_ITEM_NAMES = {
  fullRestorer: "fullRestorer",
  oneLive: "oneLive",
  twoLives: "twoLives",
  lifeSaver: "lifeSaver",
  streakShield: "streakShield",
  basicBox: "basicBox",
};
