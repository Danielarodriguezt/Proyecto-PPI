using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Operativo;

public partial class Colegio
{
    public int IdColegio { get; set; }

    public string? NombreColegio { get; set; }

    public string? Nit { get; set; }

    public string? DireccionPrincipal { get; set; }
}
