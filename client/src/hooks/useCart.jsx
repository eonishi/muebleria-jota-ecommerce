import { useEffect, useState } from "react";
import { parsePrice } from "utils/currency";
import { toast } from "sonner";

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

  function addProduct(product, amount = 1) {
    if (cart.some(p => p.id === product.id)) {
      increaseProduct(product.id, amount)
    } else {
      changeCart(cart => [...cart, { ...product, cantidad: amount }])
    }

    toast.success(`${product?.product_name} agregado al carrito.`, {
      className: "flex justify-start items-center font-body",
    })
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
        .map(p => p.id === productId ? changeFunction(p) : p)
        .filter(p => p.cantidad > 0)
      return newCart
    })
  }

  function increaseProduct(productId) {
    changeProductInCart(productId, p => ({ ...p, cantidad: ++p.cantidad }))
  }
  function decreaseProduct(productId) {
    changeProductInCart(productId, p => ({ ...p, cantidad: --p.cantidad }))
  }

  function clearCart() {
    commitNewCart([])
  }

  function changeProductAmount(productId, amount) {
    changeProductInCart(productId, p => ({ ...p, cantidad: amount }))
  }

  // processCart() : Boolean -> retorno un booleano para saber si el procesamiento fue exitoso
  function processCart() {
    // Preparo la info que voy a mandar al back: { prodId, cantidad }
    const body = { products: [] }
    for (const product of Object.values(cart)) {
      body.products.push({ product: product.id, amount: product.cantidad })
    }

    const isSuccess = fetch("/api/pedidos", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        if (!res.ok) { throw new Error("No se pudo procesar su carrito. Intente nuevamente") }
        toast.success("Pedido realizado 🎉")
        // Si el backend guardo correctamente la informacion del pedido ya no necesito guardar el carrito en el cliente
        clearCart()

        return true
      })
      .catch(err => {
        toast.error(err.message)
        return false
      })

    return isSuccess
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
    changeProductAmount,
    clearCart,
    totalPrice,
    quantity,
    processCart
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
