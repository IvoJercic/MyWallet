import React from "react";

function ErrorMessage({ variant = "info", children }) {
  return (
    <div>
      {children}
    </div>

  );
}

export default ErrorMessage;