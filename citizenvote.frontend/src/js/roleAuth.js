import axios from "axios";
import { getToken } from "./getToken";
import { useEffect,useState } from "react";

export default function RoleAuth() {
 const [authStatus,setAuthStatus] = useState(false)

  useEffect(() => {
    async function userRole() {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/role",
        {
          token: getToken().token,
          currentUrl: window.location.href
        },
        {
          headers: {
            Authorization: `Bearer ${getToken().token}`
          }
        }
      )
      .catch((error)=> error) 
       response.status === 200? setAuthStatus(true) : setAuthStatus(false);
    }
   userRole();
  }, []);
  return authStatus;
}
