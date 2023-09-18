import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";


export function StoreProducts() {

  const [products,setProducts] = useState([{
    id: "",
    name : "",
    description: "" ,
    category: "",
    points: "",
    labelImage: ""
}]
)

useEffect(()=>{
    async function getStoreData(){
        await axios.get('http://localhost:8080/api/v1/auth/auth/shop/all')
        .then((res) => setProducts(res.data))
    }
     getStoreData();
},[]);

  return (
    products.map((product)=>{
      return(
          <div className="flex justify-start items-center overflow-hidden rounded-lg w-96 h-44 bg-white pl-4 my-4 mx-2">
            <img className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-36 h-40 bg-transparent" src={product.labelImage} alt="logo"/>
            <div className="flex flex-col justify-start items-start overflow-hidden border-l w-48 h-44 bg-white m-4 pl-4 pt-2"> 
              <h1 className=" w-full h-6 text-center text-lg font-extrabold leading-none border-b-2 tracking-tight  text-black">{product.name}</h1>
              <p className=" w-full h-24 text-start text-lg leading-none tracking-tight border-b-2 text-black">{product.description}</p>
              <div className="flex justify-start items-center flex-row w-full h-8 pt-4">
                <p className="flex justify-start text-center items-center text-lg font-extrabold">{product.points}</p>   
                <p className="flex justify-center text-center items-center text-lg font-extrabold ml-2 text-white rounded-lg w-20 h-9 pb-1 bg-slate-800"> points</p>
                <button className="flex justify-center items-center text-2xl font-extrabold w-14 h-9 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400">+</button>
              </div>
            </div> 
          </div>
        )}));
}





