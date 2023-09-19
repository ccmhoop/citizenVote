
function ProgressBar(props){

    return (

            <div className="flex w-full h-14 justify-start items-center ">
                <div className="h-12 w-12">
                    <div className="ml-1 w-12 h-12 rounded-full bg-slate-800">
                        <div className="absolute w-6 h-12 rounded-tl-full rounded-bl-full bg-green-500 flex justify-center items-center"
                        style={{ transform: [{ rotate: "70deg", translate: "12px"}], background: "yellow"}}>
                            
                        </div>     
                    </div>   
                </div>  
                {/* <div className="relative w-[60%] h-[60%] rounded-full bg-slate-300 flex justify-center items-center text-xs">
                        50%
                </div> */}
            </div>

    )
}

export default ProgressBar;