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
        public List<Contact> Contacts { get; set; } = new List<Contact>();

        public Group(GroupCreateDTO groupCreateDTO, Contact contact)
        {
            Id = groupCreateDTO.Id;
            GroupName = groupCreateDTO.GroupName;
            Contacts.Add(contact);
        }

        public Group() { }

        public void AddContact(Contact contact)
        {
            Contacts.Add(contact);
        }

        public void RemoveContact(Contact contact)
        {
            Contacts.Remove(contact);
        }
    }
}