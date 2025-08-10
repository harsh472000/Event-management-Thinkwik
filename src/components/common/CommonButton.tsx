import React from "react";
import "@/styles/commonButton.css";

interface CommonButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger" | "ghost";
  size?: "sm" | "md";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "", 
}) => {
  const classes = ["btn"];
  if (variant !== "primary") classes.push(variant);
  if (size === "sm") classes.push("sm");
  if (className) classes.push(className); 

  return (
    <button
      type={type}
      className={classes.join(" ")}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CommonButton;
