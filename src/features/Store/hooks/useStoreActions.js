import { ECONOMY } from "@config/economy";
import useAuthStore from "@stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { query } from "@utils/graphql";
import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import { ToastAndroid } from "react-native";
import { STORE_ITEM_NAMES } from "../config/store-items";
import { useLivesStore } from "@stores/useLivesStore";

const useStoreActions = () => {
  const { user, updateUser } = useAuthStore();
  const { setLastLifeRegenerationTime } = useLivesStore();

  const { mutate: buy } = useMutation((data) => query(updateUserMutation, data));

  const buyItem = (price, name) => {
    switch (name) {
      case STORE_ITEM_NAMES.fullRestorer:
        buyFullRestorer(price);
        break;

      case STORE_ITEM_NAMES.oneLive:
        buyOneLive(price);
        break;

      case STORE_ITEM_NAMES.twoLives:
        buyTwoLives(price);
        break;

      case STORE_ITEM_NAMES.streakShield:
        buyStreakShield(price);
        break;

      case STORE_ITEM_NAMES.basicBox:
        buyBasicBox(price);
        break;
      default:
        break;
    }
  };

  const buyFullRestorer = (price) => {
    buy(
      {
        id: user.id,
        data: {
          lives: ECONOMY.MAX_USER_LIVES,
          money: user.money - price,
          first_life_lost_date: null,
        },
      },
      {
        onSuccess: () => {
          updateUser({ lives: ECONOMY.MAX_USER_LIVES, money: user.money - price, first_life_lost_date: null });
          ToastAndroid.show(`Has recargado todas tus vidas`, ToastAndroid.LONG);
        },
      }
    );
  };

  const buyOneLive = (price) => {
    buy(
      {
        id: user.id,
        data: {
          lives: user.lives + 1,
          money: user.money - price,
          first_life_lost_date: user.lives + 1 === ECONOMY.MAX_USER_LIVES ? null : new Date(),
        },
      },
      {
        onSuccess: () => {
          if (user.lives + 1 === ECONOMY.MAX_USER_LIVES) {
            updateUser({ lives: user.lives + 1, money: user.money - price, first_life_lost_date: null });
            ToastAndroid.show(`Has recargado todas tus vidas`, ToastAndroid.LONG);

            return;
          }
          updateUser({ lives: user.lives + 1, money: user.money - price });
          ToastAndroid.show(`Has recargado una de tus vidas`, ToastAndroid.LONG);
        },
      }
    );
  };

  const buyTwoLives = (price) => {
    buy(
      {
        id: user.id,
        data: {
          lives: user.lives + 2,
          money: user.money - price,
          first_life_lost_date: user.lives + 2 === ECONOMY.MAX_USER_LIVES ? null : new Date(),
        },
      },
      {
        onSuccess: () => {
          if (user.lives + 2 === ECONOMY.MAX_USER_LIVES) {
            updateUser({ lives: user.lives + 2, money: user.money - price, first_life_lost_date: null });
            ToastAndroid.show(`Has recargado todas tus vidas`, ToastAndroid.LONG);
          }
          updateUser({ lives: user.lives + 2, money: user.money - price });
          ToastAndroid.show(`Has recargado dos de tus vidas`, ToastAndroid.LONG);
        },
      }
    );
  };

  const buyStreakShield = (price) => {
    console.log(user.streak_shields);
    if (user.streak_shields === ECONOMY.MAX_USER_STREAK_SHIELDS) {
      return;
    }

    buy(
      {
        id: user.id,
        data: {
          money: user.money - price,
          streak_shields: user.streak_shields + 1,
        },
      },
      {
        onSuccess: () => {
          updateUser({ money: user.money - price, streak_shields: user.streak_shields + 1 });
          ToastAndroid.show(`Has comprado un escudo de racha`, ToastAndroid.LONG);
        },
      }
    );
  };
  const buyBasicBox = (price) => {
    buy(
      {
        id: user.id,
        data: {
          money: user.money - price,
        },
      },
      {
        onSuccess: () => {
          updateUser({ money: user.money - price });
        },
      }
    );
  };

  return { buyItem };
};

export default useStoreActions;
