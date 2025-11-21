import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './styles.css'
import { appRouter} from './App.jsx'

createRoot(document.getElementById('root')).render(
  <RouterProvider router={ appRouter }/>
)
