using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class VistaGlobal
{
    public int? IdEstudiante { get; set; }

    public string? Estudiante { get; set; }

    public string? NombreGrado { get; set; }

    public string? NombrePrograma { get; set; }

    public decimal? MontoPagado { get; set; }

    public string? EstadoPago { get; set; }

    public string? NombreColegio { get; set; }
}
