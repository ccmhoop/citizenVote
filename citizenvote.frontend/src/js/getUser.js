import { getToken } from "../js/getToken";
import { Axios } from "axios";
import { useEffect } from "react";

export async function getUser(){
    const token = getToken().token;
    let user = undefined;
    await axios.get(`http://localhost:8080/api/v1/auth/user`, {token}).then(response => {
            console.log(response)
            setProjectList(response.data)
        }).then(response => user = response.data)
    return user
}