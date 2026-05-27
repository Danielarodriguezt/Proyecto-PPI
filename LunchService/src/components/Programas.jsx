import { useState } from "react";
import "./Programas.css";

const programas = [
  {
    id: "menu",
    nombre: "Menú del día",
    imagenes: ["/Menu.jpg"],
    descripcion1:
      "En LunchService, ofrecemos un menú escolar completo preparado por nutricionistas certificados, con ingredientes frescos que potencian el rendimiento académico de tus hijos.",
    descripcion2:
      "Cada plato es balanceado con proteínas, carbohidratos y vegetales de temporada, garantizando una alimentación variada y deliciosa que los niños disfrutan.",
    nota: "*El menú varía según la institución educativa y la temporada.",
    incluye: ["Sopa o crema del día", "Proteína principal", "Dos guarniciones", "Ensalada fresca", "Jugo natural", "Postre saludable"],
    precio: "$180.000 / mes",
  },
  {
    id: "desayuno",
    nombre: "Desayuno",
    imagenes: ["/Desayuno.jpg"],
    descripcion1:
      "Nuestro desayuno está diseñado para activar el cerebro y el cuerpo desde las primeras horas, con los macronutrientes necesarios para una jornada escolar exitosa.",
    descripcion2:
      "Preparado con ingredientes naturales y de alta calidad, es la mejor forma de comenzar el día con energía, concentración y buen ánimo.",
    nota: "*El desayuno puede variar según disponibilidad de productos frescos.",
    incluye: ["Bebida caliente", "Huevos en preparación variada", "Pan integral o arepa", "Fruta de temporada", "Queso fresco"],
    precio: "$75.000 / mes",
  },
  {
    id: "lonchera",
    nombre: "Loncheras",
    imagenes: ["/Lonchera.jpg"],
    descripcion1:
      "En LunchService, ofrecemos loncheras que combinan nutrición, sabor y diversión, ¡perfectas para los más pequeños durante el recreo!",
    descripcion2:
      "Nuestras opciones están llenas de preparaciones que los niños disfrutan, promoviendo el consumo de frutas frescas y diversidad de presentaciones.",
    nota: "*La lonchera varía según la institución educativa.",
    incluye: ["Sándwich integral", "Fruta entera o en trozos", "Yogur natural", "Snack saludable", "Jugo natural 200ml"],
    precio: "$90.000 / mes",
  },
  {
    id: "premium",
    nombre: "Plan Premium",
    imagenes: ["/PlanPremium.jpg"],
    descripcion1:
      "Nuestra propuesta más completa: desayuno, almuerzo y lonchera en un solo paquete de alto valor nutricional, con ingredientes premium y atención personalizada.",
    descripcion2:
      "Ideal para familias que buscan garantizar una alimentación óptima durante toda la jornada escolar, con seguimiento nutricional mensual incluido.",
    nota: "*Los menús premium pueden personalizarse según alergias o intolerancias.",
    incluye: ["Desayuno completo", "Almuerzo completo", "Lonchera", "Hidratación permanente", "Informe nutricional", "Atención prioritaria"],
    precio: "$320.000 / mes",
  },
];

export default function Programas() {
  const [activo, setActivo] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const p = programas[activo];

  const cambiarPrograma = (i) => {
    setActivo(i);
    setImgIdx(0);
  };

  return (
    <section className="pg-sec">
      {/* Encabezado */}
      <div className="pg-enc">
        <h2 className="pg-h2">Nuestros Programas</h2>
        <p className="pg-sub">
          Opciones diseñadas por nutricionistas para el bienestar y rendimiento escolar de tus hijos.
        </p>
      </div>

      {/* Tabs */}
      <div className="pg-tabs">
        {programas.map((prog, i) => (
          <button
            key={prog.id}
            className={`pg-tab ${activo === i ? "activo" : ""}`}
            onClick={() => cambiarPrograma(i)}
          >
            {prog.nombre}
          </button>
        ))}
      </div>

      {/* Tarjeta */}
      <div className="pg-card" key={p.id}>
        {/* Imagen + carrusel */}
        <div className="pg-img-col">
          <div className="pg-img-wrap">
            <img src={p.imagenes[imgIdx]} alt={p.nombre} className="pg-img" />
          </div>
          <div className="pg-dots">
            {p.imagenes.map((_, i) => (
              <button
                key={i}
                className={`pg-dot ${imgIdx === i ? "on" : ""}`}
                onClick={() => setImgIdx(i)}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pg-info">
          <h3 className="pg-nombre">{p.nombre}</h3>
          <p className="pg-desc">{p.descripcion1}</p>
          <p className="pg-desc">{p.descripcion2}</p>
          <p className="pg-nota">{p.nota}</p>
          <div className="pg-precio-row">
            <span className="pg-precio">{p.precio}</span>
            <button className="pg-cta">Solicitar información</button>
          </div>
        </div>
      </div>
    </section>
  );
}
