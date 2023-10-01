import { useState, useEffect } from "react";
import { ShopProducts }  from "../components/ShopProducts";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Shop (){

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
        <div className="w-[100%] min-h-[88vh] flex justify-center items-start flex-wrap gap-2 bg-gradient-to-br from-indigo-800 to-rose-600">
        <div className="  min-w-[40vw] max-w-[95vw]  h-[88vh] flex flex-col justify-start items-start rounded-xl bg-white/80 my-4 overflow-hidden overflow-y-scroll">
        <div className='flex justify-center rounded-t-lg items-center h-fit w-full  bg-amber-400 font-bold px-2 py-2 '>
            <p className='flex justify-center items-center rounded-md w-52 px-2  h-10  bg-white text-xl text-slate-800'>Reward Shop</p>
        </div>
        <div className='flex justify-center  items-center h-fit w-full  bg-white font-bold px-2 py-2 mb-2 gap-x-2 '>
            <Link to="/" className='flex justify-center items-center rounded-md w-52 px-2  h-10  bg-slate-800 text-xl text-white'>home</Link>
            <Link to="/basket" className='flex justify-center items-center rounded-md w-52 px-2  h-10  bg-slate-800 text-xl text-white'>Shoppin Cart</Link>
        </div>
        <div className="flex justify-evenly items-center flex-row flex-wrap h-fit w-full px-2 ">
                {products.map((item) => (<ShopProducts key={item.id} product={item}/>))}
            </div></div>
        </div>
    )
}