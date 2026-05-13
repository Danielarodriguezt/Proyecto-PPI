function TarjetasServicios({ imagen, titulo, botonTexto }) {
  return (
    <div className="tarjeta-imagen">
      <img src={imagen} alt={titulo} className="tarjeta-img" />

      <div className="tarjeta-contenido">
        <h3>{titulo}</h3>
        <button className="btn-tarjeta">{botonTexto}</button>
      </div>
    </div>
    
  );
}

export default TarjetasServicios;