export default function NotFound(){
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
    }}>
      <h1 style={{fontWeight: 'bolder'}}>
        Página no encontrada
      </h1>
      <h2>Por favor regrese al <a href="/">Inicio</a></h2>
    </section>
  )
}