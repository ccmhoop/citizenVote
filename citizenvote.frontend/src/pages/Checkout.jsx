import { useState, useEffect } from "react";
import completeOrder from "../js/completeOrder";
import ButtonDesign from "../components/ButtonDesign";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:8080/shop/basket/checkout";
  const checkoutApi = "http://localhost:8080/shop/basket/checkout/complete";
  
  const [orderInformation, setOrderInfromation] = useState({
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
      const tot = await completeOrder(apiUrl);
      setOrderInfromation(tot.body);
      console.log(tot.body);
    }
    getOrderInformation();
    console.log("info", orderInformation);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await completeOrder(checkoutApi);
     navigate("/")
    } catch (error) {
      navigate("/basket")
      console.log(error);
    }
  
  };

  console.log(orderInformation);

  return (
    <div className="w-[100%] min-h-[88vh] flex justify-center items-start p-4 flex-wrap bg-gradient-to-br from-indigo-800 to-rose-600">
      <div className=" w-96 min-w-[35vw] max-w-[100vw]  h-[88vh] flex flex-col justify-start items-start rounded-xl bg-white/80  p-2">
      <div className="flex justify-start flex-row w-full bg-rose-400  h-fit overflow-y-scroll  gap-y-1 mb-1 ">
          
          <div className="flex justify-start items-start flex-col bg-black w-[75%] ">
          <div className=" leading-6 flex justify-start items-center flex-row my-1 border-2  border-amber-400 text-xs font-extrabold  ml-2 text-white rounded-lg bg-slate-800 w-64 h-10 gap-x-2 px-2">
            <p className=" tracking-wider w-28 text-white ">Firstname </p> <p className="flex justify-center items-center my-2 border-2 text-slate-800 border-amber-400 rounded-lg bg-white w-40 h-6">{orderInformation.userResponse.firstname}</p> 
          </div>
            
          <div className="flex  justify-start items-center flex-row my-1 border-2  border-amber-400 text-xs font-extrabold  ml-2 text-white rounded-lg bg-slate-800 w-64 h-10 gap-x-2 px-2">
            <p className=" w-28 text-white ">Lastname </p> <p className="flex justify-center items-center my-2 border-2 text-slate-800 border-amber-400 rounded-lg bg-white w-40 h-6">{orderInformation.userResponse.lastname}</p> 
          </div>
            
          <div className="flex  justify-start items-center flex-row my-1 border-2  border-amber-400 text-xs font-extrabold  ml-2 text-white rounded-lg bg-slate-800 w-64 h-10 gap-x-2 px-2">
            <p className=" w-28 text-white ">Address </p> <p className="flex justify-center items-center my-2 border-2 text-slate-800 border-amber-400 rounded-lg bg-white w-40 h-6">{orderInformation.userResponse.adress}</p> 
          </div>

          <div className="flex  justify-start items-center flex-row my-1 border-2  border-amber-400 text-xs font-extrabold  ml-2 text-white rounded-lg bg-slate-800 w-64 h-10 gap-x-2 px-2">
            <p className=" w-28 text-white ">PhoneNumber </p> <p className="flex justify-center items-center my-2 border-2 text-slate-800 border-amber-400 rounded-lg bg-white w-40 h-6">{orderInformation.userResponse.phoneNumber}</p> 
          </div>
          </div>


          <div className="flex justify-start items-start bg-white w-[25%] h-full"></div>
          
        <div>

            </div>
        </div>
        <button onClick={handleSubmit} className=""><ButtonDesign title="Complete Order" width="60" height="20" labelWidth="full" labelHeight="[60%]" labelPx="6" my="1" mx="0"/></button>
      </div>
    </div>
  );
}
