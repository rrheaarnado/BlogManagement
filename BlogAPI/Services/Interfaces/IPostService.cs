using BlogAPI.Dtos.Post;

namespace BlogAPI.Services.Interfaces
{
    public interface IPostService
    {
        Task<IEnumerable<PostDto>> GetAllAsync();
        Task<PostDto?> GetByIdAsync(int id);
        Task<PostDto> CreateAsync(CreatePostDto dto, int userId);
        Task<bool> UpdateAsync(int id, UpdatePostDto dto);
        Task<bool> DeleteAsync(int id, int userId);
    }
}