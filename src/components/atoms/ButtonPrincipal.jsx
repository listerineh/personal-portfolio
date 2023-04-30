import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonPrincipal = ({ URL, icon, text }) => {
  return (
    <a
      href={URL}
      className="flex items-center gap-x-2 p-3 bg-primary dark:bg-primary-dark text-on-primary md:hover:bg-primary-variant rounded-md transition-all"
    >
      <FontAwesomeIcon icon={icon} size="1x" className="" />
      <span className="text-sm">{text}</span>
    </a>
  );
};

export default ButtonPrincipal;
