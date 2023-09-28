import { useState, useEffect } from "react";
import { ShopProducts }  from "../components/ShopProducts";
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
            <div className="w-[100%] h-fit flex justify-center items-start flex-wrap">
                {products.map((item) => (<ShopProducts key={item.id} product={item}/>))}
            </div>
        </div>
    )
}