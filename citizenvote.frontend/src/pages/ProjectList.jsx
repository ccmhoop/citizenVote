import { useState } from 'react'

import banner from "../assets/amersfoort.jpg";
import ProjectItem from '../components/ProjectItem';

function ProjectList(){

    const [projectList, setProjectList] = useState([]);

    return (
        <div className="h-fit w-screen bg-gradient-to-br from-indigo-800 to-rose-600 min-h-[calc(100vh-152px)] items-center flex justify-center">
            <div className="h-fit w-fit bg-slate-100 text-black font-bold rounded-lg flex flex-col gap-5 p-5 min-w-[50%] bg-opacity-60">
                {/* Kolom (sticky) */}<div className='border border-black h-12 w-full'>

                </div>
                
                {/* project inventory */}<div className='border border-black min-h-[500px] w-full '>
                    <ProjectItem url={"noImage.jpg"}/>
                </div>
            </div>
        </div>
    )
}

export default ProjectList;