using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Services.Interfaces;
using BlogAPI.Dtos.User;
using BlogAPI.Models;
using BlogAPI.Data;

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

            return Ok(new { username = user.Username, userId = user.Id });

        }
    }
}