using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Data;
using BlogAPI.Models;
using BlogAPI.Dtos.Post;
using BlogAPI.Services.Interfaces;

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

        [HttpPost]
        public async Task<ActionResult<Post>> Create(CreatePostDto dto)
        {
            var post = await _postService.CreateAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, UpdatePostDto dto)
        {
            var post = await _postService.UpdateAsync(id, dto);
            if (post == null) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var post = await _postService.DeleteAsync(id);
            if (post == null) return NotFound();

            return NoContent();
        }
    }
}