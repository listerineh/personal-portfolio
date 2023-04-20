const Items = ({ list }) => {
  return (
    <article className="text-white p-10 cursor-default">
      {list.map((item) => (
        <div
          key={item.timerange}
          className="flex flex-start border-l-2 border-custom-gray"
        >
          <div className="bg-custom-gray mt-4 w-8 h-7 flex items-center justify-center rounded-full -ml-4" />
          <section className="block p-6 px-6 pt-2 pb-6 w-full ml-6 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">{item.title}</h2>
            <h3 className="font-thin text-indigo-500">{item.location}</h3>
            <p className="font-thin text-sm">{item.timerange}</p>
            <p className="font-thin text-xs">{item.place}</p>
            {item.subtitle && (
              <div className="mt-2">
                <h3 className="font-semibold">{item.subtitle}:</h3>
                {item.extras.map((extra) => (
                  <p
                    key={extra}
                    className="pl-5 font-thin text-sm text-justify"
                  >
                    - {extra}
                  </p>
                ))}
              </div>
            )}
          </section>
        </div>
      ))}
    </article>
  );
};

export default Items;
