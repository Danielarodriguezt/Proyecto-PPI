
function ImagenLateralIZ() {
  return (
    <div className="text-image-container">

      {/* 👈 IMAGEN PRIMERO */}
      <div className="img-container-left">
        <img
          src="/QS.jpg"
          className="rounded-5 img-fluid"
          alt="Imagen"
        />
      </div>

      {/* 👈 TEXTO DESPUÉS */}
      <div className="text-box">
        <div>
          <h1>Conoce a nuestro equipo de trabajo</h1>
          <p>
            Nos caracterizamos por un ambiente de trabajo sano.
            En nuestro equipo prevalece el respesto, el apoyo y la colaboración.

            <button className="btn-main-IZ">
              Conocer
            </button>
          </p>
        </div>
      </div>

    </div>
  );
}

export default ImagenLateralIZ;