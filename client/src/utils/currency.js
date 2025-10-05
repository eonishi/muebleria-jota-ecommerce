
// Para convertir un number de precio (ej 12345) a string (ej "$ 12.345")
export function stringifyPrice(price) { 
  return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
		maximumFractionDigits: 0,
	}).format(price)
}

// Para convertir un string de precio (ej "$ 12.345") a number
export function parsePrice(priceStr) { 
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10)
}
