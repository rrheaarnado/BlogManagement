using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Models;
using BlogAPI.Data;
using BlogAPI.Dtos.Comment;
using BlogAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase //Inherits methods from Controller base: Ok() NotFounnd() NoContent() CreatedAtAction() are methods inherited from ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentsController(ICommentService commentService) => _commentService = commentService;

        [HttpGet] //READ ALL: GET /api/comments
        public async Task<ActionResult<IEnumerable<Comment>>> GetAll()
        {
            var comment = await _commentService.GetAllAsync();

            return Ok(comment);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Comment>> GetById(int id)
        {
            var comment = await _commentService.GetByIdAsync(id);
            if (comment == null) return NotFound();

            return Ok(comment);
        }

        //
        [HttpGet("post/{postId:int}")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetCommentsByPost(int postId)
        {
            var comments = await _commentService.GetByPostIdAsync(postId);
            return Ok(comments);
        }

        [Authorize]
[HttpPost]
public async Task<ActionResult<CommentDto>> Create(CreateCommentDto dto)
{
    var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                      ?? User.FindFirst("nameid");
    if (userIdClaim == null)
        return Unauthorized("User ID claim missing in token");

    var userId = int.Parse(userIdClaim.Value);

    var comment = await _commentService.CreateAsync(dto, userId, dto.PostId);

    return CreatedAtAction(nameof(GetById), new { id = comment.Id }, comment);
}


        [HttpPut("{id:int}")] //UPDATE /api/comments/{id}
        public async Task<ActionResult> Update(int id, UpdateCommentDto dto)
        {
            var comment = await _commentService.UpdateAsync(id, dto);
            if (comment == null) return NotFound();

            return NoContent();
        }

         [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id, [FromQuery] int userId)
        {
            var success = await _commentService.DeleteAsync(id, userId);
            if (!success) return Forbid(); // or Unauthorized
            return NoContent();
        }

    }
}