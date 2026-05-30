using System.ComponentModel.DataAnnotations;

namespace RestauranteAPI.Models;

public class Usuario
{
    [Key]
    public int IdUsuario { get; set; }

    [Required]
    public string Correo { get; set; }

    [Required]
    public string Contrasena { get; set; }

    [Required]
    public string Rol { get; set; }

    // NUEVOS CAMPOS
    public string Nombre { get; set; }

    public string Institucion { get; set; }

    public string Grupo { get; set; }
}