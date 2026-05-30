using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class Persona
{
    public int IdPersona { get; set; }

    public string? Nombre { get; set; }

    public string? Documento { get; set; }
}
