import type React from "react";

export default function Button({
  content,
  handleClick,
  classes,
  bg,
  text,
  icon,
  type = "button",
  disabled = false,
}: {
  content: string;
  handleClick?: () => void;
  classes?: string;
  bg?: string;
  text?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  return (
    <button
      onClick={handleClick}
      type={type}
      disabled={disabled}
      className={`${classes} hover:opacity-95 px-[40px]
       ${text ? text : "text-white"} ${bg ? bg : "bg-brand"}
       capitalize rounded-sm text-[18px] cursor-pointer py-[16px]
       flex items-center justify-center gap-4
       disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {icon}
      {content}
    </button>
  );
}
