using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Financiero;

public partial class Programa
{
    public int IdPrograma { get; set; }

    public string? NombrePrograma { get; set; }

    public string? Descripcion { get; set; }

    public decimal? Costo { get; set; }
}
