import { useState } from "react";
import axios from "axios";

const [error,setError] = useState("")
const [product,setProduct] = useState({})
const [user,setUser] = useState({})

export const userDetails = () =>{
    axios
    .get("")
    .then((res) => setUser(res.data))
    .catch((err) => {
      setError(err.message);
      console.log(error)
    });
}

export const products = () =>{
    axios
    .get("")
    .then((res) => setProduct(res.data))
    .catch((err) => {
      setError(err.message);
      console.log(error)
    });
}

