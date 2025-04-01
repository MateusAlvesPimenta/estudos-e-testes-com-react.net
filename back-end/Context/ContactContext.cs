using FS_React_Net.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FS_React_Net.Context
{
    public class ContactContext : IdentityDbContext<IdentityUser>
    {
        public ContactContext(DbContextOptions<ContactContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ContactGroup>()
                .HasKey(contactGroup => new { contactGroup.GroupId, contactGroup.ContactId });

            modelBuilder.Entity<Contact>()
                .HasMany(contact => contact.Groups)
                .WithMany(group => group.Contacts)
                .UsingEntity<ContactGroup>(
                    j =>    j.HasOne(contactGroup => contactGroup.Group)
                            .WithMany()
                            .HasForeignKey(contactGroup => contactGroup.GroupId),

                    j =>    j.HasOne(contactGroup => contactGroup.Contact)
                            .WithMany()
                            .HasForeignKey(contactGroup => contactGroup.ContactId));

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<ContactGroup> ContactGroups { get; set; }
    }
}