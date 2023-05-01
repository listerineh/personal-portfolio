import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonPrincipal = ({ URL, icon, text }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    window.open(URL, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-x-2 p-3 bg-primary dark:bg-primary-dark text-on-primary md:hover:bg-primary-variant rounded-md transition-all"
    >
      <FontAwesomeIcon icon={icon} size="1x" />
      <span className="text-sm">{text}</span>
    </button>
  );
};

export default ButtonPrincipal;
