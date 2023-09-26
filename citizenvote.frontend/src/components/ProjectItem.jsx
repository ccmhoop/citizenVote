import banner from "../assets/amersfoort.jpg";
import ProgressBar from '../components/ProgressBar';

function ProjectItem(props){
    return (
        <div className='border h-32 w-32 border-black' style={{backgroundImage: `url(${props.url})`, backgroundSize: "contain"}}>
             {/* <img className="top-10 h-32 w-32 object-none bg-slate-600" src={banner}alt=""/> */}
             <ProgressBar percentage={props.percentage}/>
             <div className="relative bg-slate-600 bg-opacity-80 h-8 w-full top-10 flex justify-center items-center">{props.title}</div>         
        </div>
    )
}

export default ProjectItem

function test(){
    return <> return (
        <div className=''>
        {/* <div className='w-32 h-32 bg-slate-700'></div> */}
          
    <div className='border flex flex-col justify-center items-center border-black h-32 w-32'>
    
    {/* <div className=' w-32 h-32 bg-slate-700'></div> */}

                
            
        </div>
    </div>
    )</>
}