using FS_React_Net.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FS_React_Net.Context
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>()
                .HasOne(contact => contact.Group)
                .WithMany(group => group.Contacts)
                .HasForeignKey(contact => contact.GroupId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Group> Groups { get;  set; }
    }
}