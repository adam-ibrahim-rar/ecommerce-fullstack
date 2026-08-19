type SuccessToastProps = {
  message: string;
};

export default function SuccessToast({
  message,
}: SuccessToastProps) {
  return (
    <div
      className="
        fixed
        top-6
        right-6
        z-50
        flex
        items-center
        gap-3
        rounded-lg
        bg-green-500
        px-5
        py-3
        text-white
        shadow-lg
        animate-[slideIn_0.3s_ease-out]
      "
    >
      <span className="text-xl">✓</span>

      <p className="font-medium">
        {message}
      </p>
    </div>
  );
}