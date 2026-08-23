import React from "react";

export default function Arrow({
  icon,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="size-9 flex items-center justify-center rounded-full
      bg-gray-300 transition-colors duration-300
      enabled:cursor-pointer enabled:hover:bg-gray-400
      disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <p className="text-2xl font-bold">{icon}</p>
    </button>
  );
}
