import EditProjectMenu from "../components/EditProjectMenu";
import { useEffect,useState } from "react";
import roleAuth from "../js/roleAuth";

export default function Editproject() {
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    async function userRole() {
    const status = await roleAuth();
      setStatusCode(status)
    }
   userRole();
  }, []);
  if(statusCode){
  return (
    <div>
      <EditProjectMenu />
    </div>
  );
}
}