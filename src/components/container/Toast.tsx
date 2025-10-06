import React from "react";
import { Toaster, ToasterProps } from "sonner";

const Toast = ({ ...props }: ToasterProps) => {
  const theme = "system";

  return (
    <Toaster
      theme={theme}
      className="toaster group"
      style={{
        background: "var(--popover)",
        color: "var(--popover-foreground)",
        borderColor: "var(--border)",
      }}
      {...props}
    />
  );
};

export default Toast;
