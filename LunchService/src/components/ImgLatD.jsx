function ImagenLateralD() {
    return (
        <div className="text-image-container">

            {/* Texto izquierda */}
            <div className="text-box">
                <h1>Bienvenidos</h1>
                <p>
                    LunchService es una plataforma que permite gestionar
                    programas de alimentación escolar en las instituciones educativas. 

                </p>

                <button className="btn-main-D">
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

        </div>
    );
}

export default ImagenLateralD;