import HeroBanner from "./HeroBanner";
import { lazy } from "react";
const ProductosDestacados = lazy(() => import("./ProductosDestacados"))

export default function Home() { 
  return (
    <>
      <HeroBanner />
      <ProductosDestacados />
    </>
  )
}