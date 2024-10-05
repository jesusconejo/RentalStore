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
import './StoreApp.css'

export const StoreApp = () => {
  return (
    <>

        <Header />

      <div className="container-body">
        <Routes>
          <Route path='/Productos' element={<Productos />}></Route>
          <Route path='/Login' element={<Login/>}></Route>          
          <Route path='/CreateAcount' element={<CreateAcount/>}></Route>
          <Route path='/Admin' element={<Admin/>}></Route>
          <Route path='/Inicio' element={<Inicio/>}></Route>
        </Routes>
      </div>
      <hr className="white-line" />
      <div className="container-footer">
        <Footer />
      </div>
    </>
  );
}

