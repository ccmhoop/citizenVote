function ProgressBar(props) {
  const properties = props;
  return (
    <div className=" flex justify-center items-center flex-row h-16 w-full pt-5  ">
      <div className="flex justify-center items-center w-full h-9 rounded-2xl bg-slate-800 px-2 mb-4 ml-5">
        <div className="flex justify-start items-center w-full overflow-hidden h-6 rounded-xl bg-white border-2 border-amber-400 ">
          <div
            className={`flex items-center justify-center h-full w-[${properties.percentage}%] bg-gradient-to-br from-indigo-800 to-rose-600`}
          >
            {" "}
          </div>
        </div>
      </div> 
      <p className="relative right-[46%] font-bold mb-4  mx-auto">{properties.percentage}%</p>
    </div>
    
  );
}

export default ProgressBar;
