import React, { useEffect } from "react";
import { redirect } from "react-router-dom";

const SlideShow = () => {
  const [selected, setSelected] = React.useState(0);
  const items = [
    { text: "Home", section: "home-section" },
    { text: "Skills", section: "skills-section" },
    { text: "Projects", section: "projects-section" },
    { text: "Contact me", section: "contacts-section" },
  ];

  useEffect(() => {
    const element = document.getElementById(items[selected].section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [selected]);

  return (
    <div className="fixed z-20 top-28 left-[calc(50vw-180px)]">
      <div className="bg-secondary-variant p-3 rounded-full">
        <ul className="flex items-center gap-x-6 justify-center text-black text-sm">
          {items.map((item, index) => (
            <li
              key={index}
              className={`${
                selected === index && "bg-secondary rounded-full text-white"
              } text-sm cursor-pointer p-2`}
              onClick={() => setSelected(index)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SlideShow;
