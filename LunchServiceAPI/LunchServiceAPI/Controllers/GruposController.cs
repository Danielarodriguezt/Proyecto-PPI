using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestauranteAPI.Data;
using RestauranteAPI.Models;

namespace RestauranteAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GruposController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GruposController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/grupos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grupo>>> GetGrupos()
        {
            return await _context.Grupos
                .Include(g => g.Institucion)
                .ToListAsync();
        }

        // GET por ID (opcional pero recomendado)
        [HttpGet("{id}")]
        public async Task<ActionResult<Grupo>> GetGrupo(int id)
        {
            var grupo = await _context.Grupos
                .Include(g => g.Institucion)
                .FirstOrDefaultAsync(g => g.IdGrupo == id);

            if (grupo == null)
                return NotFound();

            return grupo;
        }

        // POST: api/grupos
        [HttpPost]
        public async Task<ActionResult<Grupo>> PostGrupo(Grupo grupo)
        {
            _context.Grupos.Add(grupo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGrupo), new { id = grupo.IdGrupo }, grupo);
        }

        // PUT: api/grupos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrupo(int id, Grupo grupo)
        {
            if (id != grupo.IdGrupo)
                return BadRequest();

            _context.Entry(grupo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Grupos.Any(e => e.IdGrupo == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        // DELETE: api/grupos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrupo(int id)
        {
            var grupo = await _context.Grupos.FindAsync(id);

            if (grupo == null)
                return NotFound();

            _context.Grupos.Remove(grupo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}