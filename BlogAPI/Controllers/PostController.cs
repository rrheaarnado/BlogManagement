using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Data;
using BlogAPI.Models;
using BlogAPI.Dtos.Post;
using BlogAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostsController(IPostService postService) => _postService = postService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetAll()
        {
            var post = await _postService.GetAllAsync();

            return Ok(post);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Post>> GetById(int id)
        {
            var post = await _postService.GetByIdAsync(id);
            if (post == null) return NotFound();

            return Ok(post);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Post>> Create(CreatePostDto dto)
        {
            // get logged-in user's ID from JWT
            var userId = int.Parse(User.FindFirst("nameid").Value);

            var post = await _postService.CreateAsync(dto, userId);

            return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, UpdatePostDto dto)
        {
            var post = await _postService.UpdateAsync(id, dto);
            if (post == null) return NotFound();

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // Get logged-in user's ID from JWT claim
            var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");

            var success = await _postService.DeleteAsync(id, userId);

            if (!success) return Forbid("You are not allowed to delete this post.");

            return NoContent();
        }


    }
}