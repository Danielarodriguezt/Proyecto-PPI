using LunchServiceAPI.Models.Operativo;
using Microsoft.AspNetCore.Mvc;

namespace RestauranteEscolarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenusController : ControllerBase
    {
        private readonly OperativoContext _context;

        public MenusController(OperativoContext context)
        {
            _context = context;
        }

        // GET: api/menus
        [HttpGet]
        public IActionResult Obtener()
        {
            return Ok(_context.Menus.ToList());
        }

        // GET: api/menus/1
        [HttpGet("{id}")]
        public IActionResult ObtenerPorId(int id)
        {
            var menu = _context.Menus.Find(id);

            if (menu == null)
            {
                return NotFound();
            }

            return Ok(menu);
        }

        // POST: api/menus
        [HttpPost]
        public IActionResult Crear([FromBody] Menu menu)
        {
            _context.Menus.Add(menu);
            _context.SaveChanges();

            return Ok(menu);
        }

        // PUT: api/menus/1
        [HttpPut("{id}")]
        public IActionResult Actualizar(int id, [FromBody] Menu menuActualizado)
        {
            var menu = _context.Menus.Find(id);

            if (menu == null)
            {
                return NotFound();
            }

            menu.DiaSemana = menuActualizado.DiaSemana;

            menu.PlatoPrincipal = menuActualizado.PlatoPrincipal;

            menu.Acompanamiento = menuActualizado.Acompanamiento;

            menu.Bebida = menuActualizado.Bebida;

            menu.Postre = menuActualizado.Postre;

            menu.FechaValidez = menuActualizado.FechaValidez;

            _context.SaveChanges();

            return Ok(menu);
        }

        // DELETE: api/menus/1
        [HttpDelete("{id}")]
        public IActionResult Eliminar(int id)
        {
            var menu = _context.Menus.Find(id);

            if (menu == null)
            {
                return NotFound();
            }

            _context.Menus.Remove(menu);
            _context.SaveChanges();

            return Ok();
        }
    }
}