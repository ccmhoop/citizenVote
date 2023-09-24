import { useState } from "react";
import ButtonDesign from "../components/ButtonDesign";
import ProductToShop from "../components/ProductToShop";

export default function ShopManagment() {
  const [selected, setSelected] = useState(false);

  function handleSelected() {
    setSelected(!selected);
  }

  return (
    <div className="w-[100%] min-h-[88vh] flex justify-center items-start flex-wrap gap-2 bg-gradient-to-br from-indigo-800 to-rose-600">
      <div className="  min-w-[40vw] max-w-[95vw]  h-[88vh] flex flex-col justify-start items-center rounded-xl bg-white/80 overflow-y-scroll overflow-x-hidden  my-2 p-2">
        {selected ? (
          <div className="flex justify-center items-center flex-col my-auto">
            <ProductToShop />
            <div className="flex justify-start items-start "></div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-2">
            <button onClick={handleSelected}>
              <ButtonDesign
                title="Add Product to shop"
                 width="96" height="24" labelWidth="full" labelHeight="[60%]" labelPx="8" my="1" mx="0"
              />
            </button>
            <button onClick={handleSelected}>
              <ButtonDesign
                title="Remove Product from shop"
                width="96" height="24" labelWidth="full" labelHeight="[60%]" labelPx="8" my="1" mx="0"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
