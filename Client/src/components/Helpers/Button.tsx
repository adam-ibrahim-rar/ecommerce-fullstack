import type React from "react";

export default function Button({
  content,
  handleClick,
  classes,
  bg,
  text,
  icon,
}: {
  content: string;
  handleClick: () => void;
  classes?: string;
  bg?: string;
  text?: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={handleClick}
      className={` ${classes}  hover:opacity-95 px-[48px]
       ${text ? text : "text-white"} ${bg ? bg : "bg-secondary-two"}
      capitalize rounded-sm text-[18px] cursor-pointer py-[16px]  
          flex items-center justify-center gap-4`}
    >
      {icon}
      {content}
    </button>
  );
}
