import React from "react";
import { Alert } from "react-bootstrap";

function ErrorMessage({ variant = "info", children }) {
  return (
    <div>
      {children}
    </div>

  );
}

export default ErrorMessage;