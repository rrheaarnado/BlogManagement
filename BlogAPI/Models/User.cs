using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }

        [Required(ErrorMessage = "Username is required.")]
        public string Username { get; set; } = "";

        [Required(ErrorMessage = "Email is Required.")]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "Password is Required.")]
        public string Password { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = false;

        //Navigation Properties
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}