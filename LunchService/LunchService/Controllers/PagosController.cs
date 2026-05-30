using LunchServiceAPI.Models.Academico;
using Microsoft.AspNetCore.Mvc;

namespace RestauranteEscolarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PadresController : ControllerBase
    {
        private readonly AcademicoContext _context;

        public PadresController(AcademicoContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public IActionResult Obtener()
        {
            return Ok(_context.Padres.ToList());
        }

        // GET por ID
        [HttpGet("{id}")]
        public IActionResult ObtenerPorId(int id)
        {
            var padre = _context.Padres.Find(id);

            if (padre == null)
            {
                return NotFound();
            }

            return Ok(padre);
        }

        // POST
        [HttpPost]
        public IActionResult Crear([FromBody] Padre padre)
        {
            _context.Padres.Add(padre);

            _context.SaveChanges();

            return Ok(padre);
        }

        // PUT
        [HttpPut("{id}")]
        public IActionResult Actualizar(int id, [FromBody] Padre padreActualizado)
        {
            var padre = _context.Padres.Find(id);

            if (padre == null)
            {
                return NotFound();
            }

    pago.IdEstudiante = pagoActualizado.IdEstudiante;

    pago.IdPrograma = pagoActualizado.IdPrograma;

    pago.FechaPago = pagoActualizado.FechaPago;

    pago.MontoPagado = pagoActualizado.MontoPagado;

    pago.EstadoPago = pagoActualizado.EstadoPago;

    _context.SaveChanges();

    return Ok(pago);
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Eliminar(int id)
        {
            var padre = _context.Padres.Find(id);

            if (padre == null)
            {
                return NotFound();
            }

            _context.Padres.Remove(padre);

            _context.SaveChanges();

            return Ok();
        }
    }
}