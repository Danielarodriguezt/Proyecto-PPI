import { useState } from "react";
import "./Tarjetas.css";

const tarjetas = [
  {
    id: "instituciones",
    numero: "01",
    titulo: "Instituciones",
    img: "./Instituciones.jpg",
    alt: "Instituciones",
    descripcion: "Trabajamos con colegios privados comprometidos con el bienestar de sus estudiantes.",
  },
  {
    id: "formas-pago",
    numero: "02",
    titulo: "Formas de Pago",
    img: "/FormasDePago.png",
    alt: "Formas de Pago",
    descripcion: "Ofrecemos múltiples métodos de pago seguros y convenientes para las familias.",
  },
  {
    id: "beneficios",
    numero: "03",
    titulo: "Beneficios",
    img: "./Beneficios.jpg",
    alt: "Beneficios",
    descripcion: "Nuestros programas están diseñados para mejorar la salud y el rendimiento escolar.",
  },
];

function Tarjetas() {
  const [actual, setActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalData, setModalData] = useState(null);

  const irA = (idx) => setActual(idx);

  const abrirModal = (tarjeta) => {
    setModalData(tarjeta);
    setModalAbierto(true);
  };

  return (
    <section className="carrusel-section">

      {/* Encabezado */}
      <div className="carrusel-header">
        <h2>Conoce nuestros servicios</h2>
        <p>Todo lo que necesitas saber sobre LunchService en un solo lugar.</p>
      </div>

      <div className="carrusel-track">
        {tarjetas.map((t, i) => (
          <div
            key={t.id}
            className={`carrusel-card ${i === actual ? "carrusel-card--activa" : ""}`}
          >
            <div className="carrusel-card-img-wrap">
              <img src={t.img} alt={t.alt} className="carrusel-card-img" />
              <div className="carrusel-card-overlay" />
            </div>
            <div className="carrusel-card-body">
              <p className="carrusel-card-numero">{t.numero}</p>
              <h3 className="carrusel-card-titulo">{t.titulo}</h3>
              <p className="carrusel-card-desc">{t.descripcion}</p>
              <button className="carrusel-card-btn" onClick={() => abrirModal(t)}>
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Puntos de navegación */}
      <div className="carrusel-puntos">
        {tarjetas.map((_, i) => (
          <button
            key={i}
            className={`carrusel-punto ${i === actual ? "carrusel-punto--activo" : ""}`}
            onClick={() => irA(i)}
            aria-label={`Ir a tarjeta ${i + 1}`}
          />
        ))}
      </div>

      {/* Modal */}
      {modalAbierto && modalData && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal-box modal-box--grande" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={() => setModalAbierto(false)}>✕</button>
            <div className="modal-grande-inner">
              <img
                src={modalData.img}
                alt={modalData.alt}
                className="modal-grande-img"
              />
              <div className="modal-grande-contenido">
                <h2>{modalData.titulo}</h2>
                <p>{modalData.descripcion}</p>
                <ul>
                  {modalData.id === "instituciones" && <>
                    <li>✓ Colegios privados de alta calidad</li>
                    <li>✓ Convenios institucionales flexibles</li>
                    <li>✓ Atención personalizada por colegio</li>
                    <li>✓ Integración con sistema escolar</li>
                  </>}
                  {modalData.id === "formas-pago" && <>
                    <li>✓ Pago mensual o por período</li>
                    <li>✓ Transferencia bancaria</li>
                    <li>✓ Tarjeta débito y crédito</li>
                    <li>✓ Pago en línea seguro</li>
                  </>}
                  {modalData.id === "beneficios" && <>
                    <li>✓ Mejor concentración y rendimiento</li>
                    <li>✓ Hábitos alimenticios saludables</li>
                    <li>✓ Supervisión nutricional constante</li>
                    <li>✓ Variedad y equilibrio en cada comida</li>
                  </>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default Tarjetas;
