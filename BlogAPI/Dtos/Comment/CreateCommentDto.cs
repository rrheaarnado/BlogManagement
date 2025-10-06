using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Dtos.Comment
{
    public class CreateCommentDto
    {

        [Required]
        public string Content { get; set; } = "";

        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int PostId { get; set; }    

    }
    
}