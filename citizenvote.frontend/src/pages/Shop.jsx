import React from "react";
import { ShopProducts } from "../components/ShopProducts";

export default function Shop (){
    return (
        <div className="w-[100%] min-h-[88vh] flex justify-center items-start flex-wrap gap-2 bg-gradient-to-br from-indigo-800 to-rose-600">
            <div className="w-[100%] h-fit flex justify-center items-start flex-wrap">
                <ShopProducts/>
            </div>
        </div>
    )
}