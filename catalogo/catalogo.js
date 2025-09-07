import { actualizarCarrito, agregarAlCarrito } from "../carrito/cartHelper.js";

let productosGlobales = [];

function limpiarContenedor() {
  const contenedor = document.getElementById("productos-grid");
  if (!contenedor) return;

  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

function cargarCatalogo(productos) {
  const contenedor = document.getElementById("productos-grid");
  if (!contenedor) return;

  limpiarContenedor();

  productos.forEach((p) => {
    const card = document.createElement("article");
    card.className = "producto";

    const link = document.createElement("a");
    link.href = `../producto/producto.html?id=${p.id}`;

    const img = document.createElement("img");
    img.src = p.imagen;
    img.alt = p.product_name;

    const nombre = document.createElement("h2");
    nombre.textContent = p.product_name;

    const precio = document.createElement("p");
    precio.textContent = `$${p.price}`;

    link.appendChild(img);
    link.appendChild(nombre);
    link.appendChild(precio);

    card.appendChild(link);

    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = "Añadir al carrito";

    // hace que el botón sume al carrito y no te lleve al detalle
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      agregarAlCarrito(p);
      actualizarCarrito();
    });

    card.appendChild(btn);

    card.appendChild(btn);

    contenedor.appendChild(card);
  });
}

fetch("../data/productos.json")
  .then((res) => res.json())
  .then((productos) => {
    productosGlobales = productos;
    cargarCatalogo(productosGlobales);
    actualizarCarrito();
  })
  .catch((error) => console.error("Error al cargar los productos:", error));

document.addEventListener("DOMContentLoaded", () => {
  const inputBuscador = document.getElementById("buscador");
  if (!inputBuscador) return;

  inputBuscador.addEventListener("input", () => {
    const texto = inputBuscador.value.toLowerCase();
    const filtrados = productosGlobales.filter((p) =>
      p.product_name.toLowerCase().includes(texto)
    );
    cargarCatalogo(filtrados);
  });
});

// ---------------- Menú hamburguesa ----------------
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}
