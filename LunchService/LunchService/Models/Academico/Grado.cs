using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Academico;

public partial class Grado
{
    public int IdGrado { get; set; }

    public string? NombreGrado { get; set; }

    public string? Seccion { get; set; }
}
