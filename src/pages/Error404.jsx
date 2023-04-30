import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex h-screen">
      <pre className="m-auto">
        <h1 className="text-white text-5xl font-extralight">
          <span className="text-primary dark:text-primary-dark text-7xl font-bold">
            404
          </span>{" "}
          {":("}
        </h1>
        <h2 className="text-white mt-10 font-bold md:text-4xl sm:text-2xl">
          This page doesn't exist.
        </h2>
        <h2 className="text-white mt-5 font-extralight md:text-2xl sm:text-xl text-right">
          Please go{" "}
          <Link
            to="/"
            className="text-primary dark:text-primary-dark text-semibold"
          >
            home
          </Link>
        </h2>
      </pre>
    </div>
  );
};

export default Error404;
