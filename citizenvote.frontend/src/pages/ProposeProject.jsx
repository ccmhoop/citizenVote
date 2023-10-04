import PageRequest from "../components/PageRequest";
import ProposeProjectMenu from "../components/ProposeProjectMenu";
import RoleAuth from "../js/roleAuth";

export default function ProposeProject() {
  if(RoleAuth()){
  return (
    <div>
      <ProposeProjectMenu />
    </div>
  );
  }
  else{
    return(<PageRequest/>)
  }
}
