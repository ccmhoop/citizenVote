
function ProgressBar(props){

    let yesd = 0
    let nod = 0
    if(props.requiredVotes > props.yesVotes + props.noVotes){
        yesd = props.yesVotes / props.requiredVotes * 100
        nod = props.noVotes / props.requiredVotes * 100
    }
    else {
        yesd = props.yesVotes / (props.yesVotes + props.noVotes) * 100
        nod = props.noVotes / (props.yesVotes + props.noVotes) * 100
    }


    return (

            // <div className="relative flex w-full h-4 top-20 justify-start items-center">
                <div className="flex w-[95%] h-12 justify-center items-center rounded-3xl border-2 border-amber-400 bg-slate-800 mt-2  px-4">
                {props.progress === "SUGGESTED" && <div className="border-amber-400 rounded-full  border-2 w-8 h-8 bg-white"></div>}
                {props.progress === "ACCEPTED" && <div className="border-2 border-amber-400 rounded-l-full w-8 h-8 bg-gradient-to-br from-cyan-200 to-cyan-500"></div>}
                {props.progress === "DECLINED" && <div className="border-2 border-amber-400 rounded-l-full   w-8 h-8 bg-black"></div>}
                {props.progress === "FAILED" && <div className="border-2 border-amber-400 rounded-l-full  w-8 h-8  bg-gradient-to-br from-red-300 to-red-600"></div>}
                {props.progress === "PASSED" && <div className="border-2 border-amber-400 rounded-l-full   w-8 h-8 bg-gradient-to-br from-green-300 to-green-600"></div>}
                {props.progress === "APPROVED" && <div className="border-2 border-amber-400 rounded-l-full   w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-800"></div>}
                {props.progress === "DISCARDED" && <div className="border-2 border-amber-400 rounded-l-full   w-8 h-8 bg-gradient-to-br from-orange-300 to-orange-600"></div>}
               <div className="border-2 border-amber-400 w-full h-6 rounded-r-xl bg-white border-l-0 flex overflow-hidden">
                <div className="bg-gradient-to-br from-cyan-300 via-green-400 to-green-600" style={{width: `${yesd}%`}}></div>
                <div className="bg-gradient-to-br from-cyan-300 via-red-400 to-red-600" style={{width: `${nod}%`}}></div>
               </div>
            </div>

    )
}

export default ProgressBar;