import React from "react";
import { Alert } from "@strapi/design-system";
export default function CustomAlert({ response }) {
  console.log(response);
  return (
    <Alert
      style={{ position: "absolute", top: "45px", left: "50%", transform: "translateX(-15%)", width: "450px" }}
      closeLabel="Close"
      // title={response.title}
      variant={response.type}
    >
      {response.message}
    </Alert>
  );
}
