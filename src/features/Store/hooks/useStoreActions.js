import useAuthStore from "@stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { query } from "@utils/graphql";
import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import { ToastAndroid } from "react-native";

const useStoreActions = () => {
  const { user, updateUser } = useAuthStore();
  const { mutate } = useMutation((data) => query(updateUserMutation, data));

  const buyItem = (price) => {
    if (user.money < price) {
      return;
    }

    mutate(
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

  const buyRefillLives = (price) => {
    if (user.money < price) {
      return;
    }
    const livesToRefill = 6 - user.lives;

    mutate(
      {
        id: user.id,
        data: {
          lives: user.lives + livesToRefill,
          money: user.money - price,
        },
      },
      {
        onSuccess: () => {
          updateUser({ lives: user.lives + livesToRefill, money: user.money - price });

          ToastAndroid.show(`Has comprado ${livesToRefill} vidas`, ToastAndroid.LONG);
        },
      }
    );
  };
  return { buyItem, buyRefillLives };
};

export default useStoreActions;
