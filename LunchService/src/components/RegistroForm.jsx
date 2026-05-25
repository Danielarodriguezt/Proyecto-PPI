import Swal from "sweetalert2";
import React, { useState } from "react";

//Función principal del regitro
function RegistroForm() {

    const [formData, setFormData] = useState({
        tipoUsuario: "",
        nombre: "",
        documento: "",
        grupo: "",
        institucion: "",
        estudiante: "",
        telefono: "",
        correo: ""
    });

    //se crea el estado de errores
    const [errores, setErrores] = useState({});


    //Limpiar el formulario cuando se cambia de usuario
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "tipoUsuario") {
            setFormData({
                tipoUsuario: value,
                nombre: "",
                documento: "",
                grupo: "",
                institucion: "",
                estudiante: "",
                telefono: "",
                correo: ""
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    //se crea la función para validar datos
    const validar = () => {
        let nuevosErrores = {};

        // EStudiante
        if (formData.tipoUsuario === "estudiante") {

            if (!formData.nombre.trim()) {
                nuevosErrores.nombre = "El nombre es obligatorio";
            } else if (formData.nombre.trim().split(" ").length < 2) {
                nuevosErrores.nombre = "Ingrese nombre y apellido";
            }

            if (!formData.institucion) {
                nuevosErrores.institucion = "La institución es obligatoria";
            }

            if (!formData.correo) {
                nuevosErrores.correo = "El correo es obligatorio";
            } else if (!formData.correo.includes("@")) {
                nuevosErrores.correo = "Correo inválido";
            }

            if (!formData.grupo) {
                nuevosErrores.grupo = "El grupo es obligatorio";
            }
        }

        // Acudiente
        if (formData.tipoUsuario === "acudiente") {

            if (!formData.documento) {
                nuevosErrores.documento = "El documento es obligatorio";
            } else if (isNaN(formData.documento)) {
                nuevosErrores.documento = "Solo números";
            }

            if (!formData.nombre.trim()) {
                nuevosErrores.nombre = "El nombre es obligatorio";
            } else if (formData.nombre.trim().split(" ").length < 2) {
                nuevosErrores.nombre = "Ingrese nombre y apellido";
            }

            if (!formData.estudiante) {
                nuevosErrores.estudiante = "El nombre del estudiante es obligatorio";
            } else if (formData.nombre.trim().split(" ").length < 2) {
                nuevosErrores.nombre = "Ingrese nombre y apellido";
            }

            if (!formData.telefono) {
                nuevosErrores.telefono = "El teléfono es obligatorio";
            } else if (isNaN(formData.telefono)) {
                nuevosErrores.telefono = "Solo números";
            }
        }

        //Admin
        if (formData.tipoUsuario === "admin") {

            if (!formData.nombre.trim()) {
                nuevosErrores.nombre = "El nombre es obligatorio";
            } else if (formData.nombre.trim().split(" ").length < 2) {
                nuevosErrores.nombre = "Ingrese nombre y apellido";
            }

            if (!formData.documento) {
                nuevosErrores.documento = "El documento es obligatorio";
            } else if (isNaN(formData.documento)) {
                nuevosErrores.documento = "Solo números";
            }

            if (!formData.correo) {
                nuevosErrores.correo = "El correo es obligatorio";
            } else if (!formData.correo.includes("@")) {
                nuevosErrores.correo = "Correo inválido";
            }
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    //se usa la validación
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validar()) return;

        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Se verifica que el usuario no este registrado
        const usuarioExistente = usuariosGuardados.find((user) => {

            // Administrador
            if (formData.tipoUsuario === "admin") {
                return (
                    user.tipoUsuario === "admin" &&
                    user.correo.trim() === formData.correo.trim()
                );
            }

            // Acudiente
            if (formData.tipoUsuario === "acudiente") {
                return (
                    user.tipoUsuario === "acudiente" &&
                    String(user.documento) === formData.documento
                );
            }

            // Estudiante
            if (formData.tipoUsuario === "estudiante") {
                return (
                    user.tipoUsuario === "estudiante" &&
                    user.correo.trim() === formData.correo.trim()
                );
            }

            return false;
        });

        // Si ya existe el usuario
        if (usuarioExistente) {
            Swal.fire({
                title: "Usuario ya registrado ⚠️",
                text: "Ya existe un usuario con estos datos",
                icon: "warning"
            });
            return;
        }

        // Si  no existe lo guarda 
        usuariosGuardados.push(formData);
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

        // Alerta
        Swal.fire({
            title: "Registro exitoso 🎉",
            text: "Usuario registrado correctamente",
            icon: "success",
            confirmButtonText: "OK"
        });

        setFormData({
            tipoUsuario: "",
            nombre: "",
            documento: "",
            grupo: "",
            institucion: "",
            estudiante: "",
            telefono: "",
            correo: ""
        });

        setErrores({});
    };

    return (
        <form className="formulario" onSubmit={handleSubmit}>

            {/*Tipo de usuario */}
            <select name="tipoUsuario" value={formData.tipoUsuario} onChange={handleChange} required>
                <option value="">Seleccione tipo de usuario</option>
                <option value="estudiante">Estudiante</option>
                <option value="acudiente">Acudiente</option>
                <option value="admin">Administrador</option>
            </select>

            {formData.tipoUsuario === "estudiante" && <h3>Datos del estudiante</h3>}
            {formData.tipoUsuario === "acudiente" && <h3>Datos del acudiente</h3>}
            {formData.tipoUsuario === "admin" && <h3>Datos del administrador</h3>}

            {/* FORMULARIO ESTUDIANTE */}
            {formData.tipoUsuario === "estudiante" && (
                <div className="campos-form" key="estudiente">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del estudiante"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    {errores.nombre && <span className="error">{errores.nombre}</span>}

                    <select
                        name="grupo"
                        value={formData.grupo}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione Grupo</option>
                        <option value="Jardin">Jardín</option>
                        <option value="Presscolar">Preescolar</option>
                        <option value="1">1°</option>
                        <option value="2">2°</option>
                        <option value="3">3°</option>
                        <option value="4">4°</option>
                        <option value="5">5°</option>
                        <option value="6">6°</option>
                        <option value="7">7°</option>
                        <option value="8">8°</option>
                        <option value="9">9°</option>
                        <option value="10">10°</option>
                        <option value="11">11°</option>

                    </select>
                    {errores.grupo && <span className="error">{errores.grupo}</span>}

                    <select
                        name="institucion"
                        value={formData.institucion}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione la Institución</option>
                        <option value="i.e_san_jose">Institución Educativa San José</option>
                        <option value="i.e_colombia">Institución Educativa Colombia</option>
                        <option value="i.e_antioquia">Institución Educativa Antioquia</option>
                        <option value="colegio_militar">Colegio Militar</option>
                        <option value="colegio_adventista">Colegio Adventista</option>
                        <option value="i.e_villa">Intitución Educativa Villa de la Candelaria</option>
                        <option value="i.e_sadep">Institución Educativa San Antonio de Prado</option>
                        <option value="i.e_pascual">Instituto Técnico Industrial Pascual Bravo</option>
                        <option value="colegio_upb">Colegio UPB</option>
                        <option value="i.e_monseñor">Institución Educativa Monseñor </option>

                    </select>
                    {errores.institucion && <span className="error">{errores.institucion}</span>}

                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo"
                        value={formData.correo}
                        onChange={handleChange}
                    />
                    {errores.correo && <span className="error">{errores.correo}</span>}
                </div>
            )}

            {/* FORMULARIO ACUDIENTE */}
            {formData.tipoUsuario === "acudiente" && (
                <div className="campos-form" key="acudiente">
                    <input
                        type="text"
                        name="documento"
                        placeholder="Documento"
                        value={formData.documento}
                        onChange={handleChange}
                        required
                    />
                    {errores.documento && <span className="error">{errores.documento}</span>}

                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del acudiente"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                    {errores.nombre && <span className="error">{errores.nombre}</span>}

                    <input
                        type="text"
                        name="estudiante"
                        placeholder="Nombre del estudiante"
                        value={formData.estudiante}
                        onChange={handleChange}
                        required
                    />
                    {errores.estudiante && <span className="error">{errores.estudiante}</span>}

                    <input
                        type="number"
                        name="telefono"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                    {errores.telefono && <span className="error">{errores.telefono}</span>}
                </div>
            )}

            {/* FORMULARIO ADMIN */}
            {formData.tipoUsuario === "admin" && (
                <div className="campos-form" key="admin">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del administrador"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                    {errores.nombre && <span className="error">{errores.nombre}</span>}

                    <input
                        type="text"
                        name="documento"
                        placeholder="Documento"
                        value={formData.documento}
                        onChange={handleChange}
                        required
                    />
                    {errores.documento && <span className="error">{errores.documento}</span>}

                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                    {errores.correo && <span className="error">{errores.correo}</span>}
                </div>
            )}

            {/* Botón */}
            {formData.tipoUsuario && (
                <button type="submit">Registrar</button>
            )}

        </form>
    );
}

export default RegistroForm;
