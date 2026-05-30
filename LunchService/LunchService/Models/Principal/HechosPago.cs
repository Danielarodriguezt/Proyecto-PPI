using System;
using System.Collections.Generic;

namespace LunchServiceAPI.Models.Principal;

public partial class HechosPago
{
    public int? IdEstudiante { get; set; }

    public int? IdColegio { get; set; }

    public int? IdPrograma { get; set; }

    public DateOnly? Fecha { get; set; }

    public decimal? MontoPagado { get; set; }

    public virtual DimFecha? FechaNavigation { get; set; }

    public virtual DimColegio? IdColegioNavigation { get; set; }

    public virtual DimEstudiante? IdEstudianteNavigation { get; set; }

    public virtual DimPrograma? IdProgramaNavigation { get; set; }
}
