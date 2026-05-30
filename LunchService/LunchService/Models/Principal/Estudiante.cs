using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class Estudiante
{
    public int IdEstudiante { get; set; }

    public string? NombreCompleto { get; set; }

    public string? DocumentoEstudiante { get; set; }

    public int? IdGrado { get; set; }

    public int? IdPadre { get; set; }

    public DateOnly? FechaNacimiento { get; set; }

    public int? IdColegio { get; set; }
}
