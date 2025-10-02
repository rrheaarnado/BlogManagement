using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Dtos.Comment
{
    public class UpdateCommentDto
    {

        [Required]
        public string Content { get; set; } = "";

    }
}