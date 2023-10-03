import axios from "axios";
import { getToken } from "./getToken";

export default  async function roleAuth() {
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
  return response.status === 200 ? true : response.status;
}
