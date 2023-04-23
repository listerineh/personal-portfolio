import React from "react";

const Title = ({ title }) => {
  return (
    <div className="px-10 md:px-15">
      <h3 className="text-2xl capitalize text-on-surface dark:text-on-surface-dark w-auto ">
        {title}
      </h3>
    </div>
  );
};

export default Title;
