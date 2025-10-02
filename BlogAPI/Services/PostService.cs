using Microsoft.EntityFrameworkCore;
using BlogAPI.Data;
using BlogAPI.Services.Interfaces;
using BlogAPI.Dtos.Post;
using BlogAPI.Models;
using BlogAPI.Dtos.User;
using BlogAPI.Dtos.Comment;


namespace BlogAPI.Services
{
    public class PostService : IPostService
    {
        private readonly AppDbContext _db;
        public PostService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<PostDto>> GetAllAsync()
        {
            var post = await _db.Posts
                .Include(p => p.User)
                .Include(p => p.Comments)
                .Select(p => new PostDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Content = p.Content,
                    IsPublished = p.IsPublished,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    UserId = p.UserId,
                    User = new UserDto
                    {
                        Id = p.User.Id,
                        Username = p.User.Username,
                        Email = p.User.Email,
                        CreatedAt = p.User.CreatedAt,
                        UpdatedAt = p.User.UpdatedAt,
                        IsActive = p.User.IsActive
                    },
                    Comments = p.Comments
                        .AsEnumerable()
                        .Select(c => new CommentDto
                        {
                            Id = c.Id,
                            Content = c.Content,
                            CreatedAt = c.CreatedAt,
                            UpdatedAt = c.UpdatedAt,
                            UserId = c.UserId,
                            PostId = c.PostId,
                        })
                        .ToList()
                })
                .ToListAsync();

            return post;
        }

        public async Task<PostDto?> GetByIdAsync(int id)
        {
            var post = await _db.Posts
                .Include(p => p.User)
                .Include(p => p.Comments)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null) return null;

            return new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                IsPublished = post.IsPublished,
                CreatedAt = post.CreatedAt,
                UpdatedAt = post.UpdatedAt,
                UserId = post.UserId,
                Username = post.User?.Username ?? "Unknown",
                User = post.User != null ? new UserDto
                {
                    Id = post.User.Id,
                    Username = post.User.Username,
                    Email = post.User.Email,
                    CreatedAt = post.User.CreatedAt,
                    UpdatedAt = post.User.UpdatedAt,
                    IsActive = post.User.IsActive
                } : null,
                Comments = post.Comments.Select(c => new CommentDto
                {
                    Id = c.Id,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt,
                    UserId = c.UserId,
                    PostId = c.PostId
                }).ToList()
            };
        }


        public async Task<PostDto> CreateAsync(CreatePostDto dto, int userId)
        {
            var post = new Post
            {
                Title = dto.Title,
                Content = dto.Content,
                IsPublished = dto.IsPublished,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserId = userId
            };

            _db.Posts.Add(post);
            await _db.SaveChangesAsync();

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == post.UserId);

            return new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                IsPublished = post.IsPublished,
                UserId = post.UserId,
                Username = user?.Username ?? "Unknown"
            };
        }

        public async Task<bool> UpdateAsync(int id, UpdatePostDto dto)
        {
            var post = await _db.Posts.FindAsync(id);
            if (post == null) return false;

            post.Title = dto.Title;
            post.Content = dto.Content;

            post.UpdatedAt = DateTime.Now;

            await _db.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var post = await _db.Posts.FindAsync(id);
            if (post == null) return false;

            if (post.UserId != userId) return false;

            _db.Posts.Remove(post);
            await _db.SaveChangesAsync();

            return true;
        }

    }
}