using FS_React_Net.Models;
using Microsoft.EntityFrameworkCore;

namespace FS_React_Net.Context
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options) : base(options)
        {
            
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}