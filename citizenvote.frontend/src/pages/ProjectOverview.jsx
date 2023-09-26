import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProgressBar from "../components/ProgressBar";
import { useAuthUser } from "react-auth-kit";
import { getToken } from "../js/getToken";

function ProjectOverview(props) {

    const [project, setProject] = useState([]);
    const location = useLocation();
    const auth = useAuthUser();
    const token = getToken();
    console.log(location)

    useEffect(() => {
        getProject(location.state?.id)
    }, [])

    async function getProject(id) {
        console.log(getToken().cfg)
        await axios.post(`http://localhost:8080/api/v1/auth/auth/project/id`,
         {
            id,
            token: token.token
         },
          getToken().cfg
          ).then(response => {
            console.log(response)

            setProject(response.data)
        })
    }

    async function onVote(vote){
        console.log(`user: ${auth().username} , project: ${location.state?.id}`)
        console.log(getToken())
        await axios.post('http://localhost:8080/api/v1/vote', {
            username: auth().username,
            projectId: location.state?.id,
            voteType: vote
        }, token.cfg).then(response => {
            console.log(response)
        }).catch(err => console.log(err))
    }

    return (
        // <>
        //     <div className="h-fit w-screen bg-gradient-to-br from-indigo-800 to-rose-600 min-h-[calc(100vh-152px)] items-center flex justify-center">
        //         <div className="h-fit w-fit bg-slate-100 text-black font-bold rounded-lg flex flex-col gap-5 p-5 min-w-[50%] bg-opacity-60">

        //             <img src={project?.projectImageData?.[0]?.url || ""} alt="afbeelding project"></img>
        //             {location?.state?.id || "No Image"}
        //         </div>
        //     </div>
        // </>

        <>{project.length == 0 ? <p>Loading</p> :
            <div className="p-2 h-fit w-screen bg-gradient-to-br from-indigo-800 to-rose-600 min-h-[calc(100vh-152px)] items-center flex justify-center">
                <div className="h-fit w-fit bg-slate-100 text-black font-bold rounded-lg flex flex-col gap-5 p-5 min-w-[50%] bg-opacity-60">
                    <div className=" font-bold text-2xl">{project.title}</div>
                    <div className="">catagory: {project.category.toLowerCase()}</div>
                    <div className=" border-2 border-gray-600 rounded mt-2"/>
                    <img src={project.labelImage || ""} alt="afbeelding project"/>
                    <div className=" border-2 border-gray-600 rounded mt-2"/>
                    <ProgressBar percentage={(project.amountVotes/project.requiredVotes)*100}/>
                    <div className="flex flex-row justify-evenly">
                        
                        <div className="flex flex-col w-64">
                            <div>Votes Now: {project.amountVotes}</div>
                            <div>Votes Needed: {project.requiredVotes}</div>
                            <div>Votes to goal: {project.requiredVotes-project.amountVotes <= 0 ? "Completed" : project.requiredVotes-project.amountVotes}</div>
                        </div>
                        <div className="flex flex-col w-64">
                            <div>starts at: {project.startDate}</div>
                            <div>ends at: {project.endDate}</div>
                        </div>
                    </div>
                    <div className=" border-2 border-gray-600 rounded mt-2"/>
                    <div className=" max-w-xl">{project.description}</div>
                    <div className=" border-2 border-gray-600 rounded mt-2"/>
                    <div className="flex justify-between">
                        {project.voteType == "YES" && 
                        <button onClick={() => onVote("YES")} className="w-48 h-9 rounded-md bg-green-700 shadow-lg shadow-green-500">Vote Yes</button>
                        }
                         {project.voteType !== "YES" && 
                        <button onClick={() => onVote("YES")} className="w-48 h-9 rounded-md bg-green-700 ">Vote Yes</button>
                        }
                         {project.voteType == "NO" && 
                        <button onClick={() => onVote("YES")} className="w-48 h-9 rounded-md bg-red-700 shadow-lg shadow-red-500">Vote Yes</button>
                        }
                         {project.voteType !== "NO" && 
                        <button onClick={() => onVote("YES")} className="w-48 h-9 rounded-md bg-red-700 ">Vote No</button>
                        }

                        
                        
                    </div>
                </div>
            </div>}
        </>
    )

}

export default ProjectOverview;