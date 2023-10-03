import ProgressBar from "../components/ProgressBar";

function ProjectItem(props) {
  return (
    <>        
      <div
        className="w-[95%] h-[95%] border-2 border-amber-400 flex justify-center items-start flex-col rounded-xl overflow-hidden mb-1"
        style={{
          backgroundImage: `url(${props.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      <div className=" text-center justify-center font-bold text-slate-900 w-[95%] h-8 border-y-2">
        {props.title}
      </div>
    <div className="flex justify-center items-center w-full  h-12 mt-auto">
      <ProgressBar
        yesVotes={props.yesVotes}
        noVotes={props.noVotes}
        requiredVotes={props.requiredVotes}
        progress={props.progress}
      /></div>
    </>
  );
}

export default ProjectItem;
