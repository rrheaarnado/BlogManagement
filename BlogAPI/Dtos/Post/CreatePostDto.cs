using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Dtos.Post
{
    public class CreatePostDto
    {
        [Required]
        public string Title { get; set; } = "";

        [Required]
        public string Content { get; set; } = "";

        // public int UserId { get; set; }
    }
}