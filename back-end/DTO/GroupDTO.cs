using System.ComponentModel.DataAnnotations; 

namespace FS_React_Net.DTO
{
    public class GroupDTO
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string GroupName { get; set; }
        [Required]
        [StringLength(100)]
        public string GroupDescription { get; set; }
    }
}