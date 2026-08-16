import { Link } from "react-router-dom";
import PathLocation from "../components/PathLocation";

export default function NotFound() {
  return (
    <main className=" flex flex-col items-center justify-center w-[1170px] mx-auto">
      <div className="self-start">
        <PathLocation/>
      </div>
      <div className="text-center">
        <h1 className="text-[120px] font-bold text-secondary-two leading-none">
          404
        </h1>

        <h2 className="mt-4 text-4xl font-semibold text-black">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-500 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It may have been
          moved or deleted.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/"
            className="bg-secondary-two hover:bg-secondary-two text-white px-6 py-3 rounded-md transition"
          >
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
