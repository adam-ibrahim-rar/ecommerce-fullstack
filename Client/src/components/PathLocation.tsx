import { Link, useLocation } from "react-router-dom";

export default function PathLocation() {
  const { pathname } = useLocation();

  const paths = pathname.split("/").filter(Boolean);//avoid the / 

  return (
    <div className="flex gap-3 mt-8 mb-4 text-[14px]">
      <Link to="/" className="text-one font-medium text-lg">
        Home
      </Link>

      {paths.map((path, index) => (
        <div key={path} className="flex gap-3">
          <span className="text-one font-medium text-lg">/</span>

          {index === paths.length - 1 ? (
            <span className="capitalize font-medium text-lg">
              {path}
            </span>
          ) : (
            <Link
              to={`/${path}`}
              className="text-one capitalize font-medium text-lg"
            >
              {path}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}