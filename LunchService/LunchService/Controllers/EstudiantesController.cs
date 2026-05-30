using LunchServiceAPI.Models.Academico;
using Microsoft.AspNetCore.Mvc;

namespace RestauranteEscolarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudiantesController : ControllerBase
    {
        private readonly AcademicoContext _context;

        public EstudiantesController(AcademicoContext context)
        {
            _context = context;
        }

        // GET: api/Estudiantes
        [HttpGet]
        public IActionResult Obtener()
        {
            return Ok(_context.Estudiantes.ToList());
        }

        // GET: api/Estudiantes/1
        [HttpGet("{id}")]
        public IActionResult ObtenerPorId(int id)
        {
            var estudiante = _context.Estudiantes.Find(id);

            if (estudiante == null)
            {
                return NotFound();
            }

            return Ok(estudiante);
        }

        // POST
        [HttpPost]
        public IActionResult Crear([FromBody] Estudiante estudiante)
        {
            _context.Estudiantes.Add(estudiante);

            _context.SaveChanges();

            return Ok(estudiante);
        }

        // PUT
        [HttpPut("{id}")]
        public IActionResult Actualizar(int id, [FromBody] Estudiante estudianteActualizado)
        {
            var estudiante = _context.Estudiantes.Find(id);

            if (estudiante == null)
            {
                return NotFound();
            }

            estudiante.NombreCompleto = estudianteActualizado.NombreCompleto;

            estudiante.DocumentoEstudiante = estudianteActualizado.DocumentoEstudiante;

            estudiante.IdGrado = estudianteActualizado.IdGrado;

            estudiante.IdPadre = estudianteActualizado.IdPadre;

            estudiante.FechaNacimiento = estudianteActualizado.FechaNacimiento;

            estudiante.IdColegio = estudianteActualizado.IdColegio;

            _context.SaveChanges();

            return Ok(estudiante);

            _context.SaveChanges();

            return Ok(estudiante);
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Eliminar(int id)
        {
            var estudiante = _context.Estudiantes.Find(id);

            if (estudiante == null)
            {
                return NotFound();
            }

            _context.Estudiantes.Remove(estudiante);

            _context.SaveChanges();

            return Ok();
        }
    }
}