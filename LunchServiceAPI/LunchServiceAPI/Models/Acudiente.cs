using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestauranteAPI.Models;

public class Acudiente
{
    [Key]
    public int IdAcudiente { get; set; }

    public string Nombre { get; set; }

    public string Documento { get; set; }

    public string Telefono { get; set; }

    [ForeignKey("Usuario")]
    public int IdUsuario { get; set; }

    public Usuario Usuario { get; set; }
}