using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Models
{
    public class Post
    {
        
        public int Id { get; set; }
        public string Title { get; set; } = "";
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