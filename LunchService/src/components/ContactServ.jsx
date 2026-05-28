import { useState } from "react";
import "./ContactServ.css";

const teamMembers = [
  {
    name: "Sofía Bran Agudelo",
    email: "sofia.bran299@pascualbravo.edu.co",
    phone: "(+57) 300 545 4568",
    role: "Desarrolladora Frontend",
    initials: "SB",
  },
  {
    name: "Valentina Acevedo Escobar",
    email: "valentina.acevedo677@pascualbravo.edu.co",
    phone: "(+57) 319 294 1581",
    role: "Desarrolladora Backend",
    initials: "VA",
  },
  {
    name: "Laura Daniela Rodríguez Toro",
    email: "laura.rodriguez044@pascualbravo.edu.co",
    phone: "(+57) 302 275 4219",
    role: "Diseñadora UI/UX",
    initials: "LR",
  },
];

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    colegio: "",
    telefono: "",
    correo: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.colegio.trim()) newErrors.colegio = "El colegio es requerido";
    if (!formData.correo.trim()) newErrors.correo = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.correo))
      newErrors.correo = "Correo no válido";
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es requerido";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setEnviado(true);
    setFormData({ nombre: "", colegio: "", telefono: "", correo: "", mensaje: "" });
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <div className="contacto-page">
      {/* Hero */}
      <section className="contacto-hero">
        <div className="hero-bg-shape" />
        <div className="hero-content">
          <span className="hero-tag">Contáctanos</span>
          <h1 className="hero-title">Estamos aquí para ayudarte</h1>
          <p className="hero-subtitle">
            Plataforma de gestión de programas alimenticios escolares
          </p>
        </div>
      </section>

      <div className="contacto-body">
        {/* Sobre el proyecto + Formulario */}
        <section className="contacto-main-grid">
          {/* Columna izquierda */}
          <div className="info-col">
            <div className="info-card proyecto-card">
              <div className="info-card-icon">🍽️</div>
              <h2 className="info-card-title">Sobre el proyecto</h2>
              <p className="info-card-text">
                <strong>LUNCHSERVICE</strong> es una plataforma digital que
                permite gestionar programas alimenticios en instituciones
                educativas, facilitando el control de estudiantes, pagos y
                beneficiarios de manera eficiente y centralizada.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-dot" />
                  Control de estudiantes
                </div>
                <div className="feature-item">
                  <span className="feature-dot" />
                  Gestión de pagos
                </div>
                <div className="feature-item">
                  <span className="feature-dot" />
                  Registro de beneficiarios
                </div>
                <div className="feature-item">
                  <span className="feature-dot" />
                  Reportes y estadísticas
                </div>
              </div>
            </div>

            <div className="info-card equipo-card">
              <div className="info-card-icon">👩‍💻</div>
              <h2 className="info-card-title">Equipo de desarrollo</h2>
              <div className="team-list">
                {teamMembers.map((m) => (
                  <div key={m.name} className="team-member">
                    <div className="member-avatar">{m.initials}</div>
                    <div className="member-info">
                      <span className="member-name">{m.name}</span>
                      <span className="member-role">{m.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="form-col">
            <div className="form-card">
              <h2 className="form-title">Formulario de contacto</h2>
              <p className="form-subtitle">
                Escríbenos y te responderemos a la brevedad
              </p>

              {enviado && (
                <div className="success-banner">
                  ✅ ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label">Nombre completo *</label>
                  <input
                    className={`form-input ${errors.nombre ? "input-error" : ""}`}
                    type="text"
                    name="nombre"
                    placeholder="Ej: María González"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && (
                    <span className="error-msg">{errors.nombre}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Colegio o institución *</label>
                  <input
                    className={`form-input ${errors.colegio ? "input-error" : ""}`}
                    type="text"
                    name="colegio"
                    placeholder="Ej: Colegio San Ignacio"
                    value={formData.colegio}
                    onChange={handleChange}
                  />
                  {errors.colegio && (
                    <span className="error-msg">{errors.colegio}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Teléfono</label>
                    <input
                      className="form-input"
                      type="tel"
                      name="telefono"
                      placeholder="Ej: (+57) 300 000 0000"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Correo electrónico *</label>
                    <input
                      className={`form-input ${errors.correo ? "input-error" : ""}`}
                      type="email"
                      name="correo"
                      placeholder="correo@ejemplo.com"
                      value={formData.correo}
                      onChange={handleChange}
                    />
                    {errors.correo && (
                      <span className="error-msg">{errors.correo}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Mensaje *</label>
                  <textarea
                    className={`form-textarea ${errors.mensaje ? "input-error" : ""}`}
                    name="mensaje"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    rows={5}
                    value={formData.mensaje}
                    onChange={handleChange}
                  />
                  {errors.mensaje && (
                    <span className="error-msg">{errors.mensaje}</span>
                  )}
                </div>

                <button type="submit" className="submit-btn">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Información de contacto */}
        <section className="contacto-info-section">
          <h2 className="section-title">Información de contacto</h2>
          <div className="contact-cards-grid">
            <div className="contact-info-card">
              <div className="contact-icon">✉️</div>
              <h3 className="contact-info-title">Correos electrónicos</h3>
              <ul className="contact-list">
                {teamMembers.map((m) => (
                  <li key={m.email}>
                    <a href={`mailto:${m.email}`} className="contact-link">
                      {m.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">📱</div>
              <h3 className="contact-info-title">Teléfonos</h3>
              <ul className="contact-list">
                {teamMembers.map((m) => (
                  <li key={m.phone}>
                    <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="contact-link">
                      {m.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">🏫</div>
              <h3 className="contact-info-title">Institución</h3>
              <ul className="contact-list">
                <li className="contact-plain">Instituto Tecnológico Pascual Bravo</li>
                <li className="contact-plain">Medellín, Antioquia</li>
                <li className="contact-plain">Colombia</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}