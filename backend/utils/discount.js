export function parseDiscount(discount = 0) {
  if (typeof discount === "string") { discount = Number(discount) }
  if (!discount) { return 0 }
  if (discount > 0 && discount < 1) { return discount }
  if (discount >= 1 && discount <= 100) { return discount / 100 }
  return 0
}

export function applyDiscount(price, discount) {
  discount = parseDiscount(discount)
  if (discount === 0) { return price }
  return price * (1 - discount)
}
