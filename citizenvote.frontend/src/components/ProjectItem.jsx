import banner from "../assets/amersfoort.jpg";
import ProgressBar from '../components/ProgressBar';

function ProjectItem(props){
    return (
        <div className='border h-32 w-32 border-black' style={{backgroundImage: `url(${props.url})`, backgroundSize: "contain"}}>
             {/* <img className="top-10 h-32 w-32 object-none bg-slate-600" src={banner}alt=""/> */}
             <ProgressBar yesVotes={props.yesVotes}  noVotes={props.noVotes} requiredVotes={props.requiredVotes} progress={props.progress}/>
             <div className="relative bg-slate-600 bg-opacity-80 h-8 w-full top-20 flex justify-center items-center">{props.title}</div>
        </div>
    )
}

export default ProjectItem
