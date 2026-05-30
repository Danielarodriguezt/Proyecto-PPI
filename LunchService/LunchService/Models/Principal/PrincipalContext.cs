using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LunchServiceAPI.Models.Principal;

public partial class PrincipalContext : DbContext
{
    public PrincipalContext()
    {
    }

    public PrincipalContext(DbContextOptions<PrincipalContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Colegio> Colegios { get; set; }

    public virtual DbSet<ColegiosObjeto> ColegiosObjetos { get; set; }

    public virtual DbSet<DimColegio> DimColegios { get; set; }

    public virtual DbSet<DimEstudiante> DimEstudiantes { get; set; }

    public virtual DbSet<DimFecha> DimFechas { get; set; }

    public virtual DbSet<DimPrograma> DimProgramas { get; set; }

    public virtual DbSet<Estudiante> Estudiantes { get; set; }

    public virtual DbSet<EstudianteHerencium> EstudianteHerencia { get; set; }

    public virtual DbSet<EstudiantesObjeto> EstudiantesObjetos { get; set; }

    public virtual DbSet<Grado> Grados { get; set; }

    public virtual DbSet<HechosPago> HechosPagos { get; set; }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<Padre> Padres { get; set; }

    public virtual DbSet<PadreHerencium> PadreHerencia { get; set; }

    public virtual DbSet<Pago> Pagos { get; set; }

    public virtual DbSet<PagosExterno> PagosExternos { get; set; }

    public virtual DbSet<Persona> Personas { get; set; }

    public virtual DbSet<Programa> Programas { get; set; }

    public virtual DbSet<Reporte> Reportes { get; set; }

    public virtual DbSet<ReportesObjeto> ReportesObjetos { get; set; }

    public virtual DbSet<VistaGlobal> VistaGlobals { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=RestauranteEscolar;Username=postgres;Password=Ld070177");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresExtension("file_fdw")
            .HasPostgresExtension("postgres_fdw");

        modelBuilder.Entity<Colegio>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("colegios", "restaurante");

            entity.Property(e => e.DireccionPrincipal)
                .HasMaxLength(200)
                .HasColumnName("direccion_principal");
            entity.Property(e => e.IdColegio).HasColumnName("id_colegio");
            entity.Property(e => e.Nit)
                .HasMaxLength(20)
                .HasColumnName("nit");
            entity.Property(e => e.NombreColegio)
                .HasMaxLength(150)
                .HasColumnName("nombre_colegio");
        });

        modelBuilder.Entity<ColegiosObjeto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("colegios_objeto_pkey");

            entity.ToTable("colegios_objeto", "restaurante");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Datos)
                .HasColumnType("jsonb")
                .HasColumnName("datos");
        });

        modelBuilder.Entity<DimColegio>(entity =>
        {
            entity.HasKey(e => e.IdColegio).HasName("dim_colegio_pkey");

            entity.ToTable("dim_colegio", "dwh");

            entity.Property(e => e.IdColegio)
                .ValueGeneratedNever()
                .HasColumnName("id_colegio");
            entity.Property(e => e.NombreColegio)
                .HasColumnType("character varying")
                .HasColumnName("nombre_colegio");
        });

        modelBuilder.Entity<DimEstudiante>(entity =>
        {
            entity.HasKey(e => e.IdEstudiante).HasName("dim_estudiante_pkey");

            entity.ToTable("dim_estudiante", "dwh");

            entity.Property(e => e.IdEstudiante)
                .ValueGeneratedNever()
                .HasColumnName("id_estudiante");
            entity.Property(e => e.Nombre)
                .HasColumnType("character varying")
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<DimFecha>(entity =>
        {
            entity.HasKey(e => e.Fecha).HasName("dim_fecha_pkey");

            entity.ToTable("dim_fecha", "dwh");

            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.Anio).HasColumnName("anio");
            entity.Property(e => e.Dia).HasColumnName("dia");
            entity.Property(e => e.Mes).HasColumnName("mes");
        });

        modelBuilder.Entity<DimPrograma>(entity =>
        {
            entity.HasKey(e => e.IdPrograma).HasName("dim_programa_pkey");

            entity.ToTable("dim_programa", "dwh");

            entity.Property(e => e.IdPrograma)
                .ValueGeneratedNever()
                .HasColumnName("id_programa");
            entity.Property(e => e.NombrePrograma)
                .HasColumnType("character varying")
                .HasColumnName("nombre_programa");
        });

        modelBuilder.Entity<Estudiante>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("estudiantes", "restaurante");

            entity.Property(e => e.DocumentoEstudiante)
                .HasMaxLength(20)
                .HasColumnName("documento_estudiante");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fecha_nacimiento");
            entity.Property(e => e.IdColegio).HasColumnName("id_colegio");
            entity.Property(e => e.IdEstudiante).HasColumnName("id_estudiante");
            entity.Property(e => e.IdGrado).HasColumnName("id_grado");
            entity.Property(e => e.IdPadre).HasColumnName("id_padre");
            entity.Property(e => e.NombreCompleto)
                .HasMaxLength(150)
                .HasColumnName("nombre_completo");
        });

        modelBuilder.Entity<EstudianteHerencium>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("estudiante_herencia", "restaurante");

            entity.Property(e => e.Documento)
                .HasMaxLength(20)
                .HasColumnName("documento");
            entity.Property(e => e.IdColegio).HasColumnName("id_colegio");
            entity.Property(e => e.IdGrado).HasColumnName("id_grado");
            entity.Property(e => e.IdPersona)
                .HasDefaultValueSql("nextval('restaurante.persona_id_persona_seq'::regclass)")
                .HasColumnName("id_persona");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<EstudiantesObjeto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("estudiantes_objeto_pkey");

            entity.ToTable("estudiantes_objeto", "restaurante");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Datos)
                .HasColumnType("jsonb")
                .HasColumnName("datos");
        });

        modelBuilder.Entity<Grado>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("grados", "restaurante");

            entity.Property(e => e.IdGrado).HasColumnName("id_grado");
            entity.Property(e => e.NombreGrado)
                .HasMaxLength(50)
                .HasColumnName("nombre_grado");
            entity.Property(e => e.Seccion)
                .HasMaxLength(50)
                .HasColumnName("seccion");
        });

        modelBuilder.Entity<HechosPago>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("hechos_pagos", "dwh");

            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.IdColegio).HasColumnName("id_colegio");
            entity.Property(e => e.IdEstudiante).HasColumnName("id_estudiante");
            entity.Property(e => e.IdPrograma).HasColumnName("id_programa");
            entity.Property(e => e.MontoPagado).HasColumnName("monto_pagado");

            entity.HasOne(d => d.FechaNavigation).WithMany()
                .HasForeignKey(d => d.Fecha)
                .HasConstraintName("hechos_pagos_fecha_fkey");

            entity.HasOne(d => d.IdColegioNavigation).WithMany()
                .HasForeignKey(d => d.IdColegio)
                .HasConstraintName("hechos_pagos_id_colegio_fkey");

            entity.HasOne(d => d.IdEstudianteNavigation).WithMany()
                .HasForeignKey(d => d.IdEstudiante)
                .HasConstraintName("hechos_pagos_id_estudiante_fkey");

            entity.HasOne(d => d.IdProgramaNavigation).WithMany()
                .HasForeignKey(d => d.IdPrograma)
                .HasConstraintName("hechos_pagos_id_programa_fkey");
        });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("menus", "restaurante");

            entity.Property(e => e.Acompanamiento)
                .HasMaxLength(200)
                .HasColumnName("acompanamiento");
            entity.Property(e => e.Bebida)
                .HasMaxLength(100)
                .HasColumnName("bebida");
            entity.Property(e => e.DiaSemana)
                .HasMaxLength(20)
                .HasColumnName("dia_semana");
            entity.Property(e => e.FechaValidez).HasColumnName("fecha_validez");
            entity.Property(e => e.IdMenu).HasColumnName("id_menu");
            entity.Property(e => e.PlatoPrincipal)
                .HasMaxLength(200)
                .HasColumnName("plato_principal");
            entity.Property(e => e.Postre)
                .HasMaxLength(100)
                .HasColumnName("postre");
        });

        modelBuilder.Entity<Padre>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("padres", "restaurante");

            entity.Property(e => e.CorreoElectronico)
                .HasMaxLength(100)
                .HasColumnName("correo_electronico");
            entity.Property(e => e.DocumentoIdentidad)
                .HasMaxLength(20)
                .HasColumnName("documento_identidad");
            entity.Property(e => e.IdPadre).HasColumnName("id_padre");
            entity.Property(e => e.NombreCompleto)
                .HasMaxLength(150)
                .HasColumnName("nombre_completo");
            entity.Property(e => e.Telefono)
                .HasMaxLength(15)
                .HasColumnName("telefono");
        });

        modelBuilder.Entity<PadreHerencium>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("padre_herencia", "restaurante");

            entity.Property(e => e.Documento)
                .HasMaxLength(20)
                .HasColumnName("documento");
            entity.Property(e => e.IdPersona)
                .HasDefaultValueSql("nextval('restaurante.persona_id_persona_seq'::regclass)")
                .HasColumnName("id_persona");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .HasColumnName("telefono");
        });

        modelBuilder.Entity<Pago>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("pagos", "restaurante");

            entity.Property(e => e.EstadoPago)
                .HasMaxLength(20)
                .HasColumnName("estado_pago");
            entity.Property(e => e.FechaPago)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("fecha_pago");
            entity.Property(e => e.IdEstudiante).HasColumnName("id_estudiante");
            entity.Property(e => e.IdPago).HasColumnName("id_pago");
            entity.Property(e => e.IdPrograma).HasColumnName("id_programa");
            entity.Property(e => e.MontoPagado)
                .HasPrecision(10, 2)
                .HasColumnName("monto_pagado");
        });

        modelBuilder.Entity<PagosExterno>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("pagos_externos", "restaurante");

            entity.Property(e => e.EstadoPago)
                .HasColumnType("character varying")
                .HasColumnName("estado_pago");
            entity.Property(e => e.FechaPago).HasColumnName("fecha_pago");
            entity.Property(e => e.IdEstudiante).HasColumnName("id_estudiante");
            entity.Property(e => e.IdPago).HasColumnName("id_pago");
            entity.Property(e => e.IdPrograma).HasColumnName("id_programa");
            entity.Property(e => e.MontoPagado).HasColumnName("monto_pagado");
        });

        modelBuilder.Entity<Persona>(entity =>
        {
            entity.HasKey(e => e.IdPersona).HasName("persona_pkey");

            entity.ToTable("persona", "restaurante");

            entity.Property(e => e.IdPersona).HasColumnName("id_persona");
            entity.Property(e => e.Documento)
                .HasMaxLength(20)
                .HasColumnName("documento");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Programa>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("programas", "restaurante");

            entity.Property(e => e.Costo)
                .HasPrecision(10, 2)
                .HasColumnName("costo");
            entity.Property(e => e.Descripcion).HasColumnName("descripcion");
            entity.Property(e => e.IdPrograma).HasColumnName("id_programa");
            entity.Property(e => e.NombrePrograma)
                .HasMaxLength(100)
                .HasColumnName("nombre_programa");
        });

        modelBuilder.Entity<Reporte>(entity =>
        {
            entity.HasKey(e => e.IdReporte).HasName("reportes_pkey");

            entity.ToTable("reportes", "restaurante");

            entity.Property(e => e.IdReporte).HasColumnName("id_reporte");
            entity.Property(e => e.CantidadEstudiantes).HasColumnName("cantidad_estudiantes");
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("fecha");
            entity.Property(e => e.Observaciones).HasColumnName("observaciones");
            entity.Property(e => e.TotalPagos)
                .HasPrecision(10, 2)
                .HasColumnName("total_pagos");
        });

        modelBuilder.Entity<ReportesObjeto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("reportes_objeto_pkey");

            entity.ToTable("reportes_objeto", "restaurante");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Datos)
                .HasColumnType("jsonb")
                .HasColumnName("datos");
        });

        modelBuilder.Entity<VistaGlobal>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vista_global", "restaurante");

            entity.Property(e => e.EstadoPago)
                .HasMaxLength(20)
                .HasColumnName("estado_pago");
            entity.Property(e => e.Estudiante)
                .HasMaxLength(150)
                .HasColumnName("estudiante");
            entity.Property(e => e.IdEstudiante).HasColumnName("id_estudiante");
            entity.Property(e => e.MontoPagado)
                .HasPrecision(10, 2)
                .HasColumnName("monto_pagado");
            entity.Property(e => e.NombreColegio)
                .HasMaxLength(150)
                .HasColumnName("nombre_colegio");
            entity.Property(e => e.NombreGrado)
                .HasMaxLength(50)
                .HasColumnName("nombre_grado");
            entity.Property(e => e.NombrePrograma)
                .HasMaxLength(100)
                .HasColumnName("nombre_programa");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
