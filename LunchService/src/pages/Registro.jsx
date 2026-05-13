//Importamos react, el formulario y los estilos 
import React from "react";
import RegistroForm from "../components/RegistroForm.jsx";
import "../components/registro.css";
import Footer from "../components/Footer.jsx";
import MenuNav from "../components/Menu.jsx";

//Creamos la función principal 
function Registro({ cambiarVista }) {
    return (
        <>
        <MenuNav />
        
        <div className="registro-container">
            <h1>Registro de Usuario</h1>
            <RegistroForm />
            <p>
                ¿Ya tienes cuenta?{" "}
                <span className="link" onClick={() => cambiarVista("login")}>
                    Inicia sesión
                </span>
            </p>
        </div>

        <Footer />

        </>
    );
}

export default Registro;

