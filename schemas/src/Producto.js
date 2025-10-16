import z from "zod";

const IMAGE_MIME_TYPE = ["image/jpeg","image/jpg", "image/png", "image/webp"];
const IMAGE_MAX_SIZE = 5_000_000; // 5MB

export const NuevoProductoSchema = z.object({
	//id: z.number(),
	product_name: z.string().trim().min(1, "El nombre del producto es requerido."),
	//imagen: z.string().optional(),
	imagen: z.file().mime(IMAGE_MIME_TYPE).max(IMAGE_MAX_SIZE).optional().or(z.literal(null)), // max(10MB)
	description: z.string().trim().optional(),
	price: z.coerce.number().positive("El precio debe ser mayor a 0"),
	stock: z.coerce.number().positive("La cantidad debe ser mayor a 0").optional(),
	specifications: z.array(z.object({
				key: z.string().trim().min(1, "La característica no puede estar vacía."),
				value: z.string().trim().min(1, "El detalle no puede estar vacío."),
			}))
		.optional()
		.refine(
			(items) => {
				if (!items) return true // Si es opcional y no está, pasa
				const keys = items.map((item) => item.key)
				return new Set(keys).size === keys.length
			},
			{
				message: "Las características no pueden estar repetidas.",
			})
		// Transforma el array en un objeto ANTES de que llegue al onSubmit
		.transform((items) => {
			if (!items) return {} // Si no hay items, devuelve un objeto vacío
			return items.reduce((acc, item) => {
				acc[item.key] = item.value
				return acc
			}, {})
		}),
})