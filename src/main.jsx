import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import Details from './Details.jsx';

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/Details/:name",
    element:<Details/>
  }
])



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  < RouterProvider router={router}/>
  </StrictMode>,
)
