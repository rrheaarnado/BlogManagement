
namespace BlogAPI.Dtos.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        //Foreign Keys
        public int UserId { get; set; }  
        public int PostId { get; set; }
        public string Username { get; set; } = "";
    }

}