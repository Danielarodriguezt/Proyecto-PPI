using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class PadreHerencium
{
    public int IdPersona { get; set; }

    public string? Nombre { get; set; }

    public string? Documento { get; set; }

    public string? Telefono { get; set; }
}
