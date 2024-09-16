using System.ComponentModel.DataAnnotations;

namespace FS_React_Net.Models
{
    public class Group
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string GroupName { get; set; }
        public IEnumerable<Contact> Contacts { get; set; }
    }
}