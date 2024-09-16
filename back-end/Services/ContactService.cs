using FS_React_Net.Context;
using FS_React_Net.Models;
using Microsoft.EntityFrameworkCore;

namespace FS_React_Net.Services
{
    public class ContactService : IContactService
    {
        private readonly ContactContext _context;

        public ContactService(ContactContext context)
        {
            _context = context;
        }
        public async Task<List<Contact>> GetContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        public async Task<Contact> GetContactById(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            return contact;
        }

        public async Task<List<Contact>> GetContactsByName(string name)
        {
            if(!String.IsNullOrWhiteSpace(name))
            {
                var contacts = await _context.Contacts.Where(x => x.Name.Contains(name)).ToListAsync();
                return contacts;
            }
            return await GetContacts();
        }

        public async Task CreateContact(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateContact(Contact contact)
        {
            _context.Entry(contact).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task DeleteContact(Contact contact)
        {
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
        }
    }
}