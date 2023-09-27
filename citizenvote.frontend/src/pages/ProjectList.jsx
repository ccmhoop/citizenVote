import { useEffect, useState } from 'react'
import { getToken } from "../js/getToken";
import ProjectItem from '../components/ProjectItem';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ProjectList(){

    const [projectList, setProjectList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getProjects("HAVE_ENOUGH_VOTES")
    }, [])

    



    async function getProjects(progress){
        await axios.get(`http://localhost:8080/api/v1/project/progress/${progress}`,getToken().cfg)
        .then(response => {
            console.log(response)
            setProjectList(response.data)
        },)
        .catch((er)=> console.log(er))
    }

    function onClickItem(id){
        navigate(`/project_overview` , {state: {id}})
    }

    return (
        <div className="h-fit w-screen bg-gradient-to-br from-indigo-800 to-rose-600 min-h-[calc(100vh-152px)] items-center flex justify-center">
            <div className="h-fit w-fit bg-slate-100 text-black font-bold rounded-lg flex flex-col gap-5 p-5 min-w-[50%] bg-opacity-60">
                {/* Kolom (sticky) */}<div className='border border-black h-12 w-full'>
                        <button onClick={() => getProjects("ALL")} className='border border-black bg-slate-500'>All</button>
                        <button onClick={() => getProjects("PROPOSED")} className='border border-black bg-slate-500'>Proposed</button>
                        <button onClick={() => getProjects("APPROVED")} className='border border-black bg-slate-500'>Approved</button>
                        <button onClick={() => getProjects("HAVE_ENOUGH_VOTES")} className='border border-black bg-slate-500'>Have Enough Votes</button>
                        <button onClick={() => getProjects("TAKE_INTO_IMPLICATION")} className='border border-black bg-slate-500'>Take Into Implication</button>
                        <button onClick={() => getProjects("DISCARDED")} className='border border-black bg-slate-500'>Discarded</button>
                </div>
                
                {/* project inventory */}<div className='border border-black min-h-[500px] w-full '>
                    {projectList.map((obj) => <div onClick={() => onClickItem(obj.id)}><ProjectItem title={obj.title} url={obj.labelImage} percentage={(obj.amountVotes/obj.requiredVotes)*100}/></div>)}
                </div>
            </div>
        </div>
    )
}

export default ProjectList;