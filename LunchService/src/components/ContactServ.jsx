import { useState } from "react";
import "./ContactServ.css";

const TIPOS = ["Queja", "Reclamo", "Sugerencia", "Observación", "Otro"];

const IconoIG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const IconoFB = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const IconoWA = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25a244">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.107.549 4.09 1.51 5.814L.057 23.854a.5.5 0 00.608.608l6.042-1.453A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.6-.498-5.1-1.367l-.36-.214-3.733.898.915-3.733-.234-.374A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function ContactServ() {
  const [tipo, setTipo] = useState("Queja");
  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setForm({ nombre: "", correo: "", mensaje: "" });
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <section className="ct-sec">
      <div className="ct-enc">
        <h2 className="ct-h2">Contáctanos</h2>
        <p className="ct-sub">
          Estamos aquí para ayudarte. Escríbenos, llámanos o visítanos — con gusto te atendemos.
        </p>
      </div>

      <div className="ct-grid">
        {/* ── Columna info ── */}
        <div className="ct-info">
          <div className="ct-info-header">
            <div className="ct-info-header-icon">🍽️</div>
            <div className="ct-info-header-txt">
              <h4>LunchService</h4>
              <p>Gestión Escolar y Nutricional<br />Medellín, Colombia</p>
            </div>
          </div>

          <div className="ct-item">
            <div className="ct-icon">📞</div>
            <div>
              <p className="ct-label">Teléfono / WhatsApp</p>
              <a href="tel:+573001234567" className="ct-value">+57 300 123 4567</a>
              <a href="https://wa.me/573001234567" className="ct-whatsapp" target="_blank" rel="noreferrer">
                <IconoWA /> Escribir por WhatsApp
              </a>
            </div>
          </div>

          <div className="ct-item">
            <div className="ct-icon">📧</div>
            <div>
              <p className="ct-label">Correo electrónico</p>
              <a href="mailto:contacto@lunchservice.com.co" className="ct-value">
                contacto@lunchservice.com.co
              </a>
            </div>
          </div>

          <div className="ct-item">
            <div className="ct-icon">📍</div>
            <div>
              <p className="ct-label">Dirección</p>
              <p className="ct-value">Calle 45 # 32 - 18, El Poblado</p>
              <p className="ct-value-sub">Medellín, Antioquia, Colombia</p>
            </div>
          </div>

          <div className="ct-item">
            <div className="ct-icon">🕐</div>
            <div>
              <p className="ct-label">Horario de atención</p>
              <p className="ct-value">Lunes a viernes: 7:00 am – 5:00 pm</p>
              <p className="ct-value-sub">Sábados: 8:00 am – 12:00 pm</p>
            </div>
          </div>

          <div className="ct-redes">
            <p className="ct-redes-label">Síguenos en</p>
            <div className="ct-redes-links">
              <a href="https://instagram.com/lunchservice.co" target="_blank" rel="noreferrer" className="ct-red ct-red-ig">
                <IconoIG /> Instagram
              </a>
              <a href="https://facebook.com/lunchserviceco" target="_blank" rel="noreferrer" className="ct-red ct-red-fb">
                <IconoFB /> Facebook
              </a>
            </div>
          </div>
        </div>

        {/* ── Formulario ── */}
        <div className="ct-form-wrap">
          <h3 className="ct-form-titulo">Envíanos tu mensaje</h3>
          <p className="ct-form-sub">
            Quejas, reclamos, sugerencias u observaciones — te respondemos lo más pronto posible.
          </p>

          <div className="ct-tipos">
            {TIPOS.map((t) => (
              <button
                key={t}
                className={`ct-tipo-btn ${tipo === t ? "sel" : ""}`}
                onClick={() => setTipo(t)}
                type="button"
              >
                {t}
              </button>
            ))}
          </div>

          {enviado && (
            <div className="ct-exito">✅ ¡Mensaje enviado! Te responderemos pronto.</div>
          )}

          <form className="ct-form" onSubmit={handleSubmit}>
            <div className="ct-field">
              <label className="ct-field-label" htmlFor="nombre">Nombre completo</label>
              <input id="nombre" name="nombre" type="text" className="ct-input"
                placeholder="Tu nombre completo" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="ct-field">
              <label className="ct-field-label" htmlFor="correo">Correo electrónico</label>
              <input id="correo" name="correo" type="email" className="ct-input"
                placeholder="tucorreo@email.com" value={form.correo} onChange={handleChange} required />
            </div>
            <div className="ct-field">
              <label className="ct-field-label" htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" className="ct-input ct-textarea"
                placeholder="Escribe tu mensaje aquí..." value={form.mensaje}
                onChange={handleChange} required rows={5} />
            </div>
            <button type="submit" className="ct-btn">Enviar mensaje →</button>
          </form>
        </div>
      </div>
    </section>
  );
}
