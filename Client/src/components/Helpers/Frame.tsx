export default function Frame({
  title,
  description,
  functionality,
  counter,
}: {
  title: string;
  description?: string;
  functionality?: React.ReactNode;
  counter?: React.ReactNode;
}) {
  return (
    <div className="max-h-[103px] h-fit space-y-5">
      <p
        className="h-[40px]  gap-3
     font-semibold text-brand capitalize flex items-center"
      >
        <div className="h-[40px] w-[20px] rounded-[5px] bg-brand"></div>
        {title}
      </p>
      {(description || functionality) && (
        <div className="flex justify-between h-12 items-center">
          <p className=" text-3xl flex gap-20 items-center font-bold capitalize">
            {description}
            {counter && counter}
          </p>

          {functionality}
        </div>
      )}
    </div>
  );
}
