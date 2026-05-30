using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class EstudianteHerencium
{
    public int IdPersona { get; set; }

    public string? Nombre { get; set; }

    public string? Documento { get; set; }

    public int? IdGrado { get; set; }

    public int? IdColegio { get; set; }
}
