import axios from "axios";
import { getToken } from "./getToken";
import { cart, fetchTotalCost } from "./shoppingSession";

const completeOrder = async (apiUrl) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //Delete total
    const details = [{
      total: 20000,
      userId: getToken().token,
      token: getToken().token,
      orderItems: []
    }];

    for (let i = 0; i < cart.length; i++) {
      const item = {
        id: cart[i].id,
        quantity: cart[i].quantity
      };
      details[0].orderItems.push(item);
    }
    const response = await axios.post(`${apiUrl}`,details,{
        headers:{
        Authorization: `Bearer ${getToken().token}`,
        }})
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default completeOrder;



