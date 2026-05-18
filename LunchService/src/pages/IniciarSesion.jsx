import React, { useState } from "react";
import Swal from "sweetalert2";
import "../components/registro.css";
import { Link } from "react-router-dom";
import MenuNav from "../components/Menu.jsx";
import Footer from "../components/Footer.jsx";

//Se crea la función principal de iniciar sesión y también para poder cambiar a registro
function IniciarSesion() {

    //Se guardan los datos del formulario
    const [datos, setDatos] = useState({
        correo: "",
        documento: "",
        tipoUsuario: "",
        telefono: "",
        nombre: "",
        grupo: ""
    });

    // Limpiar el formulario
    const limpiarFormulario = () => {
        setDatos({
            tipoUsuario: "",
            correo: "",
            documento: "",
            telefono: "",
            nombre: "",
            grupo: ""
        });
    };

    //Función que se ejecuta cuanso se escribe en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "tipoUsuario") {
            setDatos({
                tipoUsuario: value,
                correo: "",
                documento: "",
                telefono: "",
                nombre: "",
                grupo: "",
            });
        } else {
            setDatos({
                ...datos,
                [name]: value
            });
        }
    };

    //Función que se ejecuta al enviar al formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // ------------------------------------------VALIDADCIONES---------------------
        //Validar cada tipo de usario
        if (!datos.tipoUsuario) {
            Swal.fire({
                title: "Error",
                text: "Selecciona el tipo de usuario",
                icon: "error"
            });
            return;
        }

        //Administrador
        if (datos.tipoUsuario === "admin") {
            if (!datos.correo || !datos.documento) {
                Swal.fire({
                    title: "Error",
                    text: "Completa correo y documento",
                    icon: "error"
                });
                return;
            }
        }

        // Acudiente
        if (datos.tipoUsuario === "acudiente") {
            if (!datos.documento || !datos.telefono) {
                Swal.fire({
                    title: "Error",
                    text: "Completa documento y teléfono",
                    icon: "error"
                });
                return;
            }
        }

        // Estudiante
        if (datos.tipoUsuario === "estudiante") {
            if (!datos.nombre.trim() || !datos.grupo || !datos.correo) {
                Swal.fire({
                    title: "Error",
                    text: "Completa todos los campos",
                    icon: "error"
                });
                return;
            }

            if (datos.nombre.trim().split(" ").length < 2) {
                Swal.fire({
                    title: "Error",
                    text: "Ingresa nombre y apellido",
                    icon: "error"
                });
                return;
            }
        }

        //----------------------------------Buscar usuario------------------------------------
        console.log("LOGIN:", datos);

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        console.log("USUARIOS:", usuarios);

        const usuarioEncontrado = usuarios.find((user) => {

            //Administrador
            if (datos.tipoUsuario === "admin") {
                return (
                    user.tipoUsuario === "admin" &&
                    user.correo === datos.correo &&
                    String(user.documento) === datos.documento
                );
            }

            //Acudiente
            if (datos.tipoUsuario === "acudiente") {
                return (
                    user.tipoUsuario === "acudiente" &&
                    String(user.documento) === datos.documento &&
                    user.telefono === datos.telefono
                );
            }

            //Estudiante
            if (datos.tipoUsuario === "estudiante") {
                return (
                    user.tipoUsuario === "estudiante" &&
                    user.correo.trim() === datos.correo.trim() &&
                    user.grupo === datos.grupo &&
                    user.nombre.trim().toLowerCase() === datos.nombre.trim().toLowerCase()
                );
            }

            return false;
        });

        //-----------------------------Resultado-----------------------------
        if (usuarioEncontrado) {
            Swal.fire({
                title: "Bienvenido 🎉",
                text: `Hola ${usuarioEncontrado.nombre}`,
                icon: "success"
            });
            limpiarFormulario();
        } else {
            Swal.fire({
                title: "Error",
                text: "Usuario no encontrado",
                icon: "error"
            });
            limpiarFormulario();
        }
    };

    return (
    <div className="pagina-registro">
        <MenuNav />

        <div className="contenedor-principal">

            {/* LADO IZQUIERDO */}
            <div className="lado-imagen">
                <img src="../public/logo_ls.jpg" alt="Colegio"/>
            </div>

            {/* LADO DERECHO */}
            <div className="lado-formulario">

                <div className="registro-container">

                    <h1>Iniciar Sesión</h1>

                    <form className="formulario" onSubmit={handleSubmit}>
                        
                        <select
                            name="tipoUsuario"
                            value={datos.tipoUsuario}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione tipo de usuario</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="acudiente">Acudiente</option>
                            <option value="admin">Administrador</option>
                        </select>

                        {/*Administrador */}
                        {datos.tipoUsuario === "admin" && (
                            <>
                                <input
                                    type="email"
                                    name="correo"
                                    placeholder="Correo"
                                    value={datos.correo}
                                    onChange={handleChange}
                                />

                                <input
                                    type="password"
                                    name="documento"
                                    placeholder="Documento"
                                    value={datos.documento}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        {/*Acudiente*/}
                        {datos.tipoUsuario === "acudiente" && (
                            <>
                                <input
                                    type="text"
                                    name="documento"
                                    placeholder="Documento"
                                    value={datos.documento}
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={datos.telefono}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        {/*Estudiante*/}
                        {datos.tipoUsuario === "estudiante" && (
                            <>
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={datos.nombre}
                                    onChange={handleChange}
                                />

                                <select
                                    name="grupo"
                                    value={datos.grupo}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione tu grado</option>
                                    <option value="Jardin">Jardín</option>
                                    <option value="Preescolar">Preescolar</option>
                                    <option value="1">1°</option>
                                    <option value="2">2°</option>
                                    <option value="3">3°</option>
                                    <option value="4">4°</option>
                                    <option value="5">5°</option>
                                    <option value="6">6°</option>
                                    <option value="7">7°</option>
                                    <option value="8">8°</option>
                                    <option value="9">9°</option>
                                    <option value="10">10°</option>
                                    <option value="11">11°</option>
                                </select>

                                <input
                                    type="email"
                                    name="correo"
                                    placeholder="Correo"
                                    value={datos.correo}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        <button type="submit">Ingresar</button>

                    </form>

                    <p>
                        ¿No te encuentras registrado?{" "}

                        <Link
                            to="/Registro"
                            className="link"
                        >
                            Regístrate
                        </Link>
                    </p>

                </div>

            </div>

        </div>

        <Footer />
    </div>
);
}

export default IniciarSesion;