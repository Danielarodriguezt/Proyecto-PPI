using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestauranteAPI.Data;
using RestauranteAPI.Models;

namespace RestauranteAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // POST: api/usuarios
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            return Ok(usuario);
        }

        // LOGIN
        [HttpPost("login")]
        public async Task<ActionResult<Usuario>> Login(Usuario login)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(
                u => u.Correo == login.Correo
                && u.Contrasena == login.Contrasena
            );

            if (usuario == null)
            {
                return Unauthorized("Correo o contraseña incorrectos");
            }

            return Ok(usuario);
        }
    }
}