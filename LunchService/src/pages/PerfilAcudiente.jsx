import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/perfiles.css";

function PerfilAcudiente() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [seccionActiva, setSeccionActiva] = useState("inicio");

    useEffect(() => {
        const sesion = JSON.parse(localStorage.getItem("sesionActiva"));
        if (!sesion || sesion.tipoUsuario !== "acudiente") {
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

    const pagosRealizados = [
        { fecha: "01/04/2025", concepto: "Almuerzo - Abril", monto: "$120.000", estado: "Pagado" },
        { fecha: "03/03/2025", concepto: "Almuerzo - Marzo", monto: "$120.000", estado: "Pagado" },
        { fecha: "02/02/2025", concepto: "Almuerzo - Febrero", monto: "$110.000", estado: "Pagado" },
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
                    <span className="perfil-badge acudiente">Acudiente</span>
                </div>

                <nav className="perfil-nav">
                    <button
                        className={seccionActiva === "inicio" ? "activo" : ""}
                        onClick={() => setSeccionActiva("inicio")}
                    >
                        🏠 Inicio
                    </button>
                    <button
                        className={seccionActiva === "estudiante" ? "activo" : ""}
                        onClick={() => setSeccionActiva("estudiante")}
                    >
                        🎒 Ver Estudiante Asociado
                    </button>
                    <button
                        className={seccionActiva === "pagos" ? "activo" : ""}
                        onClick={() => setSeccionActiva("pagos")}
                    >
                        💳 Ver Pagos Realizados
                    </button>
                    <button
                        className={seccionActiva === "pagar" ? "activo" : ""}
                        onClick={() => setSeccionActiva("pagar")}
                    >
                        💰 Realizar un Pago
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
                                <span className="icono">🎒</span>
                                <div>
                                    <p className="label">Estudiante a cargo</p>
                                    <p className="valor">{usuario.estudiante}</p>
                                </div>
                            </div>
                            <div className="tarjeta-dato">
                                <span className="icono">📞</span>
                                <div>
                                    <p className="label">Teléfono</p>
                                    <p className="valor">{usuario.telefono}</p>
                                </div>
                            </div>
                        </div>

                        <div className="estadistica-container">
                            <div className="estadistica">
                                <span className="num">3</span>
                                <span className="desc">Pagos realizados</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">✅</span>
                                <span className="desc">Al día</span>
                            </div>
                            <div className="estadistica">
                                <span className="num">Mayo</span>
                                <span className="desc">Próximo pago</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ESTUDIANTE ASOCIADO */}
                {seccionActiva === "estudiante" && (
                    <div className="seccion-fade">
                        <h1>🎒 Estudiante Asociado</h1>
                        <div className="tarjeta-grande">
                            <div className="avatar-circulo grande">
                                {usuario.estudiante.charAt(0).toUpperCase()}
                            </div>
                            <div className="info-estudiante">
                                <p className="label">Nombre del estudiante</p>
                                <p className="valor grande">{usuario.estudiante}</p>
                                <p className="label">Acudiente</p>
                                <p className="valor">{usuario.nombre}</p>
                                <p className="label">Teléfono de contacto</p>
                                <p className="valor">{usuario.telefono}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* PAGOS REALIZADOS */}
                {seccionActiva === "pagos" && (
                    <div className="seccion-fade">
                        <h1>💳 Pagos Realizados</h1>
                        <p className="subtitulo">Historial de pagos del servicio de almuerzo</p>
                        <div className="tabla-menu">
                            <div className="fila-menu cabecera">
                                <div className="dia-col">Fecha</div>
                                <div className="plato-col">Concepto</div>
                                <div className="monto-col">Monto</div>
                                <div className="estado-col">Estado</div>
                            </div>
                            {pagosRealizados.map((p, i) => (
                                <div className="fila-menu" key={i}>
                                    <div className="dia-col">{p.fecha}</div>
                                    <div className="plato-col"><strong>{p.concepto}</strong></div>
                                    <div className="monto-col">{p.monto}</div>
                                    <div className="estado-col">✅ {p.estado}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* REALIZAR PAGO */}
                {seccionActiva === "pagar" && (
                    <div className="seccion-fade">
                        <h1>💰 Realizar un Pago</h1>
                        <p className="subtitulo">Pago del servicio de almuerzo escolar</p>
                        <div className="tarjeta-pago">
                            <div className="pago-resumen">
                                <p><span className="label">Estudiante:</span> <strong>{usuario.estudiante}</strong></p>
                                <p><span className="label">Concepto:</span> <strong>Almuerzo escolar - Mayo 2025</strong></p>
                                <p><span className="label">Valor:</span> <strong className="monto-destacado">$120.000</strong></p>
                            </div>
                            <div className="pago-metodos">
                                <p className="label">Selecciona método de pago:</p>
                                <div className="metodos-grid">
                                    <div className="metodo-item">💳 Tarjeta de crédito</div>
                                    <div className="metodo-item">🏦 PSE</div>
                                    <div className="metodo-item">📱 Nequi</div>
                                    <div className="metodo-item">💵 Efectivo</div>
                                </div>
                            </div>
                            <button className="btn-pagar">Confirmar Pago</button>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default PerfilAcudiente;
