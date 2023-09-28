import { Link } from "react-router-dom";
import ButtonDesign from "../components/ButtonDesign";

export default function Manicipality() {
  return (
    <div className="w-[100%] min-h-[88vh] flex justify-center items-start flex-wrap gap-2 bg-gradient-to-br from-indigo-800 to-rose-600">
      <div className="  min-w-[40vw] max-w-[100vw]  h-[88vh] flex flex-col justify-start items-center rounded-xl bg-white/80 overflow-y-scroll py-2 px-6 my-2">
        <Link to="/shop_managment">
          {" "}
          <ButtonDesign
            title="Manage Shop"
            width="96"
            height="24"
            labelWidth="full"
            labelHeight="[60%]"
            labelPx="6"
            my="1"
            mx="0"
          />
        </Link>
        <Link to="/editproject">
          {" "}
          <ButtonDesign
            title="Edit Project"
            width="96"
            height="24"
            labelWidth="full"
            labelHeight="[60%]"
            labelPx="6"
            my="1"
            mx="0"
          />
        </Link>
      </div>
    </div>
  );
}
