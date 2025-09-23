using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Dtos.Post
{
    public class UpdatePostDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = "";

        [Required]
        public string Content { get; set; } = "";

    }
}