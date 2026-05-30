using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Operativo;

public partial class Menu
{
    public int IdMenu { get; set; }

    public string? DiaSemana { get; set; }

    public string? PlatoPrincipal { get; set; }

    public string? Acompanamiento { get; set; }

    public string? Bebida { get; set; }

    public string? Postre { get; set; }

    public DateOnly? FechaValidez { get; set; }
}
