import HeroBanner from "./HeroBanner";
import { lazy } from "react";
const ProductosDestacados = lazy(() => import("./ProductosDestacados"))
const BrandInformative = lazy(() => import("./BrandInformative"))

export default function Home() {
  return (
    <>
      <HeroBanner />
      <BrandInformative />
      <ProductosDestacados />
    </>
  )
}
