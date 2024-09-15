using FS_React_Net.Models;

namespace FS_React_Net.Services
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetContacts();
        Task<Contact> GetContactsById(int id);
        Task<IEnumerable<Contact>> GetContactsByName(string name);
        Task CreateContact(Contact contact);
        Task UpdateContact(Contact contact);
        Task DeleteContact(Contact contact);
    }
}