
export function normalizeString(str) {
		return str
			.normalize("NFD") // Separa los caracteres base de los diacríticos (tildes)
			.replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
			.toLowerCase()
}