using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestauranteAPI.Models;

public class Grupo
{
    [Key]
    public int IdGrupo { get; set; }

    public string Nombre { get; set; }

    [ForeignKey("Institucion")]
    public int IdInstitucion { get; set; }

    public Institucion? Institucion { get; set; }
}