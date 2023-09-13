import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";


export default function Store (){

    const [products,setProducts] = useState({
        id: "",
        name: "",
        image: []
    })

    useEffect(()=>{
        async function getStoreData(){
            const response = await axios.get('http://localhost:8080/api/v1/auth/auth/ptest/26')
            .then((res) => setProducts(res.data))
        }
         getStoreData();
    },[]);


    const handleClick = () =>{
        console.log(products)
        console.log(products.image)
    }

    return (
        <div>
            <button onClick={handleClick}>Products</button>
            {/* <img src={img}/> */}
            <img src={products.image[0]}  alt="logo"/>
            <img src={products.image[1]}  alt="logo"/>
        </div>
    )
    }