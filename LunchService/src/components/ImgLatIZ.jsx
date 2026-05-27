import { useState } from "react";

function ImagenLateralIZ() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="text-image-container">

      <div className="img-container-left">
        <img
          src="./EquipodeTrabajo.jpg"
          className="rounded-5 img-fluid"
          alt="Imagen"
        />
      </div>

      <div className="text-box">
        <div>
          <h1>Conoce a nuestro equipo de trabajo</h1>
          <p>
            Nos caracterizamos por un ambiente de trabajo sano.
            En nuestro equipo prevalece el respeto y la colaboración.
          </p>
          <button className="btn-main-IZ" onClick={() => setModalAbierto(true)}>
            Conocer
          </button>
        </div>
      </div>

      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={() => setModalAbierto(false)}>✕</button>

            {/* Título con imagen al lado */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <img
                src="/Equipo.jpg"
                alt="Equipo de trabajo"
                style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }}
              />
              <h2 style={{ margin: 0 }}>Nuestro equipo</h2>
            </div>

            <p>
              Contamos con un equipo humano apasionado por la alimentación saludable
              y el bienestar infantil. Cada integrante aporta su experiencia para
              garantizar el mejor servicio.
            </p>
            <ul>
              <li>✓ Nutricionistas certificados</li>
              <li>✓ Chefs especializados en cocina escolar</li>
              <li>✓ Personal de logística y entrega</li>
              <li>✓ Equipo de atención a instituciones</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}

export default ImagenLateralIZ;
