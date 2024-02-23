import { useEffect } from "react";

import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import { useMutation } from "@tanstack/react-query";
import { query } from "@utils/graphql";
// import Midnight from "react-native-midnight";
import useAuthStore from "@stores/useAuthStore";
import { ECONOMY } from "@config/economy";
import { useLivesStore } from "@stores/useLivesStore";

const MAX_LIVES = 6;
const NEXT_REGENERATION_INTERVAL = 4 * 60 * 60 * 1000;
const useUserStats = () => {
  const { user, updateUser } = useAuthStore();
  const { setLastLifeRegenerationTime } = useLivesStore();
  const { mutate } = useMutation((data) => query(updateUserMutation, data));

  const restartStreak = () => {
    mutate(
      {
        id: user.id,
        data: {
          streak_start_date: null,
          streak_days: 0,
        },
      },
      {
        onSuccess: () => {
          console.log("success");
        },
      }
    );
    updateUser({ streak_days: 0, streak_start_date: null });
  };
  const updateLastCompletedLessonDate = () => {
    if (user) {
      mutate(
        {
          id: user.id,
          data: {
            last_completed_lesson_date: new Date(),
          },
        },
        {
          onSuccess: () => {
            console.log("success");
          },
        }
      );
    }

    updateUser({ last_completed_lesson_date: new Date() });
  };
  const increaseStreak = () => {
    if (user) {
      const now = new Date();

      // Si la ultima leccion del usuario es hoy no se aumenta la racha pero si no entonces se aumenta la racha
      if (user.last_completed_lesson_date && isSameDay(user.last_completed_lesson_date, now) && user.streak_start_date) {
        return;
      } else if (user.streak_start_date === null) {
        mutate({
          id: user.id,
          data: {
            streak_days: 1,
            streak_start_date: now,
            last_completed_lesson_date: now,
          },
        });
        updateUser({ streak_days: 1, streak_start_date: now, last_completed_lesson_date: now });
      } else {
        console.log("else");
        mutate({
          id: user.id,
          data: {
            streak_days: user.streak_days + 1,
            last_completed_lesson_date: now,
          },
        });

        updateUser({
          streak_days: user.streak_days + 1,
          last_completed_lesson_date: now,
        });
      }
    }
  };
  function isSameDay(date1, date2) {
    if (!date1 || !date2) {
      return false;
    }

    let date1Clone = new Date(date1);
    let date2Clone = new Date(date2);

    return (
      date1Clone.getDate() === date2Clone.getDate() && date1Clone.getMonth() === date2Clone.getMonth() && date1Clone.getFullYear() === date2Clone.getFullYear()
    );
  }

  const decreaseLives = () => {
    if (user.lives === ECONOMY.MAX_USER_LIVES && user.lives > 0) {
      mutate({
        id: user.id,
        data: {
          lives: user.lives - 1,
          first_life_lost_date: new Date(),
        },
      });

      updateUser({
        lives: user.lives - 1,
        first_life_lost_date: new Date(),
      });

      return;
    }

    if (user.lives > 0) {
      const lives = user.lives - 1;

      mutate({
        id: user.id,
        data: {
          lives,
        },
      });

      updateUser({
        lives,
      });
    }
  };
  const increaseLives = (quantity) => {
    if (user.lives + quantity >= ECONOMY.MAX_USER_LIVES) {
      mutate({
        id: user.id,
        data: {
          lives: user.lives + quantity,
          first_life_lost_date: null,
        },
      });

      updateUser({
        lives: user.lives + quantity,
        first_life_lost_date: null,
      });

      return;
    }
    if (user.lives + quantity < ECONOMY.MAX_USER_LIVES) {
      mutate({
        id: user.id,
        data: {
          lives: user.lives + quantity,
        },
      });
      setLastLifeRegenerationTime(new Date().getTime());

      setTimeout(() => {
        updateUser({
          lives: user.lives + quantity,
        });
      }, 1100); // 2000 milisegundos = 2 segundos
    }
  };
  const increaseMoney = (quantity) => {
    const money = user.money + quantity;
    if (user) {
      mutate({
        id: user.id,
        data: {
          money,
        },
      });
      updateUser({
        money,
      });
    }
  };
  const decreaseMoney = (quantity) => {
    const money = user.money - quantity;
    if (user) {
      mutate({
        id: user.id,
        data: {
          money,
        },
      });
      updateUser({
        money,
      });
    }
  };

  return {
    userLives: user?.lives,
    decreaseLives,
    increaseLives,
    restartStreak,
    increaseStreak,
    increaseMoney,
    decreaseMoney,
    updateLastCompletedLessonDate,
  };
};

export default useUserStats;
