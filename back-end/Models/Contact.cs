using System.ComponentModel.DataAnnotations;

namespace FS_React_Net.Models
{
    public class Contact
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        [StringLength(16)]
        public string PhoneNumber { get; set; }
        [Required]
        public bool Active { get; set; }
    }
}