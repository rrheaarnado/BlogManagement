using System.ComponentModel.DataAnnotations;
using BlogAPI.Dtos.User;
using BlogAPI.Dtos.Comment;

namespace BlogAPI.Dtos.Post
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Content { get; set; } = "";
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsPublished { get; set; } = true;

        //Foreign Keys
        public int UserId { get; set; }
        public UserDto? User { get; set; }
        public List<CommentDto> Comments { get; set; } =
        new List<CommentDto>();
        public string Username { get; set; }

    }
}