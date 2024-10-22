using BE_CRUDMascotas.Data;
using BE_CRUDMascotas.Models;
using BE_CRUDMascotas.Repository;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Cors
builder.Services.AddCors(options => options.AddPolicy("AllowWebapp",
                                    builder => builder.AllowAnyOrigin()
                                                    .AllowAnyHeader()
                                                    .AllowAnyMethod()));



//agregar contexto
builder.Services.AddDbContext<AplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"));
});

//Automapper

builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped<IRepository<Mascota>, MascotaRepository>();
builder.Services.AddScoped<IRepository<Usuario>, usuarioRepository>();
builder.Services.AddScoped<IRazaRepository, RazaRepository>();

var app = builder.Build();

// Add Services


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowWebapp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
