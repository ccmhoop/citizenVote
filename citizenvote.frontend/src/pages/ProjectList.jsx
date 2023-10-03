import { useEffect, useState } from 'react'
import { getToken } from "../js/getToken";
import ProjectItem from '../components/ProjectItem';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';

function ProjectList(){

    const [projectList, setProjectList] = useState([]);
    const navigate = useNavigate();
    const user = useAuthUser();
    useEffect(() => {
        getProjects("ACCEPTED")
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

    return (
        <div className="h-fit w-screen bg-gradient-to-br from-indigo-800 to-rose-600 min-h-[calc(100vh-152px)] items-center flex justify-center">
            <div className="h-fit w-fit bg-slate-100 text-black font-bold rounded-lg flex flex-col gap-5 p-5 min-w-[50%] bg-opacity-60">
                {/* Kolom (sticky) */}<div className='border border-black h-12 w-full flex '>

                        <button onClick={() => getProjects("ALL")} className='border border-black bg-slate-500'>All</button>
                        <button onClick={() => getProjects("ACCEPTED")} className='border border-black bg-slate-500'>Accepted</button>
                        {(user().role == "MANICIPALITY" || user().role == "ADMIN" ) && <>
                            <button onClick={() => getProjects("SUGGESTED")} className='border border-black bg-slate-500'>Suggested</button>
                            <button onClick={() => getProjects("DECLINED")} className='border border-black bg-slate-500'>Declined</button>
                            <button onClick={() => getProjects("FAILED")} className='border border-black bg-slate-500'>Failed</button>
                            <button onClick={() => getProjects("PASSED")} className='border border-black bg-slate-500'>Passed</button>
                            <button onClick={() => getProjects("APPROVED")} className='border border-black bg-slate-500'>Approved</button>
                            <button onClick={() => getProjects("DISCARDED")} className='border border-black bg-slate-500'>Discarded</button>
                         </>
                        }


                </div>
                <label for="suggestorRole">Suggestor Category:</label>
                <select name="Role of Suggestor" id='suggestorRole'>
                    <option value={"ALL"}>- ALL -</option>
                    <option value={"CITIZEN"}>CITIZEN</option>
                    <option value={"MANICIPALITY"}>MANICIPALITY</option>
                </select>

                {/* project inventory */}<div className='border border-black min-h-[500px] w-full flex flex-row '>
                    {projectList.map((obj) => <div onClick={() => onClickItem(obj.id)}><ProjectItem title={obj.title} url={obj.labelImage} progress={obj.progress} yesVotes={obj.yesVotes}  noVotes={obj.noVotes} requiredVotes={obj.requiredVotes}/></div>)}
                </div>
            </div>
        </div>
    )
}

export default ProjectList;
