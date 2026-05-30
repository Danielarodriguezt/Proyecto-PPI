using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class Pago
{
    public int IdPago { get; set; }

    public int? IdEstudiante { get; set; }

    public int? IdPrograma { get; set; }

    public DateTime? FechaPago { get; set; }

    public decimal? MontoPagado { get; set; }

    public string? EstadoPago { get; set; }
}
