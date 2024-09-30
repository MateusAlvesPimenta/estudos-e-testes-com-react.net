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
        public string GroupName { get; set; }
        [Required]
        [StringLength(100)]
        public string GroupDescription { get; set; }
        public List<Contact> Contacts { get; set; } = new List<Contact>();

        public Group(GroupDTO groupCreateDTO)
        {
            Id = groupCreateDTO.Id;
            GroupName = groupCreateDTO.GroupName;
            GroupDescription = groupCreateDTO.GroupDescription;
        }

        public Group() { }

        public void AddContact(Contact contact)
        {
            Contacts.Add(contact);
        }

        public bool RemoveContact(Contact contact)
        {
            return Contacts.Remove(contact);
        }

        public void UpdateGroup(GroupDTO groupDTO)
        {
            GroupName = groupDTO.GroupName;
            GroupDescription = groupDTO.GroupDescription;
        }
    }
}