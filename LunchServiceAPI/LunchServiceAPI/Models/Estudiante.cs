using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestauranteAPI.Models;

public class Estudiante
{
    [Key]
    public int IdEstudiante { get; set; }

    public string Nombre { get; set; }

    public string Documento { get; set; }

    // SOLO IDs (esto es lo importante)
    [ForeignKey("Grupo")]
    public int IdGrupo { get; set; }

    public Grupo? Grupo { get; set; }

    [ForeignKey("Institucion")]
    public int IdInstitucion { get; set; }

    public Institucion? Institucion { get; set; }

    [ForeignKey("Usuario")]
    public int IdUsuario { get; set; }

    public Usuario? Usuario { get; set; }
}