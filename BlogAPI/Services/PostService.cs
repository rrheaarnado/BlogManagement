using Microsoft.EntityFrameworkCore;
using BlogAPI.Data;
using BlogAPI.Services.Interfaces;
using BlogAPI.Dtos.Post;
using BlogAPI.Models;

namespace BlogAPI.Services
{
    public class PostService : IPostService
    {
        private readonly AppDbContext _db;
        public PostService(AppDbContext db) => _db = db;

        public async Task<IEnumerable<PostDto>> GetAllAsync()
        {
            var post = await _db.Posts
                .Select(u => new PostDto
                {
                    Id = u.Id,
                    Title = u.Title,
                    Content = u.Content,
                    IsPublished = u.IsPublished,
                    UserId = u.UserId
                })
                .ToListAsync();

            return post;
        }

        public async Task<PostDto?> GetByIdAsync(int id)
        {
            var post = await _db.Posts.FindAsync(id);
            if (post == null) return null;

            return new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                IsPublished = post.IsPublished,
                UserId = post.UserId
            };
        }

        public async Task<PostDto> CreateAsync(CreatePostDto dto)
        {
            var post = new Post
            {
                Title = dto.Title,
                Content = dto.Content,
                IsPublished = dto.IsPublished,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserId = dto.UserId
            };

            _db.Posts.Add(post);
            await _db.SaveChangesAsync();

            return new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                IsPublished = post.IsPublished,
                UserId = post.UserId
            };
        }

        public async Task<bool> UpdateAsync(int id, UpdatePostDto dto)
        {
            var post = await _db.Posts.FindAsync();
            if (post == null) return false;

            post.Title = dto.Title;
            post.Content = dto.Content;

            post.UpdatedAt = DateTime.Now;

            await _db.SaveChangesAsync();

            return true;
        } 

        public async Task<bool> DeleteAsync(int id)
        {
            var post = await _db.Posts.FindAsync();
            if (post == null) return false;

            _db.Posts.Remove(post);

            await _db.SaveChangesAsync();

            return true;
        }

    }
}