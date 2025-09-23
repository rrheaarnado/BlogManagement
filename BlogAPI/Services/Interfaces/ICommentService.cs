using BlogAPI.Dtos.Comment;

namespace BlogAPI.Services.Interfaces
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentDto>> GetAllAsync();
        Task<CommentDto?> GetByIdAsync(int id);
        Task<CommentDto> CreateAsync(CreateCommentDto dto);
        Task<bool> UpdateAsync(int id, UpdateCommentDto dto);
        Task<bool> DeleteAsync(int id);
    }
}