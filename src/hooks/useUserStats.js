import { useEffect } from "react";
import { useAuthContext } from "@contexts/auth.context";
import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import { useCustomMutation } from "@utils/useCustomMutation";
import io from "socket.io-client";

const MAX_LIVES = 6;
const NEXT_REGENERATION_INTERVAL = 4 * 60 * 60 * 1000;
const useUserStats = () => {
  const { user, setUser } = useAuthContext();
  const { mutate } = useCustomMutation("user", updateUserMutation);
  useEffect(() => {
    const socket = io("http://172.16.0.2:1337");
    socket.on("updateLives", (data) => {
      updateUser({
        ...data,
      });
    });
  }, []);
  const restartStreak = () => {
    if (user) {
      mutate(
        {
          id: user.id,
          data: {
            streak: 0,
          },
        },
        {
          onSuccess: () => {
            console.log("success");
          },
        }
      );
      setUser((prev) => {
        return { ...prev, streak: 0 };
      });
    }
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

    setUser((prev) => {
      return { ...prev, last_completed_lesson_date: new Date() };
    });
  };
  const increaseStreak = () => {
    if (user) {
      const now = new Date();

      // Si la ultima leccion del usuario es hoy no se aumenta la racha pero si no entonces se aumenta la racha
      if (user.last_completed_lesson_date && isSameDay(user.last_completed_lesson_date, now)) {
        return;
      } else if (user.streak_start_date === null) {
        mutate({
          id: user.id,
          data: {
            streak_days: 1,
            streak_start_date: now,
          },
        });

        setUser((prev) => {
          return { ...prev, streak_days: 1, streak_start_date: now };
        });
      } else {
        mutate({
          id: user.id,
          data: {
            streak_days: user.streak_days + 1,
          },
        });

        setUser((prev) => {
          return { ...prev, streak_days: user.streak_days + 1 };
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
  const setNextDateRegeneration = () => {
    if (user.lives === MAX_LIVES) {
      const next_life_regeneration = new Date(new Date().getTime() + NEXT_REGENERATION_INTERVAL);

      mutate({
        id: user.id,
        data: {
          next_life_regeneration,
        },
      });

      updateUser({
        next_life_regeneration,
      });
    }
  };
  const decreaseLives = () => {
    setNextDateRegeneration();
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
    if (user) {
      mutate(
        {
          id: user.id,
          data: {
            lives: user.lives + quantity,
          },
        },
        {
          onSuccess: () => {
            console.log("success");
          },
        }
      );
      setUser((prev) => {
        return { ...prev, lives: user.lives + quantity };
      });
    }
  };

  const updateUser = (data) => {
    setUser((prev) => {
      return { ...prev, ...data };
    });
  };
  return {
    userLives: user?.lives,
    decreaseLives,
    increaseLives,
    restartStreak,
    increaseStreak,
    updateLastCompletedLessonDate,
  };
};

export default useUserStats;
