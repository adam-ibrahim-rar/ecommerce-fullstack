export default function Frame({
  title,
  description,
  functionality,
  counter,
}: {
  title: string;
  description: string;
  functionality?: React.ReactNode;
  counter?: React.ReactNode;
}) {
  return (
    <div className="h-[103px] space-y-5">
      <p
        className="h-[40px] 
  px-2  border-l-12 font-semibold text-secondary-two capitalize flex items-center"
      >
        {title}
      </p>
      <div className="flex justify-between h-12 items-center">
        <p className=" text-3xl flex gap-20 items-center font-bold capitalize">
          {description}
          {counter && counter}
        </p>

        {functionality}
      </div>
    </div>
  );
}
