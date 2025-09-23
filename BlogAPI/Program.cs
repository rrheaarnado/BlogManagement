using BlogAPI.Data;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Services.Interfaces;
using BlogAPI.Services;

var builder = WebApplication.CreateBuilder(args);

//Add DbContext with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//Add controllers (needed if you’ll build API controllers)
builder.Services.AddControllers();

//Add Swagger / OpenAPI for development testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Register Services
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

// Enable Swagger UI in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware
app.UseHttpsRedirection();

// Map Controllers
app.MapControllers();

app.Run();
