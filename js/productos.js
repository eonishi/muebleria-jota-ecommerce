const productos = [
    {
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas en nogal sostenible con tiradores de latón, que combina funcionalidad y elegancia atemporal.",
        imagen: "images/Aparador Uspallata.png",
        link: "#"
    },
    {
        nombre: "Mesa de Centro Araucaria",
        descripcion: "Mesa de centro minimalista con sobre circular de mármol y base de madera de nogal, ideal como punto focal en salas contemporáneas.",
        imagen: "images/Mesa de Centro Araucaria.png",
        link: "#"
    },
    
    {
        nombre: "Biblioteca Recoleta",
        descripcion: "Sistema modular de estantes con estructura de acero Sage Green y repisas de roble claro, versátil y elegante para cualquier espacio.",
        imagen: "images/Biblioteca Recoleta.png",
        link: "#"
    }
    // Agregá más productos acá
];

const contenedorProductos = document.querySelector('.productos-grid');

function cargarProductos() {
    contenedorProductos.innerHTML = ""; // limpiar contenido
    productos.forEach(producto => {
        const card = document.createElement('article');
        card.classList.add('producto');

        card.innerHTML = `
            <a href="">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
            </a>
        `;
        contenedorProductos.appendChild(card);
    });
}

cargarProductos();