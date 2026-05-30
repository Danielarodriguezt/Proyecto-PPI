using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class Reporte
{
    public int IdReporte { get; set; }

    public DateTime? Fecha { get; set; }

    public decimal? TotalPagos { get; set; }

    public int? CantidadEstudiantes { get; set; }

    public string? Observaciones { get; set; }
}
