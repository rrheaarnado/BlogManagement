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
            var key = Encoding.UTF8.GetBytes("ThisIsASuperSecretKeyForJWT1234567890");
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            // ------------------------------------------------------

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