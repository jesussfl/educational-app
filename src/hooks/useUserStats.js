import { useAuthContext } from "@contexts/auth.context";
import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import { useCustomMutation } from "@utils/useCustomMutation";

const useUserStats = () => {
  const { user, setUser } = useAuthContext();
  const { mutate } = useCustomMutation("user", updateUserMutation);

  const decreaseLives = () => {
    if (user && user.lives > 0) {
      mutate(
        {
          id: user.id,
          data: {
            lives: user.lives - 1,
          },
        },
        {
          onSuccess: () => {
            console.log("success");
          },
        }
      );
      setUser((prev) => {
        return { ...prev, lives: user.lives - 1 };
      });
    }
  };

  return {
    userLives: user?.lives,
    decreaseLives,
  };
};

export default useUserStats;
