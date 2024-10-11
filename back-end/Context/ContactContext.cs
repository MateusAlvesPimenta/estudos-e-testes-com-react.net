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
            modelBuilder.Entity<ContactGroup>()
                .HasKey(cg => new { cg.GroupId, cg.ContactId });

            modelBuilder.Entity<Contact>()
                .HasMany(c => c.Groups)
                .WithMany(g => g.Contacts)
                .UsingEntity<ContactGroup>(
                    j => j.HasOne(cg => cg.Group).WithMany().HasForeignKey(cg => cg.GroupId),
                    j => j.HasOne(cg => cg.Contact).WithMany().HasForeignKey(cg => cg.ContactId));

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<ContactGroup> ContactGroups { get; set; }
    }
}