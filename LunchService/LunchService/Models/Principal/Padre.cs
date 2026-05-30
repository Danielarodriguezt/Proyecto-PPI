using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class Padre
{
    public int IdPadre { get; set; }

    public string? NombreCompleto { get; set; }

    public string? DocumentoIdentidad { get; set; }

    public string? Telefono { get; set; }

    public string? CorreoElectronico { get; set; }
}
