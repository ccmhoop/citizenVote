import { useEffect, useState } from 'react'
import { getToken } from "../js/getToken";
import ProjectItem from '../components/ProjectItem';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import RoleAuth from '../js/roleAuth';
import PageRequest from '../components/PageRequest';

function ProjectList(){

    const [projectList, setProjectList] = useState([]);
    const navigate = useNavigate();
    const user = useAuthUser();
    useEffect(() => {
        getProjects("ALL")
    }, [])

    async function getProjects(progress){
        const byRole = document.getElementById("suggestorRole").value
        await axios.post(`http://localhost:8080/api/v1/project/progress/list`, {
            progress,
            byRole,
            token: getToken().token
        }, getToken().cfg)
        .then(response => {
            console.log(response)
            setProjectList(response.data)
        },)
        .catch((er)=> console.log(er))
    }

    function onClickItem(id){
        navigate(`/project_overview` , {state: {id}})
    }

    if(RoleAuth()){
    return (
        <div className="w-[100%] min-h-[88vh] flex justify-center items-start gap-2 bg-gradient-to-br from-indigo-800 to-rose-600">

            <div className="  min-w-[65vw] max-w-[95vw]  h-[88vh] flex flex-col justify-start items-start rounded-xl bg-white/80 my-4 overflow-hidden">
            <div className="flex justify-center text-center items-center text-lg font-extrabold text-white w-full h-20 bg-amber-400 mx-auto rounded-t-xl border-b-2">
          <p className="flex justify-center text-center items-center text-lg font-extrabold text-white w-full h-9 bg-slate-800 mx-auto border-y-2 py-2">
            Project List
          </p>
        </div>
               <div className='flex justify-center rounded-t-lg items-center h-fill w-full flex-wrap bg-white text-xs font-bold px-2 py-2 gap-1 '>

                        <button onClick={() => getProjects("ALL")} className='rounded-md  w-20 px-2 h-10  bg-slate-800 text-white'>All</button>
                        <button onClick={() => getProjects("ACCEPTED")} className='rounded-md w-20 px-2  h-10  bg-slate-800 text-white'>Accepted</button>
                        {(user().role == "MANICIPALITY" || user().role == "ADMIN" ) && <>
                            <button onClick={() => getProjects("SUGGESTED")} className='rounded-md w-20 px-2 h-10   bg-slate-800 text-white'>Suggested</button>
                            <button onClick={() => getProjects("DECLINED")} className='rounded-md w-20 px-2 h-10  bg-slate-800 text-white'>Declined</button>
                            <button onClick={() => getProjects("FAILED")} className='rounded-md w-20 px-2 h-10  bg-slate-800 text-white'>Failed</button>
                            <button onClick={() => getProjects("PASSED")} className=' rounded-md w-20 px-2  h-10  bg-slate-800 text-white'>Passed</button>
                            <button onClick={() => getProjects("APPROVED")} className='rounded-md w-20 px-2 h-10  bg-slate-800 text-white'>Approved</button>
                            <button onClick={() => getProjects("DISCARDED")} className=' rounded-md w-20 px-2  h-10  bg-slate-800 text-white'>Discarded</button>
                         </>
                        }
                </div>
                <div className='flex justify-center items-center flex-row w-full bg-white gap-y-2 py-2'>
                <label className='font-extrabold' htmlFor="suggestorRole">Suggestor Category :</label>
                <select className='border-2 bg-white font-bold border-amber-400 w-44  rounded-lg pl-2 ml-2 ' name="Role of Suggestor" id='suggestorRole'>
                    <option value={"ALL"}>- ALL -</option>
                    <option value={"CITIZEN"}>CITIZEN</option>
                    <option value={"MANICIPALITY"}>MANICIPALITY</option>
                </select></div>

                {/* project inventory */}<div className=' h-fill w-full flex shrink  justify-center items-start  overflow-y-scroll flex-wrap gap-y-2 gap-x-6 py-2 px-4 '>
                    {projectList.map((obj) => <div key={obj.id} className='flex overflow-hidden justify-center items-center bg-white flex-col rounded-xl h-80  w-96 py-2    hover:opacity-60 hover:cursor-pointer' onClick={() => onClickItem(obj.id)}><ProjectItem title={obj.title} url={obj.labelImage} progress={obj.progress} yesVotes={obj.yesVotes}  noVotes={obj.noVotes} requiredVotes={obj.requiredVotes}/></div>)}
                </div>
            </div>
        </div>
    )
}
else{
    return(<PageRequest/>)
  }
}

export default ProjectList;
