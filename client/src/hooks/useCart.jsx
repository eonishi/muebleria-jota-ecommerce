import { useEffect, useState } from "react";
import { parsePrice } from "utils/currency";

export default function useCart() {
  let carritoInStorage
  // Por si falla el parseo del JSON con los datos del sessionStorage
  // me paso que fallo y revienta toda la pagina
  try {
    carritoInStorage = JSON.parse(sessionStorage.getItem("cart"))
  } catch (e) { 
    console.warn("Carrito corrupto en sessionStorage", e);
    sessionStorage.removeItem("cart")
  }

  // Estados del carrito
  const [cart, setCart] = useState(carritoInStorage || [])
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(cart))
  const [quantity, setQuantity] = useState(calculateQuantity(cart))

  function commitNewCart(newCart) {
    setCart(newCart)
    sessionStorage.setItem("cart", JSON.stringify(newCart))
  }

  function changeCart(changeFunction) { 
    const newCart = changeFunction(cart)
    commitNewCart(newCart)
  }

  function addProduct(product) { 
    if (cart.some(p => p.id === product.id)) {
      increaseProduct(product.id)
    } else {
      changeCart(cart => [...cart, {...product, cantidad: 1}])
    }
  }

  function removeProduct(productId) { 
    changeCart(cart => {
      const newCart = cart.filter(p => p.id !== productId)
      return newCart
    })
  }

  function changeProductInCart(productId, changeFunction) { 
    changeCart(cart => { 
      const newCart = cart
        .map(p => p.id === productId ? changeFunction(p) : p )
        .filter(p => p.cantidad > 0)
      return newCart
    })
  }

  function increaseProduct(productId) { 
    changeProductInCart(productId, p => ({...p, cantidad: ++p.cantidad}))
  }
  function decreaseProduct(productId) { 
    changeProductInCart(productId, p => ({...p, cantidad: --p.cantidad}))
  }

  useEffect(() => { 
    // Recalcular total cada vez que cambia el carrito
    // Estaria buena que suceda solo cuando tiene que renderizar el total
    setQuantity(calculateQuantity(cart))
    setTotalPrice(calculateTotalPrice(cart))
  }, [cart])
  
  return {
    items: cart,
    addProduct,
    removeProduct,
    increaseProduct,
    decreaseProduct,
    totalPrice,
    quantity
  }
}

// Aux
function calculateTotalPrice(cart) {
  return cart.length ?
    Array.from(cart, p => p.cantidad * parsePrice(p.price))
        .reduce((acc, num) => acc + num)
    : 0
}
function calculateQuantity(cart) {
  return cart.length ?
    Array.from(cart, p => p.cantidad)
      .reduce((acc, cant) => acc + cant)
    : 0
}
