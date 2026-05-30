using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestauranteAPI.Data;
using RestauranteAPI.Models;

namespace RestauranteAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InstitucionesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InstitucionesController(AppDbContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Institucion>>> GetInstituciones()
        {
            return await _context.Instituciones.ToListAsync();
        }

        // POST
        [HttpPost]
        public async Task<ActionResult<Institucion>> PostInstitucion(
            Institucion institucion
        )
        {
            _context.Instituciones.Add(institucion);

            await _context.SaveChangesAsync();

            return Ok(institucion);
        }
    }
}