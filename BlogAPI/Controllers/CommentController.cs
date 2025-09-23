using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Models;
using BlogAPI.Data;
using BlogAPI.Dtos.Comment;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public CommentsController(AppDbContext db) => _db = db;

        [HttpGet] //READ ALL: GET /api/comments
        public async Task<ActionResult<IEnumerable<Comment>>> GetAll()
        {
            var comments = await _db.Comments
                .OrderBy(c => c.CreatedAt)
                .ThenBy(c => c.UpdatedAt)
                .Select(c => new CommentDto
                {
                    Id = c.Id,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt,
                    UserId = c.UserId,
                    PostId = c.PostId

                })
                .ToListAsync();

            return Ok(comments);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Comment>> GetById(int id)
        {
            var comments = await _db.Comments
                .Where(c => c.Id == id)
                .Select(c => new CommentDto
                {
                    Id = c.Id,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt,
                    UserId = c.UserId,
                    PostId = c.PostId
                })
                .FirstOrDefaultAsync();

            if (comments == null) return NotFound();
            return Ok(comments);
        }

        [HttpPost] //POST /api/comments
        public async Task<ActionResult<Comment>> Create([FromBody] CreateCommentDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid data");

            var comment = new Comment
            {
                Content = dto.Content,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserId = dto.UserId,
                PostId = dto.PostId,
            };

            _db.Comments.Add(comment);
            await _db.SaveChangesAsync();

            var commentDto = new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,
                UpdatedAt = comment.UpdatedAt,
                UserId = comment.UserId,
                PostId = dto.PostId
            };

            return CreatedAtAction(nameof(GetById), new { id = comment.Id }, commentDto);
        }


        [HttpPut("{id:int}")] //UPDATE /api/comments/{id}
        public async Task<ActionResult> Update(int id, UpdateCommentDto dto)
        {
            if (id != dto.Id) return BadRequest("Id mismatch");

            var comment = await _db.Comments.FindAsync(id);
            if (comment == null) return NotFound();

            //Update Property
            comment.Content = dto.Content;
            comment.UpdatedAt = DateTime.Now;

            await _db.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete (int id)
        {
            var comment = await _db.Comments.FindAsync(id);
            if (comment == null) return NotFound();

            _db.Comments.Remove(comment);

            await _db.SaveChangesAsync();

            return NoContent();
        }
        
    }
}