import { useState,useEffect } from "react";
import ButtonDesign from "../components/ButtonDesign";
import ProductToShop from "../components/ProductToShop";
import  axios  from "axios";
import DeleteProduct from "../components/DeleteProduct";

export default function ShopManagement() {
  const [selected, setSelected] = useState(false);
  const [task, setTask] = useState(false);
  const [products, setProducts] = useState([]);

  function handleSelected(option) {
    setSelected(!selected);

    if(option === "add"){
      setTask(true)
    }
    if(option === "remove"){
      setTask(false)
    }
  }

  useEffect(()=>{
    async function getStoreData(){
        await axios.get('http://localhost:8080/api/v1/auth/auth/shop/softdelete')
        .then((res) =>{
          setProducts(res.data)
          console.log(res.data)})}
     getStoreData();
     console.log(products)
},[]);

  return (
    <div className="w-[100%] min-h-[88vh] flex justify-center items-start flex-wrap gap-2 bg-gradient-to-br from-indigo-800 to-rose-600">
      <div className="  min-w-[40vw] max-w-[95vw]  h-[88vh] flex flex-col justify-start items-center rounded-xl bg-white/80 overflow-y-scroll overflow-x-hidden  my-2 p-2">
        {selected ? 
            task? (<div className="flex justify-center items-center flex-col my-auto">
            <ProductToShop />
            <div className="flex justify-start items-start "></div>
          </div>): products.map((product)=> <DeleteProduct key={product.id} product={product}/>)
         : (
          <div className="flex flex-col gap-y-2">
            <button onClick={()=>handleSelected("add")}>
              <ButtonDesign
                title="Add Product to shop"
                 width="96" height="24" labelWidth="full" labelHeight="[60%]" labelPx="6" my="1" mx="0"
              />
            </button>
            <button onClick={()=>handleSelected("remove")}>
              <ButtonDesign
                title="Remove Product from shop"
                width="96" height="24" labelWidth="full" labelHeight="[60%]" labelPx="6" my="1" mx="0"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
