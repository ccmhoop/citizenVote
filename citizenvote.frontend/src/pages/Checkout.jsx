import { useState, useEffect } from "react";
import completeOrder from "../js/completeOrder";
import ButtonDesign from "../components/ButtonDesign";
import { useNavigate, Link } from "react-router-dom";
import { cart } from "../js/shoppingSession";
import RoleAuth from "../js/roleAuth";
import PageRequest from "../components/PageRequest";

export default function CheckOut() {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:8080/shop/basket/checkout";
  const checkoutApi = "http://localhost:8080/shop/basket/checkout/complete";

  const [orderInformation, setOrderInformation] = useState({
    pointsAfterDeduction: "",
    sessionId: "",
    total: "",
    productResponse: [{ name: "" }],
    userResponse: {
      adress: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      points: ""
    }
  });

  useEffect(() => {
    async function getOrderInformation() {
      const checkInformation = await completeOrder(apiUrl);
      setOrderInformation(checkInformation.body);
    }
    getOrderInformation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await completeOrder(checkoutApi);
      navigate("/");
      alert("Order Succesfull!")
    } catch (error) {
      navigate("/basket");
      alert("Something went wrong redirected to basket")
    }
  };

  if(RoleAuth()){
  return (
    <div className="w-[100%] min-h-[88vh] flex justify-center items-start p-4 flex-wrap bg-gradient-to-br from-indigo-800 to-rose-600">
      <div className=" w-96 min-w-[60vw] max-w-[100vw] h-full flex flex-col  justify-start items-start rounded-xl bg-white/80  p-2">
        <div className="flex justify-center text-center items-center text-lg font-extrabold text-white w-full h-20 bg-amber-400 mx-auto rounded-t-xl border-b-2">
          <p className="flex justify-center text-center items-center text-lg font-extrabold text-white w-full h-9 bg-slate-800 mx-auto border-y-2 py-2">
            Order Details
          </p>
        </div>
        <div className="flex justify-center items-center flex-row flex-wrap overflow-y-scroll font-bold w-full h-full bg-white text-slate-800 border-b-2  gap-x-32 py-4 gap-y-4">
          <div className="flex justify-start items-center flex-col  border-4  border-amber-400 text-xs font-extrabold  text-white rounded-lg bg-slate-800 w-96 max-w-[80vw]  h-full  px-4">
            <p className="flex justify-center text-center items-center text-lg font-extrabold text-white w-full h-9 mx-auto border-b-2">
              Customer Details
            </p>
            {Object.keys(orderInformation.userResponse).map((key, index) => (
              <div
                key={index}
                className="flex  justify-start items-center flex-row  text-xs font-extrabold text-white rounded-lg w-64 h-10 gap-x-2 px-2"
              >
                <p className=" w-28 text-white ">{key} </p>{" "}
                <p className="flex justify-center items-center my-2 border-2 text-slate-800 border-amber-400 rounded-lg bg-white w-40 h-6">
                  {orderInformation.userResponse[key]}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-start items-center flex-col border-4  border-amber-400 text-xs font-extrabold  text-white rounded-lg bg-slate-800 w-96 max-w-[80vw] h-full  ">
            <p className="flex justify-center text-center items-center text-lg font-extrabold text-white w-full h-9  mx-auto border-b-2">
              Items
            </p>
            <div className="flex justify-start items-center text-sm font-extrabold text-white  w-full  h-9 bg-slate-800  border-b-2 px-4">
              <div className=" w-40 ">Product Name</div>
              <div className=" mx-auto w-14 ">Quantity</div>
              <div className=" ml-auto w-16 text-center ">Points</div>
            </div>
            <div className="flex flex-col overflow-y-scroll h-full w-full ">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center flex-row text-xs font-extrabold text-white rounded-lg w-fill h-10 gap-x-2 px-4"
              >
                <p className=" w-40  text-white ">
                  {item.name} ( {item.quantity}){" "}
                </p>{" "}
                <p className="  w-14 text-center  text-white ">
                  ({item.quantity}){" "}
                </p>{" "}
                <p className=" ml-5 w-16  h-6  flex justify-center items-center my-2 border-2 text-slate-800 border-amber-400 rounded-lg bg-white ">
                  {item.quantity * item.points}
                </p>
              </div>
            ))}</div>

            <div className="flex justify-start items-center text-center text-sm font-extrabold text-white w-full  h-9 bg-slate-800  border-b-2 mt-auto">
              <div className=" w-40 ">Total</div>
              <div className=" w-40 ">Before</div>
              <div className=" w-40 ">after</div>
            </div>


            <div className="flex justify-start items-center text-center text-sm font-extrabold text-white rounded-b-lg  w-full h-9 bg-slate-800 gap-x-2 px-2">
              <p className=" w-40 h-6  flex justify-center items-center my-2 border-2 text-slate-800 border-amber-400 rounded-lg bg-white ">{orderInformation.total}</p>
              <p className=" w-40 h-6  flex justify-center items-center my-2 border-2 text-slate-800 border-amber-400 rounded-lg bg-white ">{orderInformation.userResponse.points}</p>
              {orderInformation.pointsAfterDeduction>=0? 
              <p className=" w-40 h-6  flex justify-center items-center my-2 border-2 text-slate-800 border-amber-400 rounded-lg bg-white ">{orderInformation.pointsAfterDeduction}</p>:
              <p className=" w-40 h-6  flex justify-center items-center my-2 border-2  text-red-600 border-amber-400 rounded-lg bg-white ">{orderInformation.pointsAfterDeduction}</p>
              }

            </div>
          </div>
        </div>

        <div className="flex justify-start items-start flex-col rounded-b-xl font-bold w-full h-48 bg-white text-slate-900 ml-auto mt-auto">
          <div className="flex justify-center items-start flex-col w-full h-fit">
            <p className="flex justify-center text-center items-center border-b-2  text-lg font-extrabold text-slate-800 w-full w-38 h-9 pb-1 mt-2">
              Overview
            </p>
          </div>

          <div className="w-full border-b-2">
            <div className="flex justify-between items-center flex-row w-60 h-fit pt-2 mx-auto px-4">
              <p className="flex justify-between  items-center text-xs w-fit h-fit"></p>
              <p className="flex justify-between  items-center text-xs w-fit h-fit"></p>
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
          <div className="flex justify-center items-center flex-row w-full h-28 rounded-b-xl mt-4 bg-amber-400">
            <div className="flex justify-center items-center w-full  gap-x-4 px-4 ">
              <Link to="/basket">
                <ButtonDesign
                  title="Return to Cart"
                  width="40"
                  height="20"
                  labelWidth="full"
                  labelHeight="12"
                  labelPx="2"
                  my="1"
                  mx="0"
                />
              </Link>

              <button onClick={handleSubmit} className="">
                <ButtonDesign
                  title="Complete Order"
                  width="40"
                  height="20"
                  labelWidth="full"
                  labelHeight="12"
                  labelPx="2"
                  my="1"
                  mx="0"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
else{
  return(<PageRequest/>)
}
}