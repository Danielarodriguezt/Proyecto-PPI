using Microsoft.EntityFrameworkCore;
using RestauranteAPI.Models;

namespace RestauranteAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(
            DbContextOptions<AppDbContext> options
        ) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Estudiante> Estudiantes { get; set; }

        public DbSet<Acudiente> Acudientes { get; set; }

        public DbSet<Administrador> Administradores { get; set; }

        public DbSet<Grupo> Grupos { get; set; }

        public DbSet<Institucion> Instituciones { get; set; }
    }
}