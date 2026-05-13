import React, { useState } from "react";
import Swal from "sweetalert2";
import "../components/registro.css";
import MenuNav from "../components/Menu";

//Se crea la función principal de iniciar sesión y también para poder cambiar a registro
function IniciarSesion({ cambiarVista }) {

    //Se guardan los datos del formulario
    const [datos, setDatos] = useState({
        correo: "",
        documento: "",
        tipoUsuario: "",
        telefono: "",
        nombre: "",
        grado: ""
    });

    // Limpiar el formulario
    const limpiarFormulario = () => {
        setDatos({
            tipoUsuario: "",
            correo: "",
            documento: "",
            telefono: "",
            nombre: "",
            grado: ""
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
                grado: ""
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
            if (!datos.nombre || !datos.grado || !datos.correo) {
                Swal.fire({
                    title: "Error",
                    text: "Completa todos los campos",
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
                    user.correo === datos.correo
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
    <>
        <MenuNav />

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

                        <input
                            type="text"
                            name="grado"
                            placeholder="Grado"
                            value={datos.grado}
                            onChange={handleChange}
                        />

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
                ¿No te encuentras registrado?
                <span
                    className="link"
                    onClick={() => cambiarVista("registro")}>
                    Regístrate
                </span>
            </p>
        </div>
    </>
);
}
export default IniciarSesion;
