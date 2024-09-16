using FS_React_Net.Models;

namespace FS_React_Net.Services
{
    public interface IContactService
    {
        Task<List<Contact>> GetContacts();
        Task<Contact> GetContactById(int id);
        Task<List<Contact>> GetContactsByName(string name);
        Task CreateContact(Contact contact);
        Task<bool> UpdateContact(Contact contact);
        Task DeleteContact(Contact contact);
    }
}