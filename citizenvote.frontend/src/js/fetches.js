import { useState } from "react";
import axios from "axios";

// const [error,setError] = useState("")
// const [product,setProduct] = useState({})
// const [user,setUser] = useState({})

export const products = () => axios
    .get("http://localhost:8080/api/v1/auth/auth/11")
    .then((res) => res.data)
    


