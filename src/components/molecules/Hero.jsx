import React from "react";
import Title from "../atoms/Title";

const Hero = () => {
  return (
    <article className="w-full h-full">
      <div className="flex flex-col bg-custom-dark h-full">
        <Title title="Information" />
        <div className="border border-red-500 h-full m-10 max-w-full max-h-full">
          <div className="">test1</div>
          <div className="w-96 h-96 bg-green-50">test2</div>
          <div>test3</div>
          <div>test4</div>
        </div>
      </div>
    </article>
  );
};

export default Hero;
