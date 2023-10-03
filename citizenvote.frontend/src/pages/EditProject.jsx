import EditProjectMenu from "../components/EditProjectMenu";
import RoleAuth from "../js/roleAuth";

export default function Editproject() {
  if(RoleAuth()){
  return (
    <div>
      <EditProjectMenu />
    </div>
  );
}
}