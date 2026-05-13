import React, { useState } from "react";
import "./Contacto.css";

function contacto() {

  const [mensaje, setMensaje] = useState("");

  const enviarFormulario = (e) => {
    e.preventDefault();
    e.target.reset();
    setMensaje("Mensaje enviado correctamente ✅");
  };

  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container d-flex justify-content-between align-items-center">

          {/* LOGO + NOMBRE */}
          <div className="d-flex align-items-center">
            <img src={logo} alt="logo" width="50" />
            <span className="navbar-brand ms-2">LUNCHSERVICE</span>
          </div>

          {/* BOTONES */}
          <div className="nav-buttons">
            <a href="#" className="nav-btn">Inicio</a>
            <a href="#" className="nav-btn">Servicios</a>
          </div>

        </div>
      </nav>

      {/* HERO */}
      <div className="hero text-center">
        <img src={logo} className="logo" alt="logo" />
        <h1>Contáctanos</h1>
        <p>Plataforma de gestión de programas alimenticios escolares</p>
      </div>

      {/* CONTENIDO */}
      <div className="container mt-5">
        <div className="row">

          {/* INFORMACIÓN */}
          <div className="col-md-6">
            <h3>Sobre el proyecto</h3>
            <p>
              LUNCHSERVICE es una plataforma digital que permite gestionar programas
              alimenticios en instituciones educativas, facilitando el control
              de estudiantes, pagos y minutas mensuales.
            </p>

            <h4 className="mt-4">Equipo de desarrollo</h4>
            <ul>
              <li>Sofia Bran Agudelo</li>
              <li>Valentina Acevedo Escobar</li>
              <li>Laura Daniela Rodriguez Toro</li>
            </ul>
          </div>

          {/* FORMULARIO */}
          <div className="col-md-6">
            <div className="card p-4 shadow form-box">

              <h4 className="text-center mb-3">Formulario de contacto</h4>

              <form onSubmit={enviarFormulario}>
                <input className="form-control mb-2" placeholder="Nombre completo" required />
                <input className="form-control mb-2" placeholder="Colegio" />
                <input className="form-control mb-2" placeholder="Teléfono" />
                <input type="email" className="form-control mb-2" placeholder="Correo electrónico" required />
                <textarea className="form-control mb-2" placeholder="Mensaje" required></textarea>

                <button className="btn btn-custom w-100">Enviar</button>
              </form>

              {mensaje && (
                <div className="alert alert-success text-center mt-3">
                  {mensaje}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* CONTACTO */}
      <div className="container text-center mt-5">
        <h4>Información de contacto</h4>

        <h5 className="mt-3">Correos Electrónicos</h5>
        <p>📧 sofia.bran299@pascualbravo.edu.co</p>
        <p>📧 valentina.acevedo@pascualbravo.edu.co</p>
        <p>📧 laura.rodriguez@pascualbravo.edu.co</p>

        <h5 className="mt-3">Teléfonos</h5>
        <p>📞 (+57) 301 505 4588</p>
        <p>📞 (+57) 319 294 1581</p>
        <p>📞 (+57) 302 275 4219</p>
      </div>

      {/* FOOTER */}
      <footer className="text-center mt-5">
        <p>© 2026 Lunchservice</p>
        <p>Institución Universitaria Pascual Bravo</p>
        <p>Proyecto académico</p>
      </footer>

    </div>
  );
}

export default contacto;

