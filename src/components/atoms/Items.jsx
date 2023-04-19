const Items = ({ list }) => {
  return (
    // <aside className="text-white py-10 pl-10 pr-10 cursor-default">
    //   {list.map((data) => (
    //     <div key={data.timerange} className="flex flex-row">
    //       <span className="w-1 bg-zinc-800">
    //         <span className="flex mr-7 mt-8 w-4 h-2 bg-zinc-800"></span>
    //       </span>
    //       <div className="flex flex-col py-5 ml-5">
    //         <h2 className="text-2xl md:text-3xl font-bold">{data.title}</h2>
    //         <h3 className="font-thin text-indigo-500">{data.location}</h3>
    //         <p className="font-thin text-sm">{data.timerange}</p>
    //         <p className="font-thin text-xs">{data.place}</p>
    //         {data.subtitle && (
    //           <div className="mt-2">
    //             <h3 className="font-semibold">{data.subtitle}:</h3>
    //             {data.extras.map((extra) => (
    //               <p
    //                 key={extra}
    //                 className="pl-5 font-thin text-sm text-justify"
    //               >
    //                 - {extra}
    //               </p>
    //             ))}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   ))}
    // </aside>
    <article className="text-white p-10 cursor-default">
      {list.map((item) => (
        <div
          key={item.timerange}
          className="flex flex-start border-l-2 border-zinc-800"
        >
          <div className="bg-zinc-800 mt-4 w-6 h-6 flex items-center justify-center rounded-full -ml-3" />
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
