using BlogAPI.Dtos.Comment;

namespace BlogAPI.Services.Interfaces
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentDto>> GetAllAsync();
        Task<CommentDto?> GetByIdAsync(int id);
        Task<CommentDto> CreateAsync(CreateCommentDto dto, int userId, int postId);
        Task<bool> UpdateAsync(int id, UpdateCommentDto dto);
        Task<bool> DeleteAsync(int id, int userId);
        Task<IEnumerable<CommentDto>> GetByPostIdAsync(int postId);
    }
}