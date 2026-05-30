using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class DimFecha
{
    public DateOnly Fecha { get; set; }

    public int? Anio { get; set; }

    public int? Mes { get; set; }

    public int? Dia { get; set; }
}
