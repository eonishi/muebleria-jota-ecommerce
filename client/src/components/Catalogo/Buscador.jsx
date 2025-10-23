
export default function Buscador({ setSearch }) { 
  return (
    <>
      <label htmlFor="buscador"></label>
      <input type="text" name="buscador" id="buscador" placeholder="Buscar producto..."
        onChange={(e) => {
          setSearch({ q: e.target.value })
        }}
      />
    </>
  )
}