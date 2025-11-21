import HeroBanner from "components/Home/HeroBanner";
import { lazy } from "react";
const ProductosDestacados = lazy(() => import("components/Home/ProductosDestacados"))
const BrandInformative = lazy(() => import("components/Home/BrandInformative"))

export function Home() {
  return (
    <>
      <HeroBanner />
      <BrandInformative />
      <ProductosDestacados />
    </>
  )
}
