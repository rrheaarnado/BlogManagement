using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Services;
using BlogAPI.Services.Interfaces;
using BlogAPI.Dtos.Auth;
using BlogAPI.Dtos.User;
using BlogAPI.Models;
using BlogAPI.Data;
using System.Text;                               // For Encoding
using System.Security.Claims;                    // For Claim, ClaimsIdentity, ClaimTypes
using Microsoft.IdentityModel.Tokens;            // For SymmetricSecurityKey, SigningCredentials, SecurityAlgorithms
using System.IdentityModel.Tokens.Jwt;           // For JwtSecurityTokenHandler, SecurityTokenDescriptor
using Microsoft.AspNetCore.Identity;            // For PasswordHasher<User>

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService) => _userService = userService;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto dto)
        {
            var user = await _userService.ValidateUserAsync(dto.Username, dto.Password);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            // -------------------- JWT Creation --------------------
            var key = Encoding.UTF8.GetBytes("AnnouncementSysytemSecretKey2025");
            var tokenHandler = new JwtSecurityTokenHandler();                       //responsible for creating, encoding, and decoding JWT tokens.

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]                                  //claims (data) inside JWT
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),       //user's unique ID
                    new Claim(ClaimTypes.Name, user.Username)                       //username
                }),
                Expires = DateTime.UtcNow.AddHours(1),                              //token expiration time

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature) //signs the token using the key
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);                 //uses the descriptor to create the token
            var jwtToken = tokenHandler.WriteToken(token);                         //converts token to a string format           

            // Return user info + JWT
            return Ok(new { username = user.Username, userId = user.Id, token = jwtToken });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            var existingUser = await _userService.GetUserByUsernameAsync(dto.Username);
            if (existingUser != null) return BadRequest(new { message = "username already exist." });

            var createdUser = await _userService.CreateAsync(new CreateUserDto
            {
                Username = dto.Username,
                Email = dto.Email,
                Password = dto.Password
            });

            return Ok(new { message = "User Registered Succesfully." });
        }


    }
}