import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/perfiles.css";

function PerfilEstudiante() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [seccionActiva, setSeccionActiva] = useState("inicio");

    useEffect(() => {
        const sesion = JSON.parse(localStorage.getItem("sesionActiva"));

        if (!sesion || sesion.rol !== "Estudiante") {
            navigate("/IniciarSesion");
        } else {
            setUsuario(sesion);
        }
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem("sesionActiva");
        navigate("/IniciarSesion");
    };

    if (!usuario) return null;

    const menuAlmuerzo = [
        { dia: "Lunes", plato: "Arroz con pollo", adicional: "Jugo de naranja + ensalada" },
        { dia: "Martes", plato: "Sopa de lentejas", adicional: "Pan + agua" },
        { dia: "Miércoles", plato: "Bandeja paisa", adicional: "Jugo de mango + arroz" },
        { dia: "Jueves", plato: "Pasta boloñesa", adicional: "Jugo de mora + pan" },
        { dia: "Viernes", plato: "Sancocho de res", adicional: "Jugo de guanábana + arroz" },
    ];

    return (
        <div className="perfil-pagina">

            {/* SIDEBAR */}
            <aside className="perfil-sidebar">
                <div className="perfil-logo">
                    <img src="/LogoMenu.png" alt="Logo" />
                </div>

                <div className="perfil-avatar">
                    <div className="avatar-circulo">
                        {usuario.nombre.charAt(0).toUpperCase()}
                    </div>
                    <h3>{usuario.nombre}</h3>
                    <span className="perfil-badge">Estudiante</span>
                </div>

                <nav className="perfil-nav">
                    <button
                        className={seccionActiva === "inicio" ? "activo" : ""}
                        onClick={() => setSeccionActiva("inicio")}
                    >
                        🏠 Inicio
                    </button>
                    <button
                        className={seccionActiva === "menu" ? "activo" : ""}
                        onClick={() => setSeccionActiva("menu")}
                    >
                        🍽️ Mi Menú de Almuerzo
                    </button>
                </nav>

                <button className="btn-cerrar-sesion" onClick={cerrarSesion}>
                    🚪 Cerrar Sesión
                </button>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="perfil-contenido">

                {/* INICIO */}
                {seccionActiva === "inicio" && (
                    <div className="seccion-fade">
                        <h1>¡Bienvenido, {usuario.nombre.split(" ")[0]}! 👋</h1>

                        <div className="tarjetas-info">
                            <div className="tarjeta-dato">
                                <span className="icono">👤</span>
                                <div>
                                    <p className="label">Nombre completo</p>
                                    <p className="valor">{usuario.nombre}</p>
                                </div>
                            </div>
                            <div className="tarjeta-dato">
                                <span className="icono">🏫</span>
                                <div>
                                    <p className="label">Institución</p>
                                    <p className="valor">{usuario.institucion.replace(/_/g, " ")}</p>
                                </div>
                            </div>
                            <div className="tarjeta-dato">
                                <span className="icono">📚</span>
                                <div>
                                    <p className="label">Grupo / Grado</p>
                                    <p className="valor">{usuario.grupo}</p>
                                </div>
                            </div>
                            <div className="tarjeta-dato">
                                <span className="icono">✉️</span>
                                <div>
                                    <p className="label">Correo</p>
                                    <p className="valor">{usuario.correo}</p>
                                </div>
                            </div>
                        </div>

                        <div className="estadistica-container">
                            <div className="estadistica">
                                <span className="num">5</span>
                                <span className="desc">Días de menú</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">✅</span>
                                <span className="desc">Suscripción activa</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">🍽️</span>
                                <span className="desc">Almuerzo incluido</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* MENÚ DE ALMUERZO */}
                {seccionActiva === "menu" && (
                    <div className="seccion-fade">
                        <h1>🍽️ Mi Menú de Almuerzo</h1>
                        <p className="subtitulo">Menú semanal asignado a tu institución</p>

                        <div className="tabla-menu">
                            {menuAlmuerzo.map((item, i) => (
                                <div className="fila-menu" key={i}>
                                    <div className="dia-col">{item.dia}</div>
                                    <div className="plato-col">
                                        <strong>{item.plato}</strong>
                                        <span>{item.adicional}</span>
                                    </div>
                                    <div className="estado-col">✅ Disponible</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default PerfilEstudiante;
