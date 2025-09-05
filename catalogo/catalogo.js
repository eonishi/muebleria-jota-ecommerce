const productosContainer = document.querySelector('.productos-grid');

fetch('../productos.json')
    .then(response => response.json())
    .then(productos => {
        productos.forEach(producto => {
            const articulo = document.createElement('article');
            articulo.classList.add('producto');

            articulo.innerHTML = `
                <a href="../producto/producto.html?id=${producto.id}">
                    <img src="${producto.imagen}" alt="${producto.product_name}">
                    <h2>${producto.product_name}</h2>
                </a>
            `;

            productosContainer.appendChild(articulo);
        });
    })
    .catch(error => console.error('Error cargando los productos:', error));