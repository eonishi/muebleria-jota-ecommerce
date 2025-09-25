let productosGlobales = [];

// Función para cargar productos destacados...
function cargarDestacados(productos, cantidad = 3) {
  const contenedor = document.querySelector(".productos-container");
  if (!contenedor) return;

  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }

  const copia = [...productos];
  const seleccion = [];
  for (let i = 0; i < cantidad; i++) {
    if (copia.length === 0) break;
    const index = Math.floor(Math.random() * copia.length);
    seleccion.push(copia.splice(index, 1)[0]);
  }

  seleccion.forEach((p) => {
    const card = document.createElement("article");
    card.className = "producto";

    const link = document.createElement("a");
    link.href = `../producto/producto.html?id=${p.id}`;

    const img = document.createElement("img");
    img.src = p.imagen;
    img.alt = p.product_name;

    const nombre = document.createElement("h2");
    nombre.textContent = p.product_name;

    const desc = document.createElement("p");
    desc.textContent = p.description;

    link.appendChild(img);
    link.appendChild(nombre);
    link.appendChild(desc);

    card.appendChild(link);
    contenedor.appendChild(card);
  });
}

fetch("./data/productos.json")
  .then((res) => res.json())
  .then((productos) => {
    productosGlobales = productos;
    cargarDestacados(productosGlobales, 3);
  })
  .catch((error) =>
    console.error("Error al cargar los productos destacados:", error)
  );

// ---------------- Menú hamburguesa ----------------
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}
