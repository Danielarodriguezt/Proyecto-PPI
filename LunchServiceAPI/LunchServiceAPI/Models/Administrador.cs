using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestauranteAPI.Models;

public class Administrador
{
    [Key]
    public int IdAdministrador { get; set; }

    public string Nombre { get; set; }

    public string Documento { get; set; }

    [ForeignKey("Usuario")]
    public int IdUsuario { get; set; }

    public Usuario Usuario { get; set; }
}