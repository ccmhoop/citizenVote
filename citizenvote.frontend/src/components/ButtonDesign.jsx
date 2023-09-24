
// eslint-disable-next-line react/prop-types
export default function ButtonDesign({width,height,title,my,mx,labelWidth,labelHeight,labelPx}) {

  return (
      <div
        className={`flex justify-center items-center overflow-hidden  rounded-xl w-${width} h-${height} bg-white my-${my} mx-${mx}  transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-800/80  hover:to-rose-600/80 `}
      >
        <div
          className={`flex justify-center items-center w-full h-[80%] px-${labelPx} text-center text-lg font-extrabold leading-none border-y-2 tracking-tight`}
        >
          <p
            className={`flex justify-center text-center w-${labelWidth} h-${labelHeight} items-center text-lg font-extrabold n text-white rounded-lg pb-1 bg-slate-800`}
          >
            {title}
          </p>
        </div>
      </div>
  );
}
