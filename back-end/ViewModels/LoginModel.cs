using System.ComponentModel.DataAnnotations;

namespace FS_React_Net.ViewModels
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}