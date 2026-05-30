import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/perfiles.css";
import Swal from "sweetalert2";

function PerfilAdmin() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [seccionActiva, setSeccionActiva] = useState("inicio");
    const [usuarios, setUsuarios] = useState([]);
    const [filtroUsuario, setFiltroUsuario] = useState("todos");
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    useEffect(() => {
        const sesion = JSON.parse(localStorage.getItem("sesionActiva"));

        if (!sesion || sesion.rol !== "Administrador") {
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

    // Ver perfil
    const verPerfil = (u) => {
        setUsuarioSeleccionado(u);
        setUsuarioEditando(null);
    };

    // Eliminar usuario
    const eliminarUsuario = (u) => {
        Swal.fire({
            title: "¿Eliminar usuario?",
            text: `¿Estás seguro de eliminar a ${u.nombre}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33"
        }).then((result) => {
            if (result.isConfirmed) {
                const nuevos = usuarios.filter(x => x !== u);
                localStorage.setItem("usuarios", JSON.stringify(nuevos));
                setUsuarios(nuevos);
                setUsuarioSeleccionado(null);
                Swal.fire("Eliminado", `${u.nombre} fue eliminado`, "success");
            }
        });
    };

    // Guardar edición
    const guardarEdicion = () => {
        const nuevos = usuarios.map(x => x === usuarioSeleccionado ? usuarioEditando : x);
        localStorage.setItem("usuarios", JSON.stringify(nuevos));
        setUsuarios(nuevos);
        setUsuarioSeleccionado(usuarioEditando);
        setUsuarioEditando(null);
        Swal.fire("Guardado", "Usuario actualizado correctamente", "success");
    };

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

                        {/* VISTA DETALLE DE USUARIO */}
                        {usuarioSeleccionado ? (
                            <>
                                <button className="btn-volver" onClick={() => { setUsuarioSeleccionado(null); setUsuarioEditando(null); }}>
                                    ← Volver a la lista
                                </button>

                                <h1>👤 Perfil de Usuario</h1>

                                {/* MODO EDICIÓN */}
                                {usuarioEditando ? (
                                    <div className="tarjeta-detalle">
                                        <div className="avatar-circulo grande">
                                            {usuarioEditando.nombre.charAt(0).toUpperCase()}
                                        </div>
                                        <span className={`badge-tipo ${usuarioEditando.tipoUsuario}`}>{usuarioEditando.tipoUsuario}</span>

                                        <div className="detalle-campo">
                                            <p className="label">Nombre</p>
                                            <input
                                                className="input-edicion"
                                                value={usuarioEditando.nombre}
                                                onChange={e => setUsuarioEditando({ ...usuarioEditando, nombre: e.target.value })}
                                            />
                                        </div>

                                        {usuarioEditando.correo !== undefined && (
                                            <div className="detalle-campo">
                                                <p className="label">Correo</p>
                                                <input
                                                    className="input-edicion"
                                                    value={usuarioEditando.correo}
                                                    onChange={e => setUsuarioEditando({ ...usuarioEditando, correo: e.target.value })}
                                                />
                                            </div>
                                        )}

                                        {usuarioEditando.telefono !== undefined && (
                                            <div className="detalle-campo">
                                                <p className="label">Teléfono</p>
                                                <input
                                                    className="input-edicion"
                                                    value={usuarioEditando.telefono}
                                                    onChange={e => setUsuarioEditando({ ...usuarioEditando, telefono: e.target.value })}
                                                />
                                            </div>
                                        )}

                                        <div className="detalle-acciones">
                                            <button className="btn-guardar" onClick={guardarEdicion}>💾 Guardar cambios</button>
                                            <button className="btn-cancelar" onClick={() => setUsuarioEditando(null)}>✕ Cancelar</button>
                                        </div>
                                    </div>

                                ) : (
                                    /* MODO VISTA */
                                    <div className="tarjeta-detalle">
                                        <div className="avatar-circulo grande">
                                            {usuarioSeleccionado.nombre.charAt(0).toUpperCase()}
                                        </div>
                                        <span className={`badge-tipo ${usuarioSeleccionado.tipoUsuario}`}>{usuarioSeleccionado.tipoUsuario}</span>

                                        <div className="detalle-campo">
                                            <p className="label">Nombre completo</p>
                                            <p className="valor">{usuarioSeleccionado.nombre}</p>
                                        </div>
                                        {usuarioSeleccionado.correo && (
                                            <div className="detalle-campo">
                                                <p className="label">Correo</p>
                                                <p className="valor">{usuarioSeleccionado.correo}</p>
                                            </div>
                                        )}
                                        {usuarioSeleccionado.documento && (
                                            <div className="detalle-campo">
                                                <p className="label">Documento</p>
                                                <p className="valor">{usuarioSeleccionado.documento}</p>
                                            </div>
                                        )}
                                        {usuarioSeleccionado.telefono && (
                                            <div className="detalle-campo">
                                                <p className="label">Teléfono</p>
                                                <p className="valor">{usuarioSeleccionado.telefono}</p>
                                            </div>
                                        )}
                                        {usuarioSeleccionado.grupo && (
                                            <div className="detalle-campo">
                                                <p className="label">Grupo</p>
                                                <p className="valor">{usuarioSeleccionado.grupo}</p>
                                            </div>
                                        )}
                                        {usuarioSeleccionado.institucion && (
                                            <div className="detalle-campo">
                                                <p className="label">Institución</p>
                                                <p className="valor">{usuarioSeleccionado.institucion.replace(/_/g, " ")}</p>
                                            </div>
                                        )}
                                        {usuarioSeleccionado.estudiante && (
                                            <div className="detalle-campo">
                                                <p className="label">Estudiante a cargo</p>
                                                <p className="valor">{usuarioSeleccionado.estudiante}</p>
                                            </div>
                                        )}

                                        <div className="detalle-acciones">
                                            <button className="btn-editar-perfil" onClick={() => setUsuarioEditando({ ...usuarioSeleccionado })}>
                                                ✏️ Editar
                                            </button>
                                            <button className="btn-eliminar" onClick={() => eliminarUsuario(usuarioSeleccionado)}>
                                                🗑️ Eliminar
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>

                        ) : (
                            /* LISTA DE USUARIOS */
                            <>
                                <h1>👥 Usuarios</h1>
                                <p className="subtitulo">{usuarios.length} usuario(s) registrado(s) en el sistema</p>

                                <div className="filtro-usuarios">
                                    {[
                                        { valor: "todos", label: "👥 Todos" },
                                        { valor: "estudiante", label: "🎒 Estudiantes" },
                                        { valor: "acudiente", label: "👨‍👩‍👧 Acudientes" },
                                        { valor: "admin", label: "🛡️ Administradores" },
                                    ].map(btn => (
                                        <button
                                            key={btn.valor}
                                            className={`btn-filtro ${filtroUsuario === btn.valor ? "activo" : ""}`}
                                            onClick={() => setFiltroUsuario(btn.valor)}
                                        >
                                            {btn.label}
                                            <span className="filtro-count">
                                                {btn.valor === "todos"
                                                    ? usuarios.length
                                                    : usuarios.filter(u => u.tipoUsuario === btn.valor).length}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="tabla-menu" style={{ marginTop: "16px" }}>
                                    {usuarios
                                        .filter(u => filtroUsuario === "todos" || u.tipoUsuario === filtroUsuario)
                                        .map((u, i) => (
                                            <div className="fila-menu fila-clickeable" key={i} onClick={() => verPerfil(u)}>
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
                                                <div style={{ color: "#c5cad4", fontSize: "18px" }}>›</div>
                                            </div>
                                        ))
                                    }
                                </div>

                                {usuarios.filter(u => filtroUsuario === "todos" || u.tipoUsuario === filtroUsuario).length === 0 && (
                                    <p style={{ color: "#c5cad4", marginTop: "20px" }}>No hay usuarios de este tipo registrados.</p>
                                )}
                            </>
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
