import { Link } from "react-router-dom";

function MenuNav() {
  return (
    <nav className="navbar bg-body-tertiary fixed-top py-3">
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">

        {/* Menú centrado */}
        <ul className="nav justify-content-center fs-4">

          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/"
            >
              Inicio
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/servicios"
            >
              Servicios
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/contacto"
            >
              Contacto
            </Link>
          </li>

        </ul>

        {/* Botones a la derecha */}
        <div className="d-flex gap-2">
          <Link to="/InicioSesion">
            <button className="btn btn-login rounded-pill fw-bold">
              Iniciar sesión
            </button>
          </Link>

          <Link to="/Registro">
            <button className="btn btn-register rounded-pill fw-bold">
              Registrarse
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default MenuNav;