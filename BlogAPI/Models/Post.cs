using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Models
{
    public class Post
    {
        [Required]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is Required.")]
        public string Title { get; set; } = "";

        [Required(ErrorMessage = "Content is required.")]
        public string Content { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool IsPublished { get; set; } = false;

        //Foreign Keys
        public int UserId { get; set; }
        public User User { get; set; }

        //Navigation Properties
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();

    }
}