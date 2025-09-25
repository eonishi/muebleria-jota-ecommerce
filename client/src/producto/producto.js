import { actualizarCarrito, agregarAlCarrito } from "../carrito/cartHelper.js";

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

fetch("../data/productos.json")
  .then((res) => res.json())
  .then((productos) => {
    const producto = productos.find((p) => parseInt(p.id) === id);
    if (!producto) return;

    const contenedor = document.getElementById("detalle-producto");

    const img = document.createElement("img");
    img.src = producto.imagen;

    const infoDiv = document.createElement("div");
    infoDiv.className = "info";

    // Nombre
    const h1 = document.createElement("h1");
    h1.textContent = producto.product_name;

    // Descripción
    const pDesc = document.createElement("p");
    pDesc.textContent = producto.description;

    // Precio
    const pPrecio = document.createElement("p");
    pPrecio.className = "precio";
    pPrecio.textContent = producto.price || "";

    // Botón agregar
    const btnAgregar = document.createElement("button");
    btnAgregar.id = "add-to-cart";
    btnAgregar.className = "add-cart-btn";
    btnAgregar.textContent = "Añadir al carrito";
    btnAgregar.addEventListener("click", () => agregarAlCarrito(producto));

    infoDiv.append(h1, pDesc, pPrecio, btnAgregar);

    if (producto.specifications) {
      Object.entries(producto.specifications).forEach(([k, v]) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${k}:</strong> ${v}`;
        infoDiv.appendChild(p);
      });
    }

    contenedor.append(img, infoDiv);

    if (typeof actualizarCarrito === "function") actualizarCarrito();
  })
  .catch((e) => console.log(e));

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}
