//Importamos react, el formulario y los estilos 
import React from "react";
import RegistroForm from "../components/RegistroForm.jsx";
import "../components/registro.css";
import Footer from "../components/Footer.jsx";
import MenuNav from "../components/Menu.jsx";
import { Link } from "react-router-dom";

//Creamos la función principal 
function Registro() {
    return (
        <div className="pagina-registro">

            <MenuNav />

            <div className="contenedor-principal">

                {/* Lado Izquierdo */}
                <div className="lado-imagen">
                    <img src="../public/logo_ls.jpg" alt="logo_ls" />
                </div>

                {/* Lado Derecho */}
                <div className="lado-formulario">
                    <div className="registro-container">
                        <h1>Registro de Usuario</h1>

                        <RegistroForm />

                        <p>
                            ¿Ya tienes una cuenta?{" "}
                            <Link
                                to="/IniciarSesion"
                                className="link"
                            >
                                Inicia Sesión
                            </Link>
                        </p>
                    </div>
                </div>

            </div>

            <Footer />

        </div>
    );
}
export default Registro;

