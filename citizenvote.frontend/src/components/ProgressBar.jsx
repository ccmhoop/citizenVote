
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

            <div className="relative flex w-full h-4 top-20 justify-start items-center">
                {props.progress === "SUGGESTED" && <div className="border-black border-[3px] w-4 h-4 bg-white"></div>}
                {props.progress === "ACCEPTED" && <div className="border-[3px] border-black w-4 h-4 bg-cyan-300"></div>}
                {props.progress === "DECLINED" && <div className="border-[3px] border-black w-4 h-4 bg-black"></div>}
                {props.progress === "FAILED" && <div className="border-[3px] border-black w-4 h-4 bg-red-600"></div>}
                {props.progress === "PASSED" && <div className="border-[3px] border-black w-4 h-4 bg-green-600"></div>}
                {props.progress === "APPROVED" && <div className="border-[3px] border-black w-4 h-4 bg-blue-800"></div>}
                {props.progress === "DISCARDED" && <div className="border-[3px] border-black w-4 h-4 bg-orange-600"></div>}
               <div className="border border-black w-[110px] h-4 rounded-r-lg bg-gray-600 bg-opacity-50 flex">
                <div className="bg-green-600" style={{width: `${yesd}%`}}></div>
                <div className="bg-red-600" style={{width: `${nod}%`}}></div>
               </div>
            </div>

    )
}

export default ProgressBar;