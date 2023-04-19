const Link = ({ text, section, handleOpen }) => {
  const handleClickScroll = (section) => {
    const element = document.getElementById(section);
    if (element) {
      handleOpen();
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <li>
      <button
        onClick={() => handleClickScroll(section)}
        className="border-b-2 border-transparent md:hover:border-indigo-600 md:hover:border-b-2 md:hover:text-white hover:text-indigo-600 transition-transform"
      >
        {text}
      </button>
    </li>
  );
};

export default Link;
