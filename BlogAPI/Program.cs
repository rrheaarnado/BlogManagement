using BlogAPI.Data;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Services.Interfaces;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);
//Secret key for signing tokens

var key = Encoding.UTF8.GetBytes("AnnouncementSysytemSecretKey2025"); 

//Add DbContext with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//validates the token signature, expiry, and claims
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,                                     // Not validating issuer
            ValidateAudience = false,                                   // Not validating audience
            ValidateLifetime = true,                                    // Validate token expiration
            ValidateIssuerSigningKey = true,                            // Validate the signing key
            IssuerSigningKey = new SymmetricSecurityKey(                // Use the same key as in token generation
                Encoding.UTF8.GetBytes("AnnouncementSysytemSecretKey2025"))
        };
    });


builder.Services.AddControllers();                                      //Controller-related services. (e.g., •	Routing services ([Route("api/[controller]")]), •	[ApiController], [Authorize])
builder.Services.AddEndpointsApiExplorer();                             //API explorer service for Swagger
builder.Services.AddSwaggerGen();                                       //Swagger generator

//Register Application Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<ICommentService, CommentService>();

// Add CORS policy - browsing security feature, lets you configure which external domains are allowed to call your API.
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

// Adds JWT auth support to Swagger
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Blog API",
        Version = "v1"
    });

    // JWT Authorization Header
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",                                         //header name where token is expected
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,        //Type of security scheme (HTTP Authentication)
        Scheme = "bearer",                                              //Scheme name 
        BearerFormat = "JWT",                                           //Format of the bearer token (Json Web Token)
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,         //Where the token should be sent - in the HTTP header
        Description = "Enter 'Bearer' [space] and then your token"      //UI input box in swagger
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

//Database migration
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();                                                  // creates migrations if db !exist
}


// Enable Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware
app.UseCors("AllowFrontend");                                               // Use CORS

app.UseHttpsRedirection();                                                  // 1. Redirect HTTP → HTTPS
app.UseAuthentication();                                                    // 2. Check JWT/authentication credentials
app.UseAuthorization();                                                     // 3. Enforce access rules ([Authorize])
app.MapControllers();                                                       // 4. Maps incoming requests to controller actions

app.Run();
