using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FS_React_Net.DTO
{
    public class GroupCreateDTO
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string GroupName { get; set; }
        [Required]
        [StringLength(100)]
        public string GroupDescription { get; set; }
        [Required]
        public int ContactId { get; set; }
    }
}