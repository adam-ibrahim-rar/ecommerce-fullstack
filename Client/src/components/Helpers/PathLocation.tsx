import { Link, useLocation } from "react-router-dom";

type PathLocationProps = {
  override?: string; // اسم مخصص يتعرض بدل آخر جزء من الرابط
};

export default function PathLocation({ override }: PathLocationProps) {
  const { pathname } = useLocation();

  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="flex gap-3 mt-8 mb-4 text-[14px]">
      <Link to="/" className="text-one font-medium text-lg">
        Home
      </Link>

      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const accumulatedPath = "/" + paths.slice(0, index + 1).join("/");
        const label =
          isLast && override ? override : path.split("-").join(" ");

        return (
          <div key={accumulatedPath} className="flex gap-3">
            <span className="text-one font-medium text-lg">/</span>

            {isLast ? (
              <span className="capitalize font-medium text-lg">{label}</span>
            ) : (
              <Link
                to={accumulatedPath}
                className="text-one capitalize font-medium text-lg"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}