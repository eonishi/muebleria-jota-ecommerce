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

        // Nombre del producto
        const h1 = document.createElement("h1");
        h1.textContent = producto.product_name; // <-- tu campo

        // Descripción del producto
        const pDesc = document.createElement("p");
        pDesc.textContent = producto.description; // <-- tu campo

        // Precio del producto (si existe en tu JSON)
        const pPrecio = document.createElement("p");
        pPrecio.className = "precio";
        pPrecio.textContent = producto.precio != null ? `$${producto.precio}` : "";

        // Botón de agregar al carrito
        const btnAgregar = document.createElement("button");
        btnAgregar.id = "add-to-cart";
        btnAgregar.className = "add-cart-btn";
        btnAgregar.textContent = "Añadir al carrito";

        // Evento del botón
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

        actualizarCarrito();
    })
    
    .catch((e) => console.log(e));

// ---------------- Menú hamburguesa ----------------
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}