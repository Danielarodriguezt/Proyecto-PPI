import { useState } from "react";

const IconoBienvenidos = () => (
  <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "60px", flexShrink: 0 }}>
    <ellipse cx="100" cy="85" rx="55" ry="10" fill="#c2cbd4" />
    <ellipse cx="100" cy="80" rx="55" ry="10" fill="#e8ecef" />
    <path d="M45 80 Q100 40 155 80" fill="#313852" />
    <ellipse cx="100" cy="80" rx="55" ry="8" fill="#4a5568" />
    <ellipse cx="100" cy="52" rx="10" ry="5" fill="#313852" />
    <rect x="96" y="52" width="8" height="10" fill="#313852" />
    <rect x="30" y="30" width="3" height="55" rx="1.5" fill="#c2cbd4" />
    <rect x="27" y="30" width="2" height="18" rx="1" fill="#c2cbd4" />
    <rect x="33" y="30" width="2" height="18" rx="1" fill="#c2cbd4" />
    <rect x="167" y="30" width="3" height="55" rx="1.5" fill="#c2cbd4" />
    <path d="M170 30 Q178 40 170 55" fill="#c2cbd4" />
    <path d="M85 38 Q82 30 85 22 Q88 14 85 6" fill="none" stroke="#c2cbd4" strokeWidth="2" strokeLinecap="round" />
    <path d="M100 35 Q97 27 100 19 Q103 11 100 3" fill="none" stroke="#c2cbd4" strokeWidth="2" strokeLinecap="round" />
    <path d="M115 38 Q112 30 115 22 Q118 14 115 6" fill="none" stroke="#c2cbd4" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function ImagenLateralD() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="text-image-container">

      <div className="text-box">
        <h1>Bienvenidos</h1>
        <p>
          LunchService es una plataforma que permite gestionar
          programas de alimentación escolar en las instituciones educativas.
        </p>
        <button className="btn-main-D" onClick={() => setModalAbierto(true)}>
          Ver más
        </button>
      </div>

      <div className="img-container">
        <img
          src="/Lateral.jpg"
          className="rounded-5 img-fluid"
          alt="Imagen"
        />
      </div>

      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={() => setModalAbierto(false)}>✕</button>

            {/* Título con imagen al lado */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <IconoBienvenidos />
              <h2 style={{ margin: 0 }}>Sobre LunchService</h2>
            </div>

            <p>
              LunchService es una plataforma integral diseñada para gestionar programas
              de alimentación escolar en instituciones educativas privadas.
            </p>
            <p>
              Ofrecemos soluciones completas que van desde la planificación nutricional
              hasta la entrega diaria de alimentos, garantizando calidad, higiene y
              bienestar para cada estudiante.
            </p>
            <ul>
              <li>✓ Menús balanceados por nutricionistas</li>
              <li>✓ Gestión digital de pedidos</li>
              <li>✓ Reportes nutricionales mensuales</li>
              <li>✓ Atención personalizada por institución</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}

export default ImagenLateralD;
