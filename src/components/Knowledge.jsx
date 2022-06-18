const Knowledge = ({ knowledges, KIcon }) => {
  return knowledges.map((kwowledge) => (
    <div className="flex" key={kwowledge.name}>
      <KIcon className="h-6 w-6" />
      <pre translate="no">
        {" "}
        <a href={kwowledge.url} target="_blank">
          {kwowledge.name}
        </a>
      </pre>
    </div>
  ));
};

export default Knowledge;
