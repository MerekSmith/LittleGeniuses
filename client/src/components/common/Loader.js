import React from "react";
import { CircularProgress } from "@material-ui/core";

export default function Loader() {
  return (
    <div style={{ textAlign: "center", margin: "40px 0" }}>
      <CircularProgress />
    </div>
  );
}
