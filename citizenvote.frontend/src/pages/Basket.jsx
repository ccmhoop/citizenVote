import { useState } from "react";
import ListBasket from "../components/ListBasket";
import { cart, displayTotalCost } from "../js/shoppingSession";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import ButtonDesign from "../components/ButtonDesign";
import RoleAuth from "../js/roleAuth";

export default function Basket() {
  const auth = useAuthUser();

  const [totalPoints, setTotalPoints] = useState(displayTotalCost());

  const updateTotal = () => {
    setTotalPoints(displayTotalCost());
    console.log(totalPoints);
  };

if(RoleAuth())
  return (
    <div className="w-[100%] min-h-[88vh] flex justify-center items-start p-4 flex-wrap bg-gradient-to-br from-indigo-800 to-rose-600">
      <div className=" w-96 min-w-[35vw] max-w-[100vw]  h-[88vh] flex flex-col justify-start items-start rounded-xl bg-white/80  ">
        <div className="flex justify-center rounded-t-lg items-center h-fit w-full  bg-amber-400 font-bold px-2 py-2 ">
          <p className="flex justify-center items-center rounded-md w-52 px-2  h-10  bg-white text-xl text-slate-800">
            Shopping Cart
          </p>
        </div>
        <div className="flex justify-center  items-center h-fit w-full  bg-white font-bold px-2 py-2 mb-2 gap-x-2 ">
          <Link
            to="/"
            className="flex justify-center items-center rounded-md w-52 px-2  h-10  bg-slate-800 text-xl text-white"
          >
            home
          </Link>
          <Link
            to="/shop"
            className="flex justify-center items-center rounded-md w-52 px-2  h-10  bg-slate-800 text-xl text-white"
          >
            shop
          </Link>
        </div>
        <div className="flex justify-start flex-col w-full  h-full overflow-y-scroll  gap-y-1 mb-1 px-2 ">
          {cart.length > 0 ? (
            cart.map(
              (item) => (
                console.log("log", item),
                (
                  <ListBasket
                    key={item.id}
                    product={item}
                    updateTotal={updateTotal}
                  />
                )
              )
            )
          ) : (
            <div className="flex justify-center text-center items-center text-lg font-extrabold text-white rounded-lg w-40 h-9 bg-slate-800 mx-auto my-auto">
              {" "}
              cart is empty
            </div>
          )}
        </div>
        <div className="flex justify-start items-start flex-col rounded-b-xl font-bold w-full h-48 bg-white text-slate-900 ml-auto mt-auto">
          <div className="flex justify-center items-start flex-col w-full h-fit">
            <p className="flex justify-center text-center items-center border-b-2  text-lg font-extrabold text-slate-800 w-full w-38 h-9 pb-1 mt-2">
              Overview
            </p>
          </div>
          <div className="w-full border-b-2">
            <div className="flex justify-between items-center flex-row w-60 h-fit pt-2 mx-auto px-4">
              <p className="flex justify-between  items-center text-xs w-fit h-fit">
                items ({cart.length}){" "}
              </p>
              <p className="flex justify-between  items-center text-xs w-fit h-fit">
                {totalPoints} points
              </p>
            </div>
            <div className="flex justify-between items-center flex-row w-60 h-fit pb-2 mx-auto px-4">
              <p className="flex justify-between  items-center text-xs w-fit h-fit">
                postage{" "}
              </p>
              <p className="flex justify-between  items-center text-xs w-fit h-fit">
                {" "}
                PostNL
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-row w-full h-16 mt-4 bg-amber-400 rounded-b-lg px-4 ">
            <div className="flex justify-center items-center w-full gap-x-4 ">
              <p className="flex justify-center text-center items-center text-sm font-extrabold text-white rounded-lg w-28  h-10 bg-slate-800">
                Points After
              </p>
              <div className="flex justify-center items-center text-slate-800 font-bold w-24 h-10 bg-white rounded-md">
                {auth().points - totalPoints}
              </div>
              {cart.length > 0 && auth().points - totalPoints > 0 ? (
                <Link to="/checkout">
                  <ButtonDesign
                    title="Checkout"
                    width="32"
                    height="10"
                    labelWidth="full"
                    labelHeight="6"
                    labelPx="2"
                    my="1"
                    mx="0"
                  />
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
