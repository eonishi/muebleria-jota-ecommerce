// Utilizo la nueva sintaxis de importación de JSON en ES Modules
// ya que la persistencia de momento es a través de un archivo JSON
// y no una base de datos.
// Proximamente cambiar a una base de datos real.
import productos from '../../data/productos.json' with { type: 'json' };

if (!Array.isArray(productos)) { 
    throw new Error('El archivo productos.json no contiene un array de productos')
}

export class ProductosModel { 
    static async getAll() { 
        return productos
    }

    static async getById({ id }) { 
        return productos.find(producto => producto.id === Number(id))
    }
}