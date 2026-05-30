using Microsoft.EntityFrameworkCore;
using LunchServiceAPI.Models.Academico;
using LunchServiceAPI.Models.Financiero;
using LunchServiceAPI.Models.Operativo;
using LunchServiceAPI.Models.Principal;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<AcademicoContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("AcademicoDB")
    ));

builder.Services.AddDbContext<FinancieroContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("FinancieroDB")
    ));

builder.Services.AddDbContext<OperativoContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("OperativoDB")
    ));

builder.Services.AddDbContext<PrincipalContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("PrincipalDB")
    ));

builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica",
        app =>
        {
            app.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseSwagger();

app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("NuevaPolitica");

app.MapControllers();

app.Run();