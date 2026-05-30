using System.ComponentModel.DataAnnotations;

namespace RestauranteAPI.Models;

public class Institucion
{
    [Key]
    public int IdInstitucion { get; set; }

    public string Nombre { get; set; }
}