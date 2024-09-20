using FS_React_Net.DTO;
using FS_React_Net.Models;

namespace FS_React_Net.Services
{
    public interface IContactService
    {
        Task<List<Contact>> GetContacts();
        Task<Contact> GetContactById(int id);
        Task<List<Contact>> GetContactsByName(string name);
        Task CreateContact(ContactDTO contactDTO);
        Task<bool> UpdateContact(ContactDTO contactDTO);
        Task DeleteContact(Contact contact);
    }
}