using System.ComponentModel.DataAnnotations;

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
        
    }
}