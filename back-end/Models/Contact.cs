using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FS_React_Net.DTO;

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
        [JsonIgnore]
        public Group Group { get; set; }
        public int? GroupId { get; set; }

        public Contact(){}
        public Contact(ContactDTO contactDTO)
        {
            Name = contactDTO.Name;
            PhoneNumber = contactDTO.PhoneNumber;
            Active = contactDTO.Active;
        }
        public void UpdateContact(ContactDTO contactDTO)
        {
            Name = contactDTO.Name;
            PhoneNumber = contactDTO.PhoneNumber;
            Active = contactDTO.Active;
        }
    }
}