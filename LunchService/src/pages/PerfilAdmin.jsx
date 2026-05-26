import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/perfiles.css";

function PerfilAdmin() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [seccionActiva, setSeccionActiva] = useState("inicio");
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const sesion = JSON.parse(localStorage.getItem("sesionActiva"));
        if (!sesion || sesion.tipoUsuario !== "admin") {
            navigate("/IniciarSesion");
        } else {
            setUsuario(sesion);
            const todos = JSON.parse(localStorage.getItem("usuarios")) || [];
            setUsuarios(todos);
        }
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem("sesionActiva");
        navigate("/IniciarSesion");
    };

    if (!usuario) return null;

    const pedidosDelDia = [
        { estudiante: "Carlos Pérez", institucion: "I.E San José", plato: "Arroz con pollo", estado: "Entregado" },
        { estudiante: "María López", institucion: "I.E Colombia", plato: "Bandeja paisa", estado: "Entregado" },
        { estudiante: "Juan García", institucion: "Colegio Militar", plato: "Pasta boloñesa", estado: "Pendiente" },
        { estudiante: "Laura Martínez", institucion: "I.E Antioquia", plato: "Sopa de lentejas", estado: "Entregado" },
        { estudiante: "Andrés Torres", institucion: "Colegio UPB", plato: "Sancocho de res", estado: "Pendiente" },
    ];

    const menus = [
        { dia: "Lunes", plato: "Arroz con pollo", adicional: "Jugo de naranja + ensalada" },
        { dia: "Martes", plato: "Sopa de lentejas", adicional: "Pan + agua" },
        { dia: "Miércoles", plato: "Bandeja paisa", adicional: "Jugo de mango + arroz" },
        { dia: "Jueves", plato: "Pasta boloñesa", adicional: "Jugo de mora + pan" },
        { dia: "Viernes", plato: "Sancocho de res", adicional: "Jugo de guanábana + arroz" },
    ];

    const estudiantes = usuarios.filter(u => u.tipoUsuario === "estudiante");
    const acudientes = usuarios.filter(u => u.tipoUsuario === "acudiente");
    const admins = usuarios.filter(u => u.tipoUsuario === "admin");

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
                    <span className="perfil-badge admin">Administrador</span>
                </div>

                <nav className="perfil-nav">
                    <button className={seccionActiva === "inicio" ? "activo" : ""} onClick={() => setSeccionActiva("inicio")}>
                        🏠 Inicio
                    </button>
                    <button className={seccionActiva === "usuarios" ? "activo" : ""} onClick={() => setSeccionActiva("usuarios")}>
                        👥 Ver Todos los Usuarios
                    </button>
                    <button className={seccionActiva === "pedidos" ? "activo" : ""} onClick={() => setSeccionActiva("pedidos")}>
                        📦 Ver Pedidos del Día
                    </button>
                    <button className={seccionActiva === "menus" ? "activo" : ""} onClick={() => setSeccionActiva("menus")}>
                        🍽️ Gestionar Menús
                    </button>
                    <button className={seccionActiva === "estadisticas" ? "activo" : ""} onClick={() => setSeccionActiva("estadisticas")}>
                        📊 Estadísticas Generales
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
                                <span className="icono">🪪</span>
                                <div>
                                    <p className="label">Documento</p>
                                    <p className="valor">{usuario.documento}</p>
                                </div>
                            </div>
                            <div className="tarjeta-dato">
                                <span className="icono">✉️</span>
                                <div>
                                    <p className="label">Correo</p>
                                    <p className="valor">{usuario.correo}</p>
                                </div>
                            </div>
                            <div className="tarjeta-dato">
                                <span className="icono">🛡️</span>
                                <div>
                                    <p className="label">Rol</p>
                                    <p className="valor">Administrador del sistema</p>
                                </div>
                            </div>
                        </div>

                        <div className="estadistica-container">
                            <div className="estadistica">
                                <span className="num">{usuarios.length}</span>
                                <span className="desc">Usuarios registrados</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">{pedidosDelDia.length}</span>
                                <span className="desc">Pedidos hoy</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">{pedidosDelDia.filter(p => p.estado === "Entregado").length}</span>
                                <span className="desc">Entregados</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* TODOS LOS USUARIOS */}
                {seccionActiva === "usuarios" && (
                    <div className="seccion-fade">
                        <h1>👥 Todos los Usuarios</h1>
                        <p className="subtitulo">{usuarios.length} usuario(s) registrado(s) en el sistema</p>

                        {["estudiante", "acudiente", "admin"].map(tipo => {
                            const lista = usuarios.filter(u => u.tipoUsuario === tipo);
                            if (lista.length === 0) return null;
                            return (
                                <div key={tipo} style={{ marginBottom: "30px" }}>
                                    <h3 style={{ color: "#313852", textTransform: "capitalize", marginBottom: "12px" }}>
                                        {tipo === "estudiante" ? "🎒 Estudiantes" : tipo === "acudiente" ? "👨‍👩‍👧 Acudientes" : "🛡️ Administradores"}
                                    </h3>
                                    <div className="tabla-menu">
                                        {lista.map((u, i) => (
                                            <div className="fila-menu" key={i}>
                                                <div className="dia-col">
                                                    <div className="avatar-mini">{u.nombre.charAt(0).toUpperCase()}</div>
                                                </div>
                                                <div className="plato-col">
                                                    <strong>{u.nombre}</strong>
                                                    <span>{u.correo || u.telefono || u.documento}</span>
                                                </div>
                                                <div className="estado-col">
                                                    <span className={`badge-tipo ${u.tipoUsuario}`}>{u.tipoUsuario}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {usuarios.length === 0 && (
                            <p style={{ color: "#666", marginTop: "20px" }}>No hay usuarios registrados aún.</p>
                        )}
                    </div>
                )}

                {/* PEDIDOS DEL DÍA */}
                {seccionActiva === "pedidos" && (
                    <div className="seccion-fade">
                        <h1>📦 Pedidos del Día</h1>
                        <p className="subtitulo">Estado de los pedidos de hoy</p>
                        <div className="tabla-menu">
                            <div className="fila-menu cabecera">
                                <div className="plato-col">Estudiante</div>
                                <div className="plato-col">Institución</div>
                                <div className="plato-col">Plato</div>
                                <div className="estado-col">Estado</div>
                            </div>
                            {pedidosDelDia.map((p, i) => (
                                <div className="fila-menu" key={i}>
                                    <div className="plato-col"><strong>{p.estudiante}</strong></div>
                                    <div className="plato-col">{p.institucion}</div>
                                    <div className="plato-col">{p.plato}</div>
                                    <div className="estado-col">
                                        <span className={p.estado === "Entregado" ? "badge-entregado" : "badge-pendiente"}>
                                            {p.estado === "Entregado" ? "✅" : "⏳"} {p.estado}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* GESTIONAR MENÚS */}
                {seccionActiva === "menus" && (
                    <div className="seccion-fade">
                        <h1>🍽️ Gestionar Menús</h1>
                        <p className="subtitulo">Menú semanal actual</p>
                        <div className="tabla-menu">
                            {menus.map((m, i) => (
                                <div className="fila-menu" key={i}>
                                    <div className="dia-col"><strong>{m.dia}</strong></div>
                                    <div className="plato-col">
                                        <strong>{m.plato}</strong>
                                        <span>{m.adicional}</span>
                                    </div>
                                    <div className="estado-col">
                                        <button className="btn-editar">✏️ Editar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ESTADÍSTICAS */}
                {seccionActiva === "estadisticas" && (
                    <div className="seccion-fade">
                        <h1>📊 Estadísticas Generales</h1>
                        <p className="subtitulo">Resumen del sistema LunchService</p>

                        <div className="estadistica-container grande">
                            <div className="estadistica">
                                <span className="num">{usuarios.length}</span>
                                <span className="desc">Total usuarios</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">{estudiantes.length}</span>
                                <span className="desc">Estudiantes</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">{acudientes.length}</span>
                                <span className="desc">Acudientes</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">{admins.length}</span>
                                <span className="desc">Administradores</span>
                            </div>
                        </div>

                        <div className="estadistica-container grande" style={{ marginTop: "20px" }}>
                            <div className="estadistica">
                                <span className="num">{pedidosDelDia.length}</span>
                                <span className="desc">Pedidos hoy</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">{pedidosDelDia.filter(p => p.estado === "Entregado").length}</span>
                                <span className="desc">Entregados</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">{pedidosDelDia.filter(p => p.estado === "Pendiente").length}</span>
                                <span className="desc">Pendientes</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">5</span>
                                <span className="desc">Menús activos</span>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default PerfilAdmin;
