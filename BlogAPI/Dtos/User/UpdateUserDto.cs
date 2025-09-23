using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Dtos.User
{
    public class UpdateUserDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = "";

        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";

        public string? Password { get; set; } = "";
    }
}