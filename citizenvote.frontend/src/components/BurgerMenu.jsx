import { Link, useNavigate } from "react-router-dom";
import { useAuthUser, useSignOut } from "react-auth-kit";

export default function BurgerMenu() {
  const auth = useAuthUser();
  const logout = useSignOut();
  const navigate = useNavigate();
  if (auth()) {
    console.log(`hamburger name: ${auth().username}, role: ${auth().role}`);
    // console.log(useToken());
  }

  function onLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="flex flex-wrap justify-center items-center h-14 w-14">
      <input
        type="checkbox"
        name="hamburger"
        id="hamburger"
        className="peer "
        hidden
      />
      <label
        htmlFor="hamburger"
        className="peer-checked:hamburger block relative z-20 p-6 cursor-pointer"
      >
        <div
          aria-hidden="true"
          className="m-auto h-0.5 w-6 rounded bg-white transition duration-300"
        ></div>
        <div
          aria-hidden="true"
          className="m-auto mt-2 h-0.5 w-6 rounded bg-white transition duration-300"
        ></div>
      </label>
      <div className="absolute peer-checked:translate-x-0 inset-x-0  translate-x-[-100%] bg-slate-800 shadow-2xl transition  w-52 max-w-[40vw] top-14">
        <div className="flex flex-col gap-1  font-bold justify-start w-[100%] p-4">
          <Link to="/">home</Link>
          {!auth() && (
            <>
              <Link to="/login">login</Link>
              <Link to="/register">register</Link>
            </>
          )}
          <div className=" border-2 border-white rounded mt-2"></div>
          {auth() && auth().role === "CITIZEN" && (
            <>
              <Link to="/propose_project">Suggest project</Link>
              <Link to="/project_list">Project List</Link>
              <div className=" border-2 border-white rounded mt-2"></div>
              <Link to="/shop">Shop</Link>
              <Link to="/basket">Cart</Link>
            </>
          )}
          {auth() && auth().role === "MANICIPALITY" && (
            <>
              <Link to="/propose_project">Suggest project</Link>
              <Link to="/project_list">Project List</Link>
              <div className=" border-2 border-white rounded mt-2"></div>
              <Link to="/shop">Shop</Link>
              <Link to="/shop_management">Manage shop</Link>
            </>
          )}

          {auth() && auth().role === "ADMIN" && (
            <>
              <Link to="/manicipality_registry">Manicipality Registration</Link>
              <Link to="/shop">shop</Link>
              <Link to="/propose_project">propose project</Link>
            </>
          )}
          {auth() && (
            <>
              <div className=" border-2 border-white rounded mt-2"></div>
              <a onClick={() => onLogout()} className="hover:underline">
                Logout
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
