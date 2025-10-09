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
        public async Task<ActionResult<PostDto>> GetById(int id)
        {
            var post = await _postService.GetByIdAsync(id);
            if (post == null) return NotFound();

            return Ok(post);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PostDto>> Create(CreatePostDto dto)
        {
            //Look for the logged-in user’s ID in the JWT claims
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                              ?? User.FindFirst("nameid");
            if (userIdClaim == null)
                return Unauthorized("User ID claim missing in token");

            //Convert the claim value (string) into an integer userId
            var userId = int.Parse(userIdClaim.Value);

            //pass the userId to the service layer
            var post = await _postService.CreateAsync(dto, userId);

            return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, UpdatePostDto dto)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                              ?? User.FindFirst("nameid");
            if (userIdClaim == null)
                return Unauthorized("User ID claim missing in token");

            var userId = int.Parse(userIdClaim.Value);

            var success = await _postService.UpdateAsync(id, dto, userId);
            if (!success) return NotFound();

            if (!success)
                return Forbid("You are not allowed to delete this post.");

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                              ?? User.FindFirst("nameid");
            if (userIdClaim == null)
                return Unauthorized("User ID claim missing in token");

            var userId = int.Parse(userIdClaim.Value);

            var success = await _postService.DeleteAsync(id, userId);

            if (!success)
                return Forbid("You are not allowed to delete this post.");

            return NoContent();
        }



    }
}