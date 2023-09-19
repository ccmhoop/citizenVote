let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

const shopSession = {
    user_id : "",
    total : "",
    created_at: Date.now(),
    modified_at: Date.now(),
}

function saveCartToSessionStorage() {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // Function to add an item to the cart
  function addItem(id, points) {
    console.log("id ",id);
    if (typeof id !== "string" || isNaN(points) || points <= 0) {
      console.log("Invalid item information. Please provide a valid name and price.");
      return;
    }
    const itemExist = cart.find((item) => item.id === id);

    if(itemExist){
        itemExist.quantity++;
    }else{
    const item = {
      id: id,
      points: points,
      quantity: 1,
    };
    cart.push(item);
}
    saveCartToSessionStorage();
    console.log(`${id} added to the cart.`);
  }
  
  // Function to remove an item from the cart
  function removeItem(id) {
    const index = cart.findIndex((item) => item.id === id);
  
    if (index !== -1) {
      cart[index].quantity--;
      if(cart[index].quantity <= 0){
        cart.splice(index,1)
      }
      saveCartToSessionStorage();
    } else {
      console.log(`${id} not found in the cart.`);
    }
  }
  
  // Function to display the current cart contents
  function displayCart() {
    console.log("Current Cart:");
    cart.forEach((item) => {
      console.log(`${item.id} - Points : ${item.points} x ${item.quantity}`);
    });
  }
  
  // Function to calculate and display the total cost of items in the cart
  function displayTotalCost() {
    const totalCost = cart.reduce((total, item) => total + item.points * item.quantity, 0);
    console.log(`Total Cost: $${totalCost.toFixed(2)}`);
  }

  function displayQuantity(id){
    const index = cart.find((item) => item.id === id);
    if(index){
        return(index.quantity)
    }else{
        return(0)
    }
  }

    function returnIndex(id){
      const index = cart.findIndex((item) => item.id === id);
      if(index){
          return(index)
      }else{
          return(0)
      }
  }

  export {
    cart,
    addItem,
    removeItem,
    displayCart,
    displayTotalCost,
    displayQuantity,
    returnIndex
  };