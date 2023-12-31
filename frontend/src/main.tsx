import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import LandingPages from './pages/user/home.tsx';
import CariMobil from './pages/user/searchCar.tsx';
import 'admin-lte/plugins/fontawesome-free/css/all.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import './assets/lbd.css';
import './assets/animate.min.css';
import './assets/demo.css';
import Cars from './pages/admin/Cars.tsx';
import Home from './pages/admin/home.tsx';
import AddCar from './pages/admin/AddCar.tsx';
import { AuthProvider } from './AuthenticationContext';
import Login from './components/admin/Login.tsx';
import UpdateCar from './pages/admin/UpdateCar.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPages />,
  },
  
  {
    path: '/cars',
    element: <CariMobil />,
  },{
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin/*',
    element: (
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path='/car' element={<Cars />}></Route>
        <Route path='/car/add' element={<AddCar />}></Route>
        <Route path="/car/update/:carId" element={<UpdateCar/>} />
      </Routes>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
