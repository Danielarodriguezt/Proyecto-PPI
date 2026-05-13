import Swal from "sweetalert2";
import React, { useState } from "react";

//Función principal del regitro
function RegistroForm() {

    const [formData, setFormData] = useState({
        tipoUsuario: "",
        nombre: "",
        documento: "",
        grado: "",
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
                grado: "",
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

            if (!formData.nombre) {
                nuevosErrores.nombre = "El nombre es obligatorio";
            }

            if (!formData.grado) {
                nuevosErrores.grado = "El grado es obligatorio";
            }

            if (!formData.institucion) {
                nuevosErrores.institucion = "La institución es obligatoria";
            }

            if (!formData.correo) {
                nuevosErrores.correo = "El correo es obligatorio";
            } else if (!formData.correo.includes("@")) {
                nuevosErrores.correo = "Correo inválido";
            }
        }

        // Acudiente
        if (formData.tipoUsuario === "acudiente") {

            if (!formData.documento) {
                nuevosErrores.documento = "El documento es obligatorio";
            } else if (isNaN(formData.documento)) {
                nuevosErrores.documento = "Solo números";
            }

            if (!formData.nombre) {
                nuevosErrores.nombre = "El nombre es obligatorio";
            }

            if (!formData.estudiante) {
                nuevosErrores.estudiante = "El nombre del estudiante es obligatorio";
            }

            if (!formData.telefono) {
                nuevosErrores.telefono = "El teléfono es obligatorio";
            } else if (isNaN(formData.telefono)) {
                nuevosErrores.telefono = "Solo números";
            }
        }

        //Admin
        if (formData.tipoUsuario === "admin") {

            if (!formData.nombre) {
                nuevosErrores.nombre = "El nombre es obligatorio";
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
                    user.correo === formData.correo
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
                    user.correo === formData.correo
                );
            }

            return false;
        });

        // Si ya existe el usuario
        if (usuarioExistente) {
            Swal.fire({
                title: "Usuario ya registrado ⚠️",
                text: "Este usuario ya existe en el sistema",
                icon: "warning"
            });
            return; 
        }

        // Si  no existe lo guarda 
        usuariosGuardados.push(formData);

        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

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
            grado: "",
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
                <div className="fade" key="estudiante">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del estudiante"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    {errores.nombre && <span className="error">{errores.nombre}</span>}

                    <input
                        type="text"
                        name="grado"
                        placeholder="Grado"
                        value={formData.grado}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="institucion"
                        placeholder="Institución"
                        value={formData.institucion}
                        onChange={handleChange}
                    />

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
                <div className="fade" key="acudiente">
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
                <div className="fade" key="admin">
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
