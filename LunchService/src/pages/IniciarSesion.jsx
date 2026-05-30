import React, { useState } from "react";
import Swal from "sweetalert2";
import "../components/registro.css";
import { useNavigate, Link } from "react-router-dom";
import MenuNav from "../components/Menu.jsx";
import Footer from "../components/Footer.jsx";

function IniciarSesion() {
    const navigate = useNavigate();

    const [datos, setDatos] = useState({
        correo: "",
        contrasena: "",
        tipoUsuario: ""
    });

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    const limpiarFormulario = () => {
        setDatos({
            correo: "",
            contrasena: "",
            tipoUsuario: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!datos.tipoUsuario || !datos.correo || !datos.contrasena) {
            Swal.fire("Error", "Completa todos los campos", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:5012/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo: datos.correo,
                    contrasena: datos.contrasena,
                    rol:
                        datos.tipoUsuario === "admin"
                            ? "Administrador"
                            : datos.tipoUsuario === "acudiente"
                                ? "Acudiente"
                                : "Estudiante"
                })
            });

            if (response.ok) {
                const usuario = await response.json();

                console.log(usuario);

                localStorage.setItem("sesionActiva", JSON.stringify(usuario));

                Swal.fire({
                    title: "Bienvenido 🎉",
                    text: `Hola ${usuario.correo}`,
                    icon: "success",
                    confirmButtonText: "Continuar"
                }).then(() => {
                    if (usuario.rol === "Estudiante") {
                        navigate("/PerfilEstudiante");
                    } else if (usuario.rol === "Acudiente") {
                        navigate("/PerfilAcudiente");
                    } else if (usuario.rol === "Administrador") {
                        navigate("/PerfilAdmin");
                    }
                });

                limpiarFormulario();
            } else {
                Swal.fire("Error", "Correo o contraseña incorrectos", "error");
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "No se pudo conectar con el servidor", "error");
        }
    };

    return (
        <div className="pagina-registro">
            <MenuNav />

            <div className="contenedor-principal">

                <div className="lado-imagen">
                    <img src="../public/logo_ls.jpg" alt="logo" />
                </div>

                <div className="lado-formulario">

                    <div className="registro-container">

                        <h1>Iniciar Sesión</h1>

                        <form className="formulario" onSubmit={handleSubmit} autoComplete="off">

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

                            <input
                                type="email"
                                name="correo"
                                placeholder="Correo"
                                value={datos.correo}
                                onChange={handleChange}
                                autoComplete="off"
                                spellCheck="false"
                            />

                            <input
                                type="password"
                                name="contrasena"
                                placeholder="Contraseña"
                                value={datos.contrasena}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />

                            <button type="submit">Ingresar</button>

                        </form>

                        <p>
                            ¿No tienes cuenta?{" "}
                            <Link to="/Registro" className="link">
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