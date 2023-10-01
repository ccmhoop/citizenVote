import ProgressBar from '../components/ProgressBar';

function ProjectItem(props){
    const properties = props;
    return (
      <>    
        <div className='w-[95%] h-[95%] border-2 border-amber-400 flex justify-center items-start flex-col rounded-xl overflow-hidden mb-1' style={{backgroundImage: `url(${properties.url})`, backgroundSize: "cover",backgroundPosition:"center"}}>  
        </div>
        <div className=" text-center font-bold text-slate-900 w-[95%] h-12 border-y-2">{properties.title}</div>
    <ProgressBar percentage={properties.percentage}/>
     </>
    )
}

export default ProjectItem
