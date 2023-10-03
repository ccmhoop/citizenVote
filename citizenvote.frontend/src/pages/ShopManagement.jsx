import { useState, useEffect } from "react";
import ButtonDesign from "../components/ButtonDesign";
import ProductToShop from "../components/ProductToShop";
import axios from "axios";
import DeleteProduct from "../components/DeleteProduct";
import RoleAuth from "../js/roleAuth";

export default function ShopManagement() {
  const [selected, setSelected] = useState(false);
  const [task, setTask] = useState(false);
  const [products, setProducts] = useState([]);

  function handleSelected(option) {
    setSelected(!selected);

    if (option === "add") {
      setTask(true);
    }
    if (option === "remove") {
      setTask(false);
    }
  }


  useEffect(() => {
    async function getStoreData() {
      await axios
        .get("http://localhost:8080/api/v1/auth/auth/product/management")
        .then((res) => {
          setProducts(res.data);
        });
    }
    getStoreData();
  }, []);


if(RoleAuth()){
  return (
    <div className="w-[100%] min-h-[88vh] flex justify-center items-center flex-wrap gap-2 bg-gradient-to-br from-indigo-800 to-rose-600">
      <div className="  min-w-[25vw] max-w-[95vw]  h-[80vh] flex flex-col justify-start items-center rounded-xl bg-white/80 overflow-y-scroll overflow-x-hidden  ">
      <div className="flex justify-center text-center items-center text-lg font-extrabold text-white w-full h-20 bg-amber-400 mx-auto rounded-t-xl border-b-2">
          <p className="flex justify-center text-center items-center text-lg font-extrabold text-white w-full h-9 bg-slate-800 mx-auto border-y-2 py-2">
            Shop Management
          </p>
        </div>
        
        {selected ? (
          task ? (
            <div className="flex justify-center items-center flex-col my-auto">
              <ProductToShop />
            </div>
          ) : (  <div className="flex w-full justify-start items-start flex-col mt-2 gap-y-1 px-2 overflow-y-scroll">
            {products.map((product) => (
              <DeleteProduct key={product.id} product={product} />
            ))}
          </div>)
        ) : (
          <div className="flex flex-col gap-y-2 my-auto px-4">
            <button onClick={() => handleSelected("add")}>
              <ButtonDesign
                title="Add Product to shop"
                width="96"
                height="24"
                labelWidth="full"
                labelHeight="[60%]"
                labelPx="6"
                my="1"
                mx="0"
              />
            </button>
            <button onClick={() => handleSelected("remove")}>
              <ButtonDesign
                title="Remove Product from shop"
                width="96"
                height="24"
                labelWidth="full"
                labelHeight="[60%]"
                labelPx="6"
                my="1"
                mx="0"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
}