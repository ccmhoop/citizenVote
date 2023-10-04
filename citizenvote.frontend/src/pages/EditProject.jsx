import EditProjectMenu from "../components/EditProjectMenu";
import PageRequest from "../components/PageRequest";
import RoleAuth from "../js/roleAuth";

export default function Editproject() {
  if(RoleAuth()){
  return (
    <div>
      <EditProjectMenu />
    </div>
  );
}
else{
  return(<PageRequest/>)
}
}