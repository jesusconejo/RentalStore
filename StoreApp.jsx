import { Navigate, Routes, Route } from "react-router-dom"
import { Header } from "./src/component/Header"
import { Productos } from "./src/pages/Productos"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Login } from "./src/pages/Login"
import { CreateAcount } from "./src/pages/CreateAcount"
import { Admin } from "./src/pages/Admin"
import { Inicio } from "./src/pages/Inicio"
import { Footer } from "./src/component/Footer";
import { InfoUser } from "./src/pages/InfoUser";
import { ProtectedRoute } from "./src/component/ProtectedRoute"
import { AuthProvider } from './src/component/AuthProvider';
import './StoreApp.css'

export const StoreApp = () => {
  return (
    <AuthProvider>

      <div className="container-header">
        <Header />
      </div>
      <div className="container-fluid">
        <div className="container-body">
          <Routes>
            <Route path='/Productos' element={<Productos />}></Route>
            <Route path='/Login' element={<Login />}></Route>
            <Route path='/CreateAcount' element={<CreateAcount />}></Route>
            <Route
              path='/Admin'
              element={
                <ProtectedRoute roles={['admin','manager']}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path='/Inicio' element={<Inicio />}></Route>
            <Route path='/' element={<Inicio />}></Route>
            <Route path='/InfoUser' element={<InfoUser></InfoUser>}></Route>
          </Routes>
        </div>
      </div>
      <div className="container-footer">
        <Footer />
      </div>
    </AuthProvider>
  );
}

