using Microsoft.EntityFrameworkCore;
using BlogAPI.Data;
using BlogAPI.Services.Interfaces;
using BlogAPI.Dtos.Comment;
using BlogAPI.Models;

namespace BlogAPI.Services
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext _db;
        public CommentService(AppDbContext db) => _db = db;

        public async Task<IEnumerable<CommentDto>> GetAllAsync()
        {
            var comment = await _db.Comments
                .Select(c => new CommentDto
                {
                    Id = c.Id,
                    Content = c.Content,
                    UserId = c.UserId,
                    PostId = c.PostId
                })
                .ToListAsync();

            return comment;
        }

        public async Task<CommentDto?> GetByIdAsync(int id)
        {
            var comment = await _db.Comments.FindAsync(id);
            if (comment == null) return null;

            return new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                UserId = comment.UserId,
                PostId = comment.PostId,
            };
        }

        public async Task<CommentDto> CreateAsync(CreateCommentDto dto)
        {
            var comment = new Comment
            {
                Content = dto.Content,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserId = dto.UserId,
                PostId = dto.PostId
            };

            _db.Comments.Add(comment);
            await _db.SaveChangesAsync();

            return new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                UserId = comment.UserId,
                PostId = comment.PostId
            };
        }

        public async Task<bool> UpdateAsync(int id, UpdateCommentDto dto)
        {
            var comment = await _db.Comments.FindAsync();
            if (comment == null) return false;

            comment.Content = dto.Content;

            comment.UpdatedAt = DateTime.Now;

            await _db.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var comment = await _db.Comments.FindAsync(id);
            if (comment == null) return false;

            // Only allow if the user is the owner
            if (comment.UserId != userId) return false;

            _db.Comments.Remove(comment);
            await _db.SaveChangesAsync();

            return true;
        }




    }
}