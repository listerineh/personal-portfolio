const Error404 = () => {
  return (
    <div className="flex max-h-96 h-screen">
      <pre className="m-auto">
        <h1 className="text-white text-5xl font-semibold">
          <span className="text-indigo-600 text-7xl font-bold">404</span> {":("}
        </h1>
        <h2 className="text-white mt-10 font-bold md:text-4xl sm:text-2xl">This page doesn't exist.</h2>
      </pre>
    </div>
  );
};

export default Error404;
