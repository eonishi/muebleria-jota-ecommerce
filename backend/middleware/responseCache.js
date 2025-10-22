export default function responseCache(req, res, next){
  res.set('Cache-Control', 'public, max-age=300') // El navegador cachea la response 5 minutos
  next()
}