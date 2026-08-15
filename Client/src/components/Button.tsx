export default function Button({
  content,
  handleClick,
  classes,
}: {
  content: string;
  handleClick: () => void;
  classes?: string;
}) {
  return (
    <button
      onClick={handleClick}
      className={`bg-secondary-two hover:opacity-95 px-[48px] capitalize rounded-sm text-[18px] cursor-pointer py-[16px] text-white  text-center ${classes}`}
    >
      {content}
    </button>
  );
}
