using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Dtos.User
{
    public class CreateUserDto
    {
        [Required]
        public string Username { get; set; } = "";

        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";
        
         [Required]
        public string Password { get; set; } = "";
    }
}