export default function responseCache(req, res, next){
  res.set('Cache-Control', 'public, max-age=10') // El navegador cachea la response 10s
  next()
}