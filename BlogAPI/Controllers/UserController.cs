using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Data;
using BlogAPI.Models;
using BlogAPI.Dtos.User;
using BlogAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace BlogAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class UsersController : ControllerBase
    {
        //Stores the reference to the service so we can use it in the constructor
        private readonly IUserService _userService;
        public UsersController(IUserService userService) => _userService = userService;

        [HttpGet] //READ ALL: GET /api/Users
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            var user = await _userService.GetAllAsync();

            return Ok(user);
        }

        [Authorize]
        [HttpGet("{id:int}")] //READ ALL: GET /api/{id}
        public async Task<ActionResult<UserDto>> GetById(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpPost] //POST /api/Users
        [AllowAnonymous] 
        public async Task<ActionResult<UserDto>> Create(CreateUserDto dto)
        {
            var user = await _userService.CreateAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }

        [HttpPut("{id:int}")] //UPDATE /api/users/{id}
        public async Task<ActionResult> Update(int id, UpdateUserDto dto)
        {
            var user = await _userService.UpdateAsync(id, dto);
            if (user == null) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id:int}")] //DELETE /api/users/{id}
        public async Task<ActionResult> Delete(int id)
        {
            //Check if id exist
            var user = await _userService.DeleteAsync(id);
            if (user == null) return NotFound();

            return NoContent();
        }
    }
}