import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import Categories from './components/Categories/Categories'
import UserContext from './context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const routes =createBrowserRouter([
  {path: "", element: <Layout />
  , children: [
    {index: true, element:<ProtectedRoute><Home /></ProtectedRoute>},
    {path: "products", element: <ProtectedRoute><Products /></ProtectedRoute>},
    {path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
    {path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute>},
    {path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute>},
    {path: "login", element: <Login />},
    {path: "register", element: <Register />},
    {path: "*", element: <Notfound />},
  ]
  },
])

function App() {


  return <UserContext>
     <RouterProvider router={routes} />
  </UserContext>
}

export default App
