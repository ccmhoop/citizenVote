import { useState, useEffect } from "react";
import { ShopProducts } from "../components/ShopProducts";
import { Link } from "react-router-dom";
import axios from "axios";
import RoleAuth from "../js/roleAuth";
import { useAuthUser } from "react-auth-kit";

export default function Shop() {
  const auth = useAuthUser();
  const [products, setProducts] = useState([
    {
      id: "",
      name: "",
      description: "",
      category: "",
      points: "",
      labelImage: ""
    }
  ]);

  useEffect(() => {
    async function getStoreData() {
      await axios
        .get("http://localhost:8080/api/v1/auth/auth/shop/all")
        .then((res) => setProducts(res.data));
    }
    getStoreData();
  }, []);
  console.log(RoleAuth())
  if  (RoleAuth()) {
    return (
      <div className="w-[100%] min-h-[88vh] flex justify-center items-start flex-wrap gap-2 bg-gradient-to-br from-indigo-800 to-rose-600 px-2">
        <div className="  min-w-[40vw] max-w-96 h-[88vh] flex flex-col justify-start items-center rounded-xl bg-white/80 my-4 overflow-x-hidden  ">
        <div className="flex justify-center text-center items-center text-lg font-extrabold text-white w-full h-20 bg-amber-400 mx-auto rounded-t-xl border-b-2">
          <p className="flex justify-center text-center items-center text-lg font-extrabold text-white w-full h-9 bg-slate-800 mx-auto border-y-2 py-2">
            Reward Shop
          </p>
        </div>
          <div className="flex justify-center  items-center h-fit w-full  bg-white font-bold px-2 py-2 mb-2 gap-x-2 ">
            <Link
              to="/"
              className="flex justify-center items-center rounded-md w-52 px-2  h-10  bg-slate-800 text-xl text-white"
            >
              home
            </Link>
            {auth() && auth().role === "CITIZEN" &&(
            <Link
              to="/basket"
              className="flex justify-center items-center rounded-md w-52 px-2  h-10  bg-slate-800 text-xl text-white"
            >
              Shoppin Cart
            </Link>)}
          </div>
          <div className="flex w-full justify-start items-start h-fit flex-wrap overflow-y-scroll mx-auto gap-x-4 md:px-8 px-2 ">
            {products.map((item) => (
              <ShopProducts key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
