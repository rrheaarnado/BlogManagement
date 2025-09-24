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
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<ICommentService, CommentService>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // frontend origin
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Enable Swagger UI in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS
app.UseCors("AllowFrontend");

// Middleware
app.UseHttpsRedirection();

// Map Controllers
app.MapControllers();

app.Run();
