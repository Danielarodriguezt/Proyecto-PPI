using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class Grado
{
    public int IdGrado { get; set; }

    public string? NombreGrado { get; set; }

    public string? Seccion { get; set; }
}
