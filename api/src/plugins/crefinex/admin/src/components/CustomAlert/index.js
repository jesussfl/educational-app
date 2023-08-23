import React from "react";
import { Alert } from "@strapi/design-system";
export default function CustomAlert({ data }) {
  return (
    <Alert
      style={{ position: "absolute", top: "45px", left: "50%", transform: "translateX(-15%)", width: "450px" }}
      closeLabel="Close"
      // title={response.title}
      variant={data.type}
    >
      {data.message}
    </Alert>
  );
}
