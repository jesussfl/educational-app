import React from "react";
import useAuthStore from "@stores/useAuthStore";

const PurchaseHeartsFiller = () => {
  const { user } = useAuthStore();

  console.log(user);

  return null; // O cualquier otro contenido que necesites
};

export default PurchaseHeartsFiller;
