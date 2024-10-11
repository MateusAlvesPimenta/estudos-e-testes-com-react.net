using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FS_React_Net.DTO;

namespace FS_React_Net.Models
{
    public class Group
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        [StringLength(100)]
        public string Description { get; set; }
        public List<Contact> Contacts { get; set; } = new List<Contact>();

        public Group(GroupDTO groupDTO)
        {
            Id = groupDTO.Id;
            Name = groupDTO.Name;
            Description = groupDTO.Description;
        }

        public Group() { }

        public void UpdateGroup(GroupDTO groupDTO)
        {
            Name = groupDTO.Name;
            Description = groupDTO.Description;
        }
    }
}